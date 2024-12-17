FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --ignore-scripts

COPY . .

EXPOSE 3001

USER node

CMD ["npm", "start"]