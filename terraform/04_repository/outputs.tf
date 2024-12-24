
output "repositories" {
  description = "Informations about ECR's Repositories"
  value = {
    backend = {
      arn         = aws_ecr_repository.backend.arn
      name        = aws_ecr_repository.backend.name
      registry_id = aws_ecr_repository.backend.registry_id
      url         = aws_ecr_repository.backend.repository_url
    }

    frontend = {
      arn         = aws_ecr_repository.frontend.arn
      name        = aws_ecr_repository.frontend.name
      registry_id = aws_ecr_repository.frontend.registry_id
      url         = aws_ecr_repository.frontend.repository_url
    }
  }
}
