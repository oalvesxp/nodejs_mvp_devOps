resource "aws_dynamodb_table" "this" {
  name         = "tflock-${aws_s3_bucket.this.bucket}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
