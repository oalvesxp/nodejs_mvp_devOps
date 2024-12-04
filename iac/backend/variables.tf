// terraform backend variables
variable "bucket_name" {
  description = "S3 bucket name for the Terraform remote backend"
  type        = string
  default     = "tf-state-831511089306-us-east-1"
}

variable "table_name" {
  description = "DynamoDB table name for Terraform locks"
  default     = "locking-831511089306-us-east-1"
}
