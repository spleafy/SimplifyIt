FROM node:17-alpine3.14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

EXPOSE 3000

CMD [ "yarn", "start" ]