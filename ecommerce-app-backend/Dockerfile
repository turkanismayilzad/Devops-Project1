FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# Bütün dependency-ləri yüklə — TypeScript build üçün lazımdır
RUN npm ci

COPY . .

# TypeScript-i JavaScript-ə çevir
RUN npm run build

# Production dependency-ləri yenidən yüklə — image-i kiçilt
RUN npm ci --only=production

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["npm", "start"]
