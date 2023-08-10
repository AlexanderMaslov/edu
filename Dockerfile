FROM node:18.17.0-alpine

ENV CMD=${CMD}

WORKDIR /app
COPY package*.json .
RUN yarn
COPY . .
EXPOSE 3000
CMD exec yarn ${CMD}