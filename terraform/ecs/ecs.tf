resource "aws_ecs_cluster" "this" {
  name = local.namespaced_department_name

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_task_definition" "api" {
  family             = local.namespaced_service_name
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.ecs_api.fargate_cpu
  memory                   = var.ecs_api.fargate_memory

  container_definitions = jsonencode([
    {
      name  = local.api_container_name
      image = local.api_app_image

      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = "/ecs/${local.namespaced_service_name}-api",
          "awslogs-region"        = var.aws_region,
          "awslogs-stream-prefix" = "ecs",
        }
      }

      portMappings = [{
        containerPort = var.ecs_api.app_port
        hostPort      = var.ecs_api.app_port
      }]

      evironment = [
        {
          name  = "ENV"
          value = var.environment
        },
        {
          name  = "APP_NAME"
          value = local.namespaced_service_name
        },
        {
          name  = "PORT"
          value = tostring(var.ecs_api.app_port)
        },
        {
          name  = "LOG_LEVEL"
          value = var.log_level
        },
        {
          name  = "AWS_REGION"
          value = var.aws_region
        },
        {
          name  = "DATABASE_URL"
          value = ""
        },
        {
          name  = "AWS_NODEJS_CONNECTIONS_REUSE_ENABLED"
          value = "1"
        },
      ]
    },
  ])
}
