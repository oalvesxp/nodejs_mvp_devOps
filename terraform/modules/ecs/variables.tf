# ecs variables
variable "app_cluster_name" {
  description = "ECS Cluster Name"
  type        = string
}

variable "app_task_famliy" {
  description = "ECS Task Family"
  type        = string
}

variable "ecr_repo_url" {
  description = "ECR Repo URL"
  type        = string
}

variable "container_port" {
  description = "Container Port"
  type        = number
}

variable "app_task_name" {
  description = "ECS Task Name"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "ECS Task Execution Role Name"
  type        = string
}

variable "app_service_name" {
  description = "ECS Service Name"
  type        = string
}

# network variables
variable "vpc_name" {
  description = "VPC Name"
  type        = string
}

variable "availability_zones" {
  description = "us-east-1 AZs"
  type        = list(string)
}

variable "private_subnets" {
  description = "CIDR Privates Subnets"
  type        = list(string)
}

variable "public_subnets" {
  description = "CIDR Public Subnets"
  type        = list(string)
}

variable "application_load_balancer_name" {
  description = "ALB Name"
  type        = string
}

variable "target_group_name" {
  description = "ALB Target Group Name"
  type        = string
}
