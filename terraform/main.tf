terraform {
  backend "s3" {
    bucket         = "831511089306-mvp-tfstate"
    key            = "mvp/nodejs/devops/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "831511089306-mvp-lock"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.31.0"
    }
  }

  required_version = ">= 1.2.0"
}

# modules
module "backend" {
  source      = "./modules/backend"
  bucket_name = local.bucket_name
  table_name  = local.table_name
}

module "ecr" {
  source        = "./modules/ecr"
  ecr_repo_name = local.ecr_repo_name
}

module "ecs" {
  source = "./modules/ecs"

  vpc_name           = local.vpc_name
  availability_zones = local.availability_zones
  private_subnets    = local.private_subnets
  public_subnets     = local.public_subnets

  application_load_balancer_name = local.application_load_balancer_name
  target_group_name              = local.target_group_name

  app_cluster_name             = local.app_cluster_name
  ecr_repo_url                 = module.ecr.repository_url
  container_port               = local.container_port
  app_task_name                = local.app_task_name
  app_task_famliy              = local.app_task_famliy
  ecs_task_execution_role_name = local.ecs_task_execution_role_name
  app_service_name             = local.app_service_name
}
