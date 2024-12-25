resource "aws_vpc" "this" {
  cidr_block           = var.network.cidr_block
  enable_dns_support   = var.network.enable_dns_support
  enable_dns_hostnames = var.network.enable_dns_hostnames

  tags = {
    "Name" = "mvpNetwork"
  }
}

# Subnets
resource "aws_subnet" "private" {
  count  = var.network.az_count
  vpc_id = aws_vpc.this.id

  cidr_block        = cidrsubnet(aws_vpc.this.cidr_block, 8, count.index)
  availability_zone = local.selected_azs[count.index]

  tags = {
    "Name" = "mvpPrivateSubnet-${local.selected_azs[count.index]}"
  }
}

resource "aws_subnet" "public" {
  count  = var.network.az_count
  vpc_id = aws_vpc.this.id

  cidr_block        = cidrsubnet(aws_vpc.this.cidr_block, 8, var.network.az_count + count.index)
  availability_zone = local.selected_azs[count.index]

  tags = {
    "Name" = "mvpPublicSubnet-${local.selected_azs[count.index]}"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = {
    "Name" = "mvpInternetGateway"
  }
}

# Route and Route tables
resource "aws_route" "this" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_vpc.this.main_route_table_id
  gateway_id             = aws_internet_gateway.this.id
}

resource "aws_route_table" "public" {
  count  = var.network.az_count
  vpc_id = aws_vpc.this.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }

  tags = {
    "Name" = "mvpPublicRT-${local.selected_azs[count.index]}"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.this.id

  tags = {
    "Name" = "mvpPrivateRT"
  }
}

# Route table association
resource "aws_route_table_association" "public" {
  count = var.network.az_count

  route_table_id = aws_route_table.public.*.id[count.index]
  subnet_id      = aws_subnet.public.*.id[count.index]
}

resource "aws_route_table_association" "private" {
  count = var.network.az_count

  route_table_id = aws_route_table.private.id
  subnet_id      = aws_subnet.private.*.id[count.index]
}

# nat gateway
resource "aws_eip" "nat" {}

resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id

  depends_on = [aws_internet_gateway.this]

  tags = {
    "Name" = "mvpNATGateway"
  }
}

resource "aws_route" "private_nat" {
  destination_cidr_block = "0.0.0.0/0"
  route_table_id         = aws_route_table.private.id
  nat_gateway_id         = aws_nat_gateway.this.id
}
