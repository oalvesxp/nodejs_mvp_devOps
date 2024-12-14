locals {
  account_id = data.aws_caller_identity.current.account_id

  namespaced_department_name = "${var.department_name}-${var.environment}"
  namespaced_service_name    = "${var.service_name}-${var.environment}"

  # network
  vpc     = data.terraform_remote_state.network.outputs.vpc
  subnets = data.terraform_remote_state.network.outputs.subnets

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "ECS Fargate"
    CreatedAt  = "2024-12-14"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = var.environment
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
