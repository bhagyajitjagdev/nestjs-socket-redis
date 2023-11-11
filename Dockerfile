# Development stage
FROM node:18.18.2-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18.18.2-slim AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm install pm2 -g

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
