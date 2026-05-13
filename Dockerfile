FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]