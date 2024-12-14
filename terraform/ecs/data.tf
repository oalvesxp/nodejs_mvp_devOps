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

data "terraform_remote_state" "ecr" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/ecr/terraform.tfstate"
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
