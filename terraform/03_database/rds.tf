resource "aws_security_group" "this" {
  name        = "mvpPostgreSQL"
  description = "Allow incoming database connections"
  vpc_id      = local.vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = local.subnets.private.cidr_blocks
  }

  dynamic "ingress" {
    for_each = local.bastion_security_group_id != "" ? [1] : []

    content {
      from_port       = 5432
      to_port         = 5432
      protocol        = "tcp"
      security_groups = [local.bastion_security_group_id]
    }
  }

  tags = {
    "Name" = "Database Security Group"
  }
}

resource "aws_db_subnet_group" "this" {
  name       = "postgres"
  subnet_ids = local.subnets.private.id

  tags = {
    "Name" = "Database Subnets Group"
  }
}

resource "aws_db_instance" "this" {
  db_name                     = var.db_name
  username                    = var.db_user
  manage_master_user_password = true
  kms_key_id                  = aws_kms_key.this.arn
  instance_class              = var.db_machine
  engine                      = var.db_engine.engine
  engine_version              = var.db_engine.version
  allocated_storage           = 10

  storage_encrypted   = true
  publicly_accessible = false

  performance_insights_enabled    = true
  performance_insights_kms_key_id = aws_kms_key.this.arn

  db_subnet_group_name   = aws_db_subnet_group.this.id
  vpc_security_group_ids = [aws_security_group.this.id]
}
