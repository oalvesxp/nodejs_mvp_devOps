
ecs_containers = [
  {
    name              = "backend"
    fargate_cpu       = 256
    fargate_memory    = 512
    app_port          = 3000
    app_count         = 1
    health_check_path = "/metrics/health"
    needs_db          = true

    env_vars = [
      { name = "NODE_ENV", value = "dev" },
      { name = "APP_NAME", value = "backend" },
      { name = "LOG_LEVEL", value = "info" },
      { name = "AWS_REGION", value = "us-east-1" },
      { name = "AWS_NODEJS_CONNECTIONS_REUSE_ENABLED", value = "1" },
    ]
  },
  {
    name              = "frontend"
    fargate_cpu       = 256
    fargate_memory    = 512
    app_port          = 80
    app_count         = 1
    health_check_path = "/health"
    needs_db          = false

    env_vars = [
      { name = "NODE_ENV", value = "dev" },
      { name = "APP_NAME", value = "frontend" },
      { name = "LOG_LEVEL", value = "info" },
      { name = "AWS_REGION", value = "us-east-1" },
      { name = "AWS_NODEJS_CONNECTIONS_REUSE_ENABLED", value = "1" },
    ]
  },
]
