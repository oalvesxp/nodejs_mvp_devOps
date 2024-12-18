resource "aws_cloudwatch_log_group" "api" {
  name              = "/ecs/${local.namespaced_service_name}-api"
  retention_in_days = var.log_retention_days

  tags = {
    "Name" = local.namespaced_service_name
  }
}
