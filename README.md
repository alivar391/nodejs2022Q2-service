# Home Library Service

## Downloading

```bash
git clone https://github.com/alivar391/nodejs2022Q2-service.git nodejs2022Q2-service
```

## Installing NPM modules

```bash
cd nodejs2022Q2-service
git checkout postgres
npm install
```

if you have high severity vulnerability
run

```bash
npm audit fix
```

## Rename .env.example

Copy and rename .env.example file to .env

## For run app in Docker container run Docker desktop at first, then run:

```bash
docker-compose up
```

Please, be patient, installing dependencies in a container takes a long time &#128517;.

This command will build images of postgres data base and run it in container, then build app image, upload migrations to database and run app in dev mode. You can open another terminal window and run tests.

## Running application

(if you need run app without docker)

```bash
npm run start:dev
```

After starting the app on port (3000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:3000/doc/.

## Testing

To run all tests

```bash
npm run test
```
