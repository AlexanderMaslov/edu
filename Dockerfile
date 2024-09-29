FROM node

WORKDIR /home/node/code

COPY index.js .

CMD ["node", "index.js"]

