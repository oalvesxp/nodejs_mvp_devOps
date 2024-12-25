# This role is necessary for the ECS agent to start and run tasks on your behalf
data "aws_iam_policy_document" "ecs_task_execution_role" {
  version = "2012-10-17"

  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# all tasks role
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "task-execution"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# backend task role
resource "aws_iam_role" "backend_task_role" {
  name               = "db-task-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json
}

resource "aws_iam_policy" "backend_task_role" {
  name = "db-task-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "rds:*"
        Resource = "arn:aws:rds:${var.aws_region}:${local.account_id}:db:${local.db_name}"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_role" {
  role       = aws_iam_role.backend_task_role.name
  policy_arn = aws_iam_policy.backend_task_role.arn
}
