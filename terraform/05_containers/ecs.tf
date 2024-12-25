resource "aws_ecs_cluster" "this" {
  name = "mvpcluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_task_definition" "app" {
  for_each = { for item in local.containers : item.name => item }

  family                   = "${each.key}-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = each.value.fargate_cpu
  memory                   = each.value.fargate_memory

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = each.value.needs_db ? aws_iam_role.backend_task_role.arn : null

  container_definitions = jsonencode([
    {
      name  = each.key
      image = each.value.app_image

      portMappings = [
        {
          containerPort = each.value.app_port
          hostPort      = each.value.app_port
          protocol      = "tcp"
        }
      ]

      environment = flatten([
        [
          for var in each.value.env_vars : {
            name  = var.name
            value = tostring(var.value)
          }
        ],
        each.value.needs_db ? [
          {
            name  = "DATABASE_URL",
            value = "postgresql://${local.db_user}:${urlencode(local.db_passwd)}@${local.db_host}/${local.db_name}?schema=public"
          }
          ] : [
          {
            name  = "REACT_APP_API_URL"
            value = "http://${aws_alb.this.dns_name}"
          }
        ]
      ])

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/${each.key}"
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "app" {
  for_each = { for item in local.containers : item.name => item }

  name            = "${each.key}-service"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.app[each.key].arn
  desired_count   = each.value.app_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = local.subnets.private.id
    security_groups  = [aws_security_group.tasks[each.key].id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.this[each.key].arn
    container_name   = each.key
    container_port   = each.value.app_port
  }
}
