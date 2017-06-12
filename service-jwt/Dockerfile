FROM mhart/alpine-node:6.10.3

RUN mkdir -p /app
WORKDIR /app

COPY ./service-jwt/package.json  ./

RUN npm install 

COPY ./service-jwt/ .

EXPOSE 8989

CMD ["node", "index.js"]