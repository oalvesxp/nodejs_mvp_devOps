# loadbalancer resources
resource "aws_alb" "this" {
  name               = var.application_load_balancer_name
  load_balancer_type = "application"
  subnets            = module.vpc.public_subnets

  security_groups = ["${aws_security_group.load_balancer.id}"]
}

resource "aws_lb_target_group" "this" {
  name        = var.target_group_name
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = module.vpc.vpc_id
}

resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_alb.this.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}
