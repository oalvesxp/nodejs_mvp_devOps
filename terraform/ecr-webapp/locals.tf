locals {
  account_id                 = data.aws_caller_identity.current.account_id
  namespaced_department_name = "${var.department_name}-${var.environment}"
  namespaced_service_name    = "${var.service_name}-${var.environment}"
  service_file_hash = sha1(
    join(
      "",
      [
        for file in fileset("${var.webapp_folder}/src", "**")
        : filesha1("${var.webapp_folder}/src/${file}")
      ]
    )
  )

  package_version = "v-${random_id.version.id}"


  common_tags = {
    Project    = "Node.js MVP DevOps"
    Component  = "ECR"
    CreatedAt  = "2024-12-14"
    ManagedBy  = "Terraform"
    Owner      = "Osvaldo Alves"
    Env        = var.environment
    Repository = "github.com/oalvesxp/nodejs_mvp_devOps"
  }
}
