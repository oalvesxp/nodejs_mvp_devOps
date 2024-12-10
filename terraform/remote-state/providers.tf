# https://developer.hashicorp.com/terraform/language/backend/s3

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project    = "Node.js MVP DevOps"
      Component  = "Remote State"
      CreatedAt  = "2024-12-10"
      ManagedBy  = "Terraform"
      Owner      = "Osvaldo Alves"
      Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
    }
  }
}
