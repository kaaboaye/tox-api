FROM node:latest
  RUN mkdir -p /app
  COPY . /app
  WORKDIR /app
  RUN echo "" \
    && apt-get update \
    && apt-get install build-essential \
    && npm install typescript -g \
    && npm i
  RUN npm run build

  EXPOSE 3001
  CMD ["npm", "start"]
