resource "aws_ecr_repository" "backend" {
  name         = "mvp-be-repo"
  force_delete = var.force_delete_repo
}

resource "aws_ecr_repository" "frontend" {
  name         = "mvp-fe-repo"
  force_delete = var.force_delete_repo
}

resource "terraform_data" "build_image_backend" {
  triggers_replace = {
    hash = local.api_hash
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.api
    command     = "aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${local.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.api
    command     = "docker build -t img-be-nodejs ."
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.api
    command     = "docker tag img-be-nodejs ${aws_ecr_repository.backend.repository_url}:latest"
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.api
    command     = "docker push ${aws_ecr_repository.backend.repository_url}:latest"
  }
}

resource "terraform_data" "build_image_frontend" {
  triggers_replace = {
    hash = local.web_hash
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.webapp
    command     = "aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${local.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.webapp
    command     = "docker build -t img-fe-react ."
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.webapp
    command     = "docker tag img-fe-react ${aws_ecr_repository.frontend.repository_url}:latest"
  }

  provisioner "local-exec" {
    working_dir = var.src_folder.webapp
    command     = "docker push ${aws_ecr_repository.frontend.repository_url}:latest"
  }
}
