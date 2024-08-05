# Deployment application Vite app on ECS and ECR Using terraform and Github Actions 


> **Disclaimer**: 

En este proyecto, crearemos una tubería CI/CD usando Github Actions para desplegar una aplicación web simple a ECS. 
La aplicación  vite que será dockerizada y empujada a ECR. La tubería se activará en cada empuje a la rama principal de path ./app. 
El pipeline construirá la imagen docker, la empujará a ECR, y actualizará el servicio ECS con la nueva imagen. 
Toda la infraestructura se creará utilizando Terraform Se automatizo con github Actions el Apply como el Destroy de la IaC.


## Prerequisites

- AWS Account
- Github Account
- Terraform
- Docker
- AWS CLI (create AK / SK )

## Architecture Overview

![Architecture](./assets/architecture.svg)

## Project Structure

- **.github/workflows**: Github Actions workflow files
- **app**: The web application
- **terraform**: Terraform files

## Dockerizing the Web Application
```
FROM --platform=linux/amd64 node:18-alpine as builder

RUN ["npm" ,"install", "-g","pnpm"]

COPY package.json /vite-app/
COPY . /vite-app

WORKDIR /vite-app

RUN ["pnpm", "install"]

RUN ["pnpm", "build"]

#CMD ["pnpm", "dev"]


FROM nginx:1.24-alpine as server
COPY --from=builder /vite-app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000
```
## Deploy IaC and App vite Step by Step

### terraform.tfvas
```
aws_region               = "eu-west-1"
ecs_task_definition_name = "vite-app-runner"
ecs_container_name       = "vite-app"
ecs_cluster_name         = "vite-app-cluster"
ecs_service_name         = "vite-app-service"

```

### Create Repository Secret Github

```
AWS_ACCESS_KEY
AWS_ECR_REPOSITORY
AWS_ECS_CLUSTER_NAME
AWS_ECS_CONTAINER_NAME
AWS_ECS_SERVICE_NAME
AWS_ECS_TASK_DEFINITION_NAME
AWS_REGION
AWS_SECRET_KEY
```
### Structure Folder  .github

```
└── workflows
    ├── apply.yml
    ├── destroy.yml
    └── onci-vite-app.yml
```
* Locate Action in your repository  of github execute ./workflow "IaC Apply Terraform Environment" apply.yml  Use "true" 
* Locate Action in your repository  of github execute ./workflow "IaC Destroy Terraform Environment" destroy.yml  Use "true"
* Locate Action in your repository  of github execute ./workflow "IPush image to Amazon ECR and deploy to ECS" onci-vite-app.yml  Use "pull resquest" or "Push" on path "app"


