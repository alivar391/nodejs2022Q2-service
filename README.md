# Home Library Service

## Downloading

```bash
git clone https://github.com/alivar391/nodejs2022Q2-service.git nodejs2022Q2-service
```

## Installing NPM modules

```bash
cd nodejs2022Q2-service
git checkout docker
npm install
```

## Rename .env.example

Rename .env.example file to .env

## For create images in Docker and run app in container

```bash
docker-compose up
```

## For Scan Created Images

```bash
npm run scan
```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

To run all tests

```bash
npm run test
```
