terraform {
  backend "s3" {
    bucket         = "tf-state-831511089306-us-east-1"
    dynamodb_table = "locking-831511089306-us-east-1"
    key            = "mvp/nodejs/devops/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}
