resource "aws_alb" "this" {
  name            = "mvp-ecs-alb"
  subnets         = local.subnets.public.id
  security_groups = [aws_security_group.alb.id]
}

resource "aws_alb_target_group" "this" {
  for_each = { for item in local.containers : item.name => item }

  vpc_id      = local.vpc.id
  name        = "${each.key}-sg"
  port        = each.value.app_port
  protocol    = "HTTP"
  target_type = "ip"

  health_check {
    unhealthy_threshold = 2
    healthy_threshold   = 3
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = each.value.health_check_path
  }
}

resource "aws_alb_listener" "this" {
  for_each = { for item in local.containers : item.name => item }

  load_balancer_arn = aws_alb.this.arn
  port              = each.value.app_port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.this[each.key].id
  }
}
