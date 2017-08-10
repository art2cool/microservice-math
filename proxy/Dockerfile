FROM mhart/alpine-node:6.10.3

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json  ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
