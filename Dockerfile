FROM node:16.15-alpine As builder
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
