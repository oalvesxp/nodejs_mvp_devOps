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

variable "department_name" {
  description = "Name of the department responsible for the VPC, e.g., 'enginnering', 'operations'. Helps in identifying ownership of the resources"
  type        = string
  default     = "engineering" # enginnering, operations, developer, qa, etc.
}

variable "app_folder_api" {
  description = "Local Filesystem path to the application's source code. This might be used for context in scripts on documentation. Default is '../../services/api'"
  type        = string
  default     = "../../services/api"
}

variable "app_folder_webapp" {
  description = "Local Filesystem path to the application's source code. This might be used for context in scripts on documentation. Default is '../../services/webapp'"
  type        = string
  default     = "../../services/webapp"
}

variable "force_delete_repo" {
  description = "Flag to determine whether the ECR repository should be forcefully deleted even if it contains images. Set to 'true' to enable force deletion."
  type        = bool
  default     = true
}
