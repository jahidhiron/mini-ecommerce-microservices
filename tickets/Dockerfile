FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod --force
COPY . .

CMD ["npm", "start"]