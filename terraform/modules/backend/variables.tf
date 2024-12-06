// terraform backend variables
variable "bucket_name" {
  description = "S3 bucket name for the Terraform remote backend"
  type        = string
  validation {
    condition     = can(regex("^([a-z0-9]{1}[a-z0-9-]{1,61}[a-z0-9]{1})$", var.bucket_name))
    error_message = "Bucket Name must not be empty and must follow s3 naming rules."
  }
}

variable "table_name" {
  description = "DynamoDB table name for Terraform locks"
  type        = string
}
