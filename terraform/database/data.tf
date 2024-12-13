data "aws_caller_identity" "current" {}

data "terraform_remote_state" "network" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/network/terraform.tfstate"
    region = var.aws_region
  }
}

data "terraform_remote_state" "bastion_host" {
  backend = "s3"

  config = {
    bucket = "tfstate-2024-${data.aws_caller_identity.current.account_id}"
    key    = "mvp/nodejs-devOps/bastion-host/terraform.tfstate"
    region = var.aws_region
  }
}
