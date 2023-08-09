FROM node:18.17.0-alpine

WORKDIR /app
COPY package*.json .
ENV API_URL=https://api.myapp.com/
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]