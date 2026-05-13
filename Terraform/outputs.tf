output "instance_id" {
  value = aws_instance.NoteApp_server.id
}

output "public_ip" {
  value = aws_eip.NoteApp_eip.public_ip
}

output "vpc_id" {
  value = aws_vpc.NoteApp_vpc.id
}