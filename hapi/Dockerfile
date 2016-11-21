FROM node:7

RUN npm install -g yarn

RUN mkdir -p /app
COPY ./package.json /app/.
COPY ./yarn.lock /app/.
WORKDIR /app
RUN yarn
COPY . /app/.
CMD node app.js
