output "security_group_id" {
  value = aws_security_group.this.id
}

output "bastion_host_public_ip" {
  description = "Public IP of the Bastion Host"
  value       = aws_instance.this.public_ip
}
