FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app
EXPOSE 3002
CMD ["node", "index.js"]
