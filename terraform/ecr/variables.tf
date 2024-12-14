variable "aws_region" {
  description = "AWS Region where the Network resources will be deployed, e.g., 'us-east-1' for the USA (Virgínia) region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment name, such as 'dev', 'test', 'prod'. This categories the Network resources by their usage stage"
  type        = string
  default     = "dev"
}

variable "service_name" {
  description = "The name of the service the bastion host is associated with, used for naming and tagging resources in AWS"
  type        = string
  default     = "express-todo-api"
}
