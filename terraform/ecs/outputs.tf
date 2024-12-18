output "cluster" {
  value = {
    name = aws_ecs_cluster.this.name
    arn  = aws_ecs_cluster.this.arn
  }
}

output "task_definition_api" {
  value = {
    arn     = aws_ecs_task_definition.api.arn
    version = aws_ecs_task_definition.api.revision
  }
}

output "alb_url" {
  value = aws_alb.this.dns_name
}

output "log_group" {
  value = aws_cloudwatch_log_group.api.arn
}
