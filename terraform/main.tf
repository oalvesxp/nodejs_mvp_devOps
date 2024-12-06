terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}


module "backend" {
  source      = "./modules/backend"
  bucket_name = local.bucket_name
  table_name  = local.table_name
}
