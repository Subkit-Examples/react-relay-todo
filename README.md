# react-relay-todo example

## Dev

```bash
npm start
```

## Build
```
npm run build
```

## Use Docker Deployment
```bash
docker build -t subkit-react-relay-todo .
docker run  -d \
  -p 8080:80 \
  -e GRAPHQL_ENDPOINT_TOKEN=yourJWToken \
  -e GRAPHQL_ENDPOINT=https://myapi.subkit.io/graphql/myschema \
  -e CONFIG_VARS=GRAPHQL_ENDPOINT,GRAPHQL_ENDPOINT_TOKEN \
  subkit-react-relay-todo
```
