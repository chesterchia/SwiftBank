FROM node:13 as development

ENV NODE_ENV development

WORKDIR /app

COPY ./package*.json /app

RUN npm install

COPY . .

CMD ["npm", "start"]