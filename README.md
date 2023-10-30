# Blog js

Some change

## Setup

```sh
docker-compose up
docker exec -it blog-js-backend-1 bash
npm run db:migrate
npm run db:seed:all
```

## Testing

```sh
docker-compose up
docker exec -it blog-js-backend-1 bash
npm run db:migrate:reset:test
npm run db:seed:reset:test
npm run test
```
