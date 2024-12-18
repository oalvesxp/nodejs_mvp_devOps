resource "aws_alb" "this" {
  name            = local.namespaced_service_name
  subnets         = local.subnets.public.id
  security_groups = [aws_security_group.alb.id]
}

resource "aws_alb_target_group" "api" {
  vpc_id      = local.vpc.id
  name        = local.namespaced_service_name
  port        = 9080
  protocol    = "HTTP"
  target_type = "ip"

  health_check {
    unhealthy_threshold = 2
    healthy_threshold   = 3
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/metrics/health"
  }
}

resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_alb.this.arn
  port              = 9080
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.api.id
  }
}
