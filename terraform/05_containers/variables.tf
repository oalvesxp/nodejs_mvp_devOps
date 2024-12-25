variable "aws_region" {
  description = "AWS Region where the Network resources will be deployed, e.g., 'us-east-1' for the USA (Virgínia) region"
  type        = string
  default     = "us-east-1"
}

variable "ecs_containers" {
  description = "Configuration object for the ECS service, including CPU/ memory allocations, app container port, desired count of tasks, Docker image URL and health chek path"
  type = list(object({
    name              = string
    fargate_cpu       = number
    fargate_memory    = number
    app_port          = number
    app_count         = number
    health_check_path = string
    needs_db          = bool
    env_vars = list(object({
      name  = string
      value = string
    }))
  }))
}
