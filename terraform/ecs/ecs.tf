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

      portMappings = [{
        containerPort = var.ecs_api.app_port
        hostPort      = var.ecs_api.app_port
      }]

      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = "/ecs/${local.namespaced_service_name}-api",
          "awslogs-region"        = var.aws_region,
          "awslogs-stream-prefix" = "ecs",
        }
      }

      environment = [
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
          value = "postgresql://${local.db_user}:${urlencode(local.db_pass)}@${local.db_host}:${local.db_port}/${local.db_name}?schema=public"
        },
        {
          name  = "AWS_NODEJS_CONNECTIONS_REUSE_ENABLED"
          value = "1"
        },
      ]
    },
  ])
}

resource "aws_ecs_service" "api" {
  name                              = "${local.namespaced_service_name}-service"
  cluster                           = aws_ecs_cluster.this.id
  task_definition                   = aws_ecs_task_definition.api.arn
  desired_count                     = var.ecs_api.app_count
  launch_type                       = "FARGATE"
  health_check_grace_period_seconds = 30

  network_configuration {
    subnets          = local.subnets.private.id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.api.arn
    container_name   = local.api_container_name
    container_port   = var.ecs_api.app_port
  }

  depends_on = [
    aws_alb_listener.http
  ]

  # desired_count is ignored as it can change due to atoscaling policy
  lifecycle {
    ignore_changes = [desired_count]
  }
}
