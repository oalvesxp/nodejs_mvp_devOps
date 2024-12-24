resource "aws_security_group" "alb" {
  name        = "mvpSecurityGroupALB"
  description = "Controls access to the ALB"
  vpc_id      = local.vpc.id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # any
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # any
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"] # any
  }

  tags = {
    "Name" = "ALB Security Group"
  }
}

resource "aws_security_group" "tasks" {
  for_each = { for item in local.containers : item.name => item }

  name        = "${each.key}TaskSG"
  description = "Allows inbound access from the ALB only"
  vpc_id      = local.vpc.id

  ingress {
    from_port       = each.value.app_port
    to_port         = each.value.app_port
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"] # any
  }

  tags = {
    "Name" = "${each.key} Security Group"
  }
}
