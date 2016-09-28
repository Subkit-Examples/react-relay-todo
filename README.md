# react-relay-todo example

## Dev

```bash
npm start
```

## Build
```
npm run build
```

## Use Docker
```bash
docker build -t subkit-react-relay-todo .
docker run  -d \
  -p 8080:80 \
  -e API_KEY=yourkey \
  -e API_URL=http://myapi.example.com \
  -e CONFIG_VARS=API_URL,API_KEY \
  subkit-react-relay-todo
```
