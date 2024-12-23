data "aws_caller_identity" "current" {}

data "aws_availability_zones" "all" {}

data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/network/terraform.tfstate"
    region = var.aws_region
  }
}

data "terraform_remote_state" "ecr-api" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/ecr/terraform.tfstate"
    region = var.aws_region
  }
}

data "terraform_remote_state" "ecr-webapp" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/ecr-webapp/terraform.tfstate"
    region = var.aws_region
  }
}

data "terraform_remote_state" "db" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/database/terraform.tfstate"
    region = var.aws_region
  }
}

data "aws_secretsmanager_secret" "rds_password" {
  arn = data.terraform_remote_state.db.outputs.database_password_secret[0].secret_arn
}

data "aws_secretsmanager_secret_version" "rds_password" {
  secret_id = data.aws_secretsmanager_secret.rds_password.id
}
