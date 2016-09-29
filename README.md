# react-relay-todo example

[Live Example](https://react-relay-todo-example.subkit.io)

## Setup

```bash
npm install
```

## Dev

```bash
npm start
```

__open [http://localhost:3000](http://localhost:3000)__

## Production build

```bash
npm run build
```

## Docker deployment

```bash
docker build -t subkit-react-relay-todo .
docker run  -d \
  -p 8080:80 \
  -e GRAPHQL_ENDPOINT_TOKEN=yourJWToken \
  -e GRAPHQL_ENDPOINT=https://myapi.subkit.io/graphql/myschema \
  -e CONFIG_VARS=GRAPHQL_ENDPOINT,GRAPHQL_ENDPOINT_TOKEN \
  subkit-react-relay-todo
```
