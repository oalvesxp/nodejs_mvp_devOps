locals {
  account_id = data.aws_caller_identity.current.account_id
  api_hash   = sha1(join("", [for file in fileset("${var.src_folder.api}/src", "**") : filesha1("${var.src_folder.api}/src/${file}")]))
  web_hash   = sha1(join("", [for file in fileset("${var.src_folder.webapp}/src", "**") : filesha1("${var.src_folder.webapp}/src/${file}")]))

  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "Repository"
    CreatedAt  = "2024-12-23"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = "dev"
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
