terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.22.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
# Add Terraform Backend Service
terraform {
  backend "s3" {
    bucket = "terraformbackendaccess"
    key    = "tfackendaccess.tfstate"
    region = "us-east-1"
  }
}