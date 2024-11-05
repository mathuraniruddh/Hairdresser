FROM node:slim

WORKDIR /Hairdresser

COPY  . /Hairdresser

RUN npm install

EXPOSE 3000

CMD node index.js