variable "aws_region" {
  description = "AWS Region where the Network resources will be deployed, e.g., 'us-east-1' for the USA (Virgínia) region"
  type        = string
  default     = "us-east-1"
}

variable "allowed_ip" {
  description = "IP address/CIDR block allowed to SSH into the bastion host. Use Caution to restrict access to known IPs for security"
  type        = string
}

variable "instance_type" {
  description = "The EC2 instance type for the bastion host, such as 't2.micro'. This determines the hardware of the host"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "The name of the SSH key pair used to access the bastion host. Ensure the key exists in AWS EC2 before deployment"
  type        = string
}
