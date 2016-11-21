FROM node:7

RUN npm install -g yarn

RUN mkdir -p /app
COPY ./package.json /app/.
RUN yarn
COPY . /app/.
WORKDIR /app
CMD node app.js
