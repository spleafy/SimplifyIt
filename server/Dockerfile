FROM node:17-alpine3.14

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn add nodemon

COPY . ./

EXPOSE 4000
ENV HOST 0.0.0.0
ENV PORT 4000

CMD [ "yarn", "start" ]