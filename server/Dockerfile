FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm ci || yarn || pnpm i
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/index.js"]
