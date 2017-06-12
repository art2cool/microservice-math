FROM mhart/alpine-node:6.10.3

RUN mkdir -p /app
WORKDIR /app

COPY ./math-router/package.json  ./

RUN npm install 

COPY ./math-router/ .

EXPOSE 8080

CMD ["node", "index.js"]
