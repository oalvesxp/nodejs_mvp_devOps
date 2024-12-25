variable "aws_region" {
  description = "AWS Region where the Network resources will be deployed, e.g., 'us-east-1' for the USA (Virgínia) region"
  type        = string
  default     = "us-east-1"
}

variable "src_folder" {
  description = "Local Filesystem path to the application's source code. This might be used for context in scripts on documentation. Default is '../../services/*'"
  type = object({
    api    = string
    webapp = string
  })

  default = {
    api    = "../../services/api"
    webapp = "../../services/webapp"
  }
}

variable "force_delete_repo" {
  description = "Flag to determine whether the ECR repository should be forcefully deleted even if it contains images. Set to 'true' to enable force deletion."
  type        = bool
  default     = true
}
