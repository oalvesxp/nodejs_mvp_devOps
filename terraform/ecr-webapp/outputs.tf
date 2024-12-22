output "arn" {
  description = "The ARN of the ECR Repository"
  value       = aws_ecr_repository.this.arn
}

output "name" {
  description = "The Name of the ECR Repository"
  value       = aws_ecr_repository.this.name
}

output "registry_id" {
  description = "The Registry ID of the ECR Repository"
  value       = aws_ecr_repository.this.registry_id
}

output "repository_url" {
  description = "The ECR Repository URL"
  value       = aws_ecr_repository.this.repository_url
}

output "version" {
  description = "The ECR image version"
  value       = local.package_version
}
