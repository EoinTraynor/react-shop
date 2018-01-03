FROM node:8

RUN git clone https://github.com/EoinTraynor/react-shop.git

WORKDIR react-shop

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]