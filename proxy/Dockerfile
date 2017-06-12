FROM mhart/alpine-node:6.10.3

RUN mkdir -p /app
WORKDIR /app

COPY ./proxy/package.json  ./

RUN npm install 

COPY ./proxy .

EXPOSE 3000

CMD ["node", "index.js"]
