# Api Project Build with Express and TypeORM

- Node version: 20 
- Install globally typeorm with `npm i type orm -g`
- initializated with `typeorm init --express --name typeorm-express-sample --database mysql`

Steps to run locally this project:

## first docker to launch test-db and prepare 

- To launch `docker-compose up -d`
- To Stop `docker compose down` 

## Install dependencies

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# Migrations

- To create a Migration: `typeorm migration:create ./src/migration/initMigrations` 
- To run a Migration: check first the buid with `npm run build`, the path in the data-source.ts and after `npm run migrate` 

## Tesing routes

- GET: `http://localhost:8080/users`