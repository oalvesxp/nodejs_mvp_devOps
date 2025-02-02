output "database_endpoint" {
  value = aws_db_instance.this.endpoint
}

output "database_name" {
  value = var.db_name
}

output "database_username" {
  value = var.db_user
}

output "database_port" {
  value = aws_db_instance.this.port
}

output "database_kms_key_id" {
  value = aws_kms_key.this.key_id
}

output "database_kms_key_arn" {
  value = aws_kms_key.this.arn
}

output "database_password_secret" {
  value = aws_db_instance.this.master_user_secret
}
