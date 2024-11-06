FROM node:20.18.0-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install

EXPOSE 5173
CMD [ "npm", "run", "dev" ]
