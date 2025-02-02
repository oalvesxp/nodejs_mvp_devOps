variable "aws_region" {
  description = "AWS Region where the Network resources will be deployed, e.g., 'us-east-1' for the USA (Virgínia) region"
  type        = string
  default     = "us-east-1"
}

variable "db_engine" {
  description = "Sepecifies the database engine and version for the RDS instance. 'engine' destermines the database software (e.g., 'postgresql' for Amazon PostgreSQL), and 'version' specifies the engine version (e.g., '15' fro PostgreSQL 15). Ensure the version is supported in your AWS region."
  type = object({
    engine  = string
    version = string
  })
  default = {
    engine  = "postgres"
    version = "16"
  }
}

variable "db_user" {
  description = "Username for the database administrator. This user will have permissions to create, read, update, and delete data in the database"
  type        = string
}

variable "db_name" {
  description = "Name of the database to be created within the RDS instance. Example 'todos' for a todo list application"
  type        = string
  default     = "tasksdb"
}

variable "db_machine" {
  description = "The instance type of the RDS database. Determines the hardware of the host that affects performance, capacity and cost"
  type        = string
  default     = "db.t4g.micro"
}

variable "db_backup_retention" {
  description = "The number of days automated backups are retained before deletion. Setting this value ensures data recovery for the specified retention period. Example: 7 for one week of backup retention."
  type        = number
  default     = 0
}

variable "db_skip_final_snapshot" {
  description = "Indicates whether to skipe the creation of a final snapshot before the RDS instance is deleted. Set to 'true' to skip snapshot creation, which can speed up deletion but risks data loss"
  type        = bool
  default     = true
}
