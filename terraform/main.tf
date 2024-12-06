terraform {
  backend "s3" {
    bucket         = "mvp-nodejs"
    key            = "mvp/nodejs/devops/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "mvp-nodejs"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

# modules
module "backend" {
  source      = "./modules/backend"
  bucket_name = local.bucket_name
  table_name  = local.table_name
}

module "ecr" {
  source        = "./modules/ecr"
  ecr_repo_name = local.ecr_repo_name
}
