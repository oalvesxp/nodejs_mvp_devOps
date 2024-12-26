<img src="https://i.imgur.com/jd3yX4x.png" alt="banner">

**Provisionamento de infraestrutura usando Terraform na AWS.**
Este projeto configura uma infraestrutura completa para hospedar aplicações, incluindo recursos como VPC, EC2, RDS, ECR, ECS Fargate, CloudWatch, e outros serviços AWS.

## **Pré-requisitos**
Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- **Terraform:** [Instalação do Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- **AWS CLI:** [Instalação do AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- **Chave de Acesso AWS:** Configurada no seu ambiente ou exportada como variáveis de ambiente.

## **Estrutura do Projeto**
O projeto é organizado da seguinte maneira:

```
./terraform
|-- /00_remoteState # Configuração do estado remoto do Terraform (Inicia o ambiente)
|-- /01_network     # Módulo para configuração da VPC
|-- /02_bastion     # Módulo para provisionamento de instâncias EC2 (Túnel SSH para aplicar as Migrations no banco de dados)
|-- /03_database    # Módulo para configuração do banco de dados RDS
|-- /04_repository  # Módulo para configurar ECR
|-- /05_containers  # Módulo para configurar ECS Fargate
|
|-- main.tf        # Configuração principal da infraestrutura
|-- variables.tf   # Declaração de variáveis usadas no projeto
|-- outputs.tf     # Declaração de outputs da infraestrutura
|-- terraform.tfvars # Valores das variáveis para ambiente
```

---

## **Como Usar?**
1. Clone o repositório:
   ```bash
   git clone https://github.com/oalvesxp/nodejs_mvp_devOps.git
   cd nodejs_mvp_devOps/terraform
2. Inicie o ambiente para o RemoteState:
   ```bash
    terraform init && terraform apply -var-file="config/dev/terraform.tfvars" -auto-approve

### Comandos para iniciar ações do terraform
Para executar estes comandos, você deve acessar o diretório de um dos módulos.

- Iniciar ambiente no Backend S3:
   ```bash
    terraform init -backend-config="config/dev/backend.hcl"
- Planejar ações:
   ```bash
    # Verifique o .tfvars de todos so módulos
    # Modifique os valores das variáveis de acordo com a sua necessidade.

    terraform plan -var-file="config/dev/terraform.tfvars"
- Aplique as configurações do Terraform na AWS:
   ```bash
    terraform apply -var-file="config/dev/terraform.tfvars" -auto-approve
- Remova todos os recursos adicionados do módulo desejado:
   ```bash
    terraform destroy -var-file="config/dev/terraform.tfvars" -auto-approve

### Aplicando Migrações no RDS
Antes de qualquer coisa, certifique-se de que a porta 5432 localhost está disponível para ser usada:
- Windows
```bash
netstat -an | findstr 5432
```

- Linux / Mac OSX
```bash
netstat -ltun | grep 5432
```

Se houver retorno significa que algum serviço está sendo executado nessa porta. Desabilite o serviço para que o túnel SSH possa ser criado com sucesso.

1. Criação do túnel ssh:
   ```bash
   # ssh -i "aws-key.pem" -N -L 5432:<DNS_DO_BANCO>:5432 <EC2_CONNECT> -v
   ssh -i "key.pem" -N -L 5432:mvpdb.cmhwqrytzs7h.us-east-1.rds.amazonaws.com:5432 ec2-54-161-221-44.compute-1.amazonaws.com -v
2. Verifique se o túnel SSH está funcionando:

- Windows
```bash
Test-NetConnection -ComputerName localhost -Port 5432
```

- Linux / Mac OSX
```bash
telnet localhost 5432
```

3. Aplique o Migration:
   ```bash
   # Modifique o .env para apontar o DATABASE_URL com as credenciais que estão configuradas no  Backend Task Definition lá na AWS, por exemplo:
   DATABASE_URL=postgresql://postgres:%24C%7Cgs%5Dmdwm%2450Td%24y%3A9gR60QLkt0@localhost:5432/tasksdb?schema=public
   ```
   Migração
   ```bash
   npx prisma migrate deploy
   ```

### Configuração do Fetch API no Frontend
Para que o front-end possa se comunicar com o backend, as requisições devem ser apontadas para o ALB, para fazer isso faça uma pequena modificação no `.env` do `webapp` e faça o `generate:api` novamente.

Após isso aplique o módulo de ECR novamente para ele gerar um novo pacote para ser deployado nos containers de Frontend.

### Teste da Aplicação
Verifique se tudo está funcionando acessando o DNS do ALB no seu navegador.

**Frontend:** http://alb-dns </br>
**Backend:** http://alb-dns:3000/docs