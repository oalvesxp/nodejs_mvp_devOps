locals {

  sorted_azs   = sort(data.aws_availability_zones.all.names)
  selected_azs = slice(local.sorted_azs, 0, var.network.az_count)

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Network"
    CreatedAt  = "2024-12-10"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = "dev"
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
