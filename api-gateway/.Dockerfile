FROM node:16.15.1-alpine3.16 AS build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@8.5.3
RUN npm install -g rimraf
RUN npm install
COPY . .
RUN npm run build

FROM node:16.15.1-alpine3.16 as production
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@8.5.3
RUN npm install
COPY . .
COPY --from=build-stage /app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]