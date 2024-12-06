# ecs resources
resource "aws_ecs_cluster" "this" {
  name = var.app_cluster_name
}

resource "aws_ecs_task_definition" "this" {
  family                = var.app_task_famliy
  container_definitions = <<DEFINITION
    [
      {
        "name": "${var.app_task_name}",
        "image": "${var.ecr_repo_url}",
        "essential": true,
        "portMappings": [
          {
            "containerPort": ${var.container_port},
            "hostPort": ${var.container_port}
          }
        ],
        "memory": 512,
        "cpu": 256
      }
    ]
  DEFINITION

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.this.arn
}

resource "aws_ecs_service" "this" {
  name            = var.app_service_name
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.this.arn
    container_name   = aws_ecs_task_definition.this.family
    container_port   = var.container_port
  }

  network_configuration {
    subnets = module.vpc.public_subnets

    assign_public_ip = true
    security_groups  = ["${aws_security_group.ecs_service.id}"]
  }
}
