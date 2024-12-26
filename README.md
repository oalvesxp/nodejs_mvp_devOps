# MVP: Node.js + DevOps
Minimum Viable Product

Seja bem-vindo!

Este documento apresenta o desenvolvimento de um MVP (*Minimum Viable Product*, ou em português, *Produto Mínimo Viável*). Nele, demonstro o processo de automação de uma aplicação utilizando práticas modernas de DevOps para uma aplicação fullstack desenvolvida em Node.js.

Este projeto MVP demonstra a capacidade de provisionar infraestrutura na nuvem de maneira programática e integrar uma esteira de CI/CD eficiente, com foco em confiabilidade, escalabilidade e boas práticas de desenvolvimento.

## Objetivo principal

Criar uma solução que implemente:

1. **Infrastructure as code**
- Provisionamento recursos de infraestrutura na AWS.
    - VPC (Virtual Private Network)
    - EC2 (Elastic Compute 2)
    - ALB (Amazon Load Balancer)
    - ECS Fargate (Elastic Container Service)
    - ECR (Elastic Container Registry)
    - RDS (Relational Database Service)
    - S3 (Simple Storage Service)
    - DynamoDB (Database non-relational)
    
2. **Application Fullstack**
- Desenvolvimento de uma aplicação Node.js fullstack.
    - API REST (CRUD)
    - React (Front-end para consumir a API)
    
3. **CI/CD**
- Automatização de processos para Integração contínua e Deploy contínuo.
    - Unit test
    - Integration test

## Contexto da aplicação
Desafio de processo seletivo para vaga de Backend Developer & DevOps

## Requisitos de Software

Neste projeto foi utilizado as seguintes versões de software:

#### aws cli
```powershell
aws-cli/2.22.11 Python/3.12.6 Windows/10 exe/AMD64
```

#### Terraform
```powershell
Terraform v1.10.1
on windows_amd64
+ provider registry.terraform.io/hashicorp/aws v4.67.0
```

#### Node.js
```powershell
v20.18.1
```

## Como usar?
As instruções de uso estão separadas dentro do contexto de cada parte deste MVP.
- [API](./services/api/README.md)
- [Webapp]()
- [Terraform]()
