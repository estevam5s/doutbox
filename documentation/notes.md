---
title: Express MySQL
description: An Express server that connects to a MySQL database
tags:
  - express
  - MySQL
  - typescript
---

# Exemplo de Express com MySQL

This example starts an [Express](https://expressJS.com/) server that connects
to a Railway MySQL database.

## ✨ Features

- express
- MySQL
- typescript
- docker
- ORM (Prisma)

-------------------------------

## Quick Start

    docker run --name nome-do-container -p 3306:3306 -p 33060:33060 -e MYSQL_ROOT_HOST='%' -e MYSQL_ROOT_PASSWORD='sua-senha' -d mysql/mysql-server:8.0.0

> **Tem a possibilidade de usar no docker compose?** Claro, no termina, após ter criado o arquivo **package.json** basta agora usar no CLI:  ```docker-compose up``` :

```javascript
version: '3'

services:
  mysqlsrv:
    image: mysql:8.0.0
    environment:
      MYSQL_ROOT_USER: "root"
      MYSQL_ROOT_PASSWORD: "user"
      MYSQL_DATABASE: "prisma"
    ports:
      - "3306:3306"
    volumes:
      - /home/renatogroffe/Desenvolvimento/Docker/Volumes/MySql:/var/lib/mysql
    networks:
      - mysql-compose-network
networks: 
  mysql-compose-network:
    driver: bridge
```

Open your browser to https://localhost

-------------------------------

## Installation

* [Single Node Install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node/)
* [High Availability (HA) Install](https://www.docker.com/products/docker-desktop/)

> **É obrigatório baixar nos links acima?**  Um dos links acima não será obrigatório para fazer uso no projeto

### Minimum Requirements

* Sistemas Operacionais
  * De preferência o linux.
    * Mas pode usar o Windows com WSL. 
* Hardware & Software
* Node.js
* code-server
  * Veja como usar o mesmo:
    > **Como pode usar essa funcionalidade?**  Basta usar a imagem do code-server e depois usar um container
    > **Vamos usar o docker-compose.yaml**

    ```javascript
      version: "2.1"
      services:
        code-server:
          image: lscr.io/linuxserver/code-server:latest
          container_name: code-server
          environment:
            - PUID=1000
            - PGID=1000
            - TZ=Europe/London
            - PASSWORD=password #optional
            - HASHED_PASSWORD= #optional
            - SUDO_PASSWORD=password #optional
            - SUDO_PASSWORD_HASH= #optional
            - PROXY_DOMAIN=code-server.my.domain #optional
            - DEFAULT_WORKSPACE=/config/workspace #optional
          volumes:
            - /path/to/appdata/config:/config
          ports:
            - 8443:8443
          restart: unless-stopped
    ```

## Prerequisites

To successfully finish this guide, you'll need:

- Node.js
- A MySQL Database (set up a free MySQL database on Heroku)
- A GitHub Account (to create an OAuth app)
- A Vercel Account (to deploy the app)
- Docker (to run the app)
- Docker Compose (to run the app)

## 💁‍♀️ How to use

- Install dependencies `npm i`
- Migrations `npm prisma migrate dev`
- Prisma Studio `npx prisma studio`
- Start the server `npm run dev`
- Open your browser to https://localhost
- Open your Insomnia to https://localhost

-------------------------------
### `Usage`

Load package.json and configure the package:

**package.json**
```typescript
{
  "name": "doutbox",
  "version": "1.0.0",
  "description": "",
  "main": "./src/app.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "migrate:dev": "npx prisma migrate dev",
    "nodemon": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/app.ts ---delay 1000ms",
    "dev": "npx ts-node ./src/app.ts",
    "build": "sucrase ./src -d ./dist --transforms typescript,imports",
    "node": "ts-node ./src/app.ts",
    "start": ""
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Estevamsl/doutbox.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Estevamsl/doutbox/issues"
  },
  "homepage": "https://github.com/Estevamsl/doutbox#readme",
  "dependencies": {
    "@prisma/client": "^3.15.2",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "nodemon": "^2.0.16",
    "sucrase": "^3.21.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.29.0",
    "@typescript-eslint/parser": "^5.29.0",
    "eslint": "^8.18.0",
    "prisma": "^3.15.2",
    "ts-node": "^10.8.1",
    "typescript": "^4.7.4"
  }
}
```

-------------------------------

## 📝 Notes

O servidor iniciado simplesmente retorna o tempo atual no banco de dados. O SQL
consulta está localizada em `src/app.ts`.