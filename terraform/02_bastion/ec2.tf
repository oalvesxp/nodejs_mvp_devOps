resource "aws_security_group" "this" {
  name        = "BastionSG"
  description = "Allow SSH connections from my local machine"
  vpc_id      = local.vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.allowed_ip}/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"] # any
  }

  tags = {
    "Name" = "Bastion Security Group"
  }
}

resource "aws_instance" "this" {
  ami           = "ami-01816d07b1128cd2d"
  instance_type = var.instance_type
  key_name      = var.key_name

  subnet_id                   = local.subnets.public.id[0]
  vpc_security_group_ids      = [aws_security_group.this.id]
  associate_public_ip_address = true

  tags = {
    "Name" = "mvpBastionHost"
  }
}
