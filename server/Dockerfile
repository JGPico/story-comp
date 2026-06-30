FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.server.json ./
COPY server ./server

RUN npm run build:server

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist/server ./dist/server

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start:server"]
