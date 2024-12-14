locals {
  namespaced_service_name = "${var.service_name}-${var.environment}"

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "ECR"
    CreatedAt  = "2024-12-14"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = var.environment
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
