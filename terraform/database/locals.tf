locals {
  namespaced_service_name = "${var.service_name}-${var.environment}"

  # network
  vpc                = data.terraform_remote_state.network.outputs.vpc
  subnets            = data.terraform_remote_state.network.outputs.subnets
  availability_zones = data.terraform_remote_state.network.outputs.selected_availability_zones

  # basion
  bastion_host_sg_id = lookup(data.terraform_remote_state.bastion_host.outputs, "security_group_id", "")

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Database"
    CreatedAt  = "2024-12-10"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = var.environment
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
