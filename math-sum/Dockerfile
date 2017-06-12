FROM mhart/alpine-node:6.10.3

RUN mkdir -p /app
WORKDIR /app

COPY ./math-sum/package.json  ./

RUN npm install 

COPY ./math-sum/ .

EXPOSE 8081

CMD ["node", "index.js"]