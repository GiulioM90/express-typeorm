# Api Project Build with Express and TypeORM

- Node version: 20 
- initializated with `typeorm init --express --name typeorm-express-sample --database mysql`

Steps to run locally this project:

## first docker to launch test-db and prepare 

docker-compose up -d
docker compose down 

## Install dependencies

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# Migrations

- to create a Migration: `typeorm migration:create ./src/migration/initMigrations` 
- to run a Migration: check first the buid with `npx tsc`, the path in the data-source.ts and after `npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts` 