locals {
  account_id = data.aws_caller_identity.current.account_id

  # network
  vpc     = data.terraform_remote_state.network.outputs.vpc
  subnets = data.terraform_remote_state.network.outputs.subnets

  # repository
  images = {
    backend  = "${data.terraform_remote_state.repository.outputs.repositories.backend.url}:latest"
    frontend = "${data.terraform_remote_state.repository.outputs.repositories.frontend.url}:latest"
  }

  containers = [
    for item in var.ecs_containers : merge(
      item,
      {
        app_image = local.images[item.name]
      }
    )
  ]

  # database
  db_host   = data.terraform_remote_state.database.outputs.database_endpoint
  db_name   = data.terraform_remote_state.database.outputs.database_name
  db_user   = data.terraform_remote_state.database.outputs.database_username
  db_passwd = jsondecode(data.aws_secretsmanager_secret_version.db_password.secret_string)["password"]

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Container"
    CreatedAt  = "2024-12-23"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = "dev"
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
