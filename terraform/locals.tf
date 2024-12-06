locals {
  # terraform remote bakcend
  bucket_name = "831511089306-mvp-tfstate"
  table_name  = "831511089306-mvp-lock"

  # ecr repository
  ecr_repo_name = "mvp-nodejs-registry"

  # network
  vpc_name           = "mvp-vpc"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets    = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  application_load_balancer_name = "mvp-alb"
  target_group_name              = "mvp-alb-tg"

  # ecs
  app_cluster_name             = "mvp-app-cluster"
  container_port               = 3333
  app_task_name                = "mvp-app-task"
  app_task_famliy              = "mvp-app-task"
  ecs_task_execution_role_name = "mvp-app-tasl-execution-role"
  app_service_name             = "mvp-app-service"
}
