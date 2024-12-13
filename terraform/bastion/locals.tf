locals {
  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Bastion Host"
    CreatedAt  = "2024-12-10"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = var.environment
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
