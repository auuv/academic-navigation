FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund
COPY backend ./backend
COPY site/resource-catalog.js site/gas-project-catalog.js ./site/
ENV NODE_ENV=production COLLECTION_DATA_DIR=/data/collection PORT=8080
EXPOSE 8080
CMD ["node", "backend/server.mjs"]
