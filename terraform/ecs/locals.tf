locals {
  account_id = data.aws_caller_identity.current.account_id

  namespaced_department_name = "${var.department_name}-${var.environment}"
  namespaced_service_name    = "${var.service_name}-${var.environment}"

  # ECS
  api_container_name = "${local.namespaced_service_name}-api"
  api_app_image      = var.ecs_api.app_image != "" ? var.ecs_api.app_image : "${data.terraform_remote_state.ecr.outputs.repository_url}:${data.terraform_remote_state.ecr.outputs.version}"

  # network
  vpc     = data.terraform_remote_state.network.outputs.vpc
  subnets = data.terraform_remote_state.network.outputs.subnets

  # database
  db_name = data.terraform_remote_state.db.outputs.database_name

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
