FROM node:latest
  RUN mkdir -p /app
  COPY . /app
  WORKDIR /app
  RUN echo "" \
    && rm -rf node_modules/ \
    && npm i npm typescript -g \
    && npm i
  RUN npm run build

  EXPOSE 3001
  CMD ["npm", "start"]
