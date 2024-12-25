locals {

  # network
  vpc     = data.terraform_remote_state.network.outputs.vpc
  subnets = data.terraform_remote_state.network.outputs.subnets
  azs     = data.terraform_remote_state.network.outputs.selected_availability_zones

  # basion
  bastion_security_group_id = lookup(data.terraform_remote_state.bastion_host.outputs, "security_group_id", "")

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Database"
    CreatedAt  = "2024-12-23"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = "dev"
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
