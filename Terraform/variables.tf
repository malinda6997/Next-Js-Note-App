variable "aws_region" {
  default = "us-east-1"
}

variable "ami_id" {
  default = "ami-091138d0f0d41ff90" 
}

variable "instance_type" {
  default = "t3.micro"
}

variable "key_name" {
  description = "Name of the existing AWS Key Pair"
  type        = string
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "subnet_cidr" {
  default = "10.0.1.0/24"
}