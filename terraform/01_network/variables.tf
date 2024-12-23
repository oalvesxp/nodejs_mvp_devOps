variable "aws_region" {
  description = "AWS Region where the Network resources will be deployed, e.g., 'us-east-1' for the USA (Virgínia) region"
  type        = string
  default     = "us-east-1"
}

variable "network" {
  description = <<-EOT
                General configuration for the network, including:
                  - az_count: Number of availability zones to use.
                  - cidr_blocks: IPv4 CIDR block for the vpc, e.g., '10.1.0.0/16'.
                  - enable_dns_support: Whether to enable DNS support (true or false).
                  - enable_dns_hostnames: Whether to enable DNS hostnames (true or false).
                EOT

  type = object({
    az_count             = number
    cidr_block           = string
    enable_dns_support   = bool
    enable_dns_hostnames = bool
  })

  default = {
    az_count             = 2
    cidr_block           = "10.1.0.0/16"
    enable_dns_support   = false
    enable_dns_hostnames = false
  }

  validation {
    condition     = can(regex("^(([0-9]{1,3}\\.){3}[0-9]{1,3})\\/([0-9]|[1-2][0-9]|3[0-2])$", var.network.cidr_block))
    error_message = "The CIDR block is not in a valid format."
  }

  validation {
    condition     = var.network.az_count > 0 && var.network.az_count <= 3
    error_message = "The number of availability zones must be between 1 and 3."
  }
}
