FROM mhart/alpine-node:8.3.0

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json  ./

RUN npm install

COPY . .

EXPOSE 8228

CMD ["node", "index.js"]