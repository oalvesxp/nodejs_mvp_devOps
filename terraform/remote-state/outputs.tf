output "remote_state_bucket" {
  value = {
    arn  = aws_s3_bucket.this.arn
    name = aws_s3_bucket.this.bucket
  }
}

output "remote_state_lock_table" {
  value = {
    arn  = aws_dynamodb_table.this.arn
    name = aws_dynamodb_table.this.name
  }
}
