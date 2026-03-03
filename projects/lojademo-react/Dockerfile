FROM node:lts-alpine

WORKDIR /app

# 1) Instala dependências (cache de layers)
COPY package*.json ./
RUN npm install

# 2) Copia código
COPY . .

EXPOSE 5173
ENV CHOKIDAR_USEPOLLING=true