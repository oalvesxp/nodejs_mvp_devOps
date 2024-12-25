resource "aws_cloudwatch_log_group" "log" {
  for_each = { for item in local.containers : item.name => item }

  name              = "/ecs/${each.key}"
  retention_in_days = 7

  tags = {
    "Name" = "${each.key}Logs"
  }
}
