FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm test

COPY . .

EXPOSE 3001

CMD ["npm", "start"]