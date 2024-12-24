data "aws_caller_identity" "current" {}

data "aws_availability_zones" "all" {}

data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvpNodeJS/01_network/terraform.tfstate"
    region = var.aws_region
  }
}

data "terraform_remote_state" "database" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvpNodeJS/03_database/terraform.tfstate"
    region = var.aws_region
  }
}

data "aws_secretsmanager_secret" "db_secret" {
  arn = data.terraform_remote_state.database.outputs.database_password_secret[0].secret_arn
}

data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = data.aws_secretsmanager_secret.db_secret.id
}

data "terraform_remote_state" "repository" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvpNodeJS/04_repository/terraform.tfstate"
    region = var.aws_region
  }
}
