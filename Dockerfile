FROM node:18

WORKDIR /express-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start