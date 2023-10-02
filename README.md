# Blog js

## Setup

```sh
docker-compose up
docker exec -it blog-js-backend-1 bash
npm run db:migrate:reset
npm run db:seed:reset
```

## Testing

```sh
docker-compose up
docker exec -it blog-js-backend-1 bash
npm run db:migrate:reset:test
npm run db:seed:reset:test
npm run test
```
