locals {

  # network
  vpc     = data.terraform_remote_state.network.outputs.vpc
  subnets = data.terraform_remote_state.network.outputs.subnets

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Bastion Host"
    CreatedAt  = "2024-12-23"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = "dev"
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
