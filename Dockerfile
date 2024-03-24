# Base image
FROM node:18-alpine AS base

# Install dependencies
FROM base AS dependencies
RUN mkdir /frontend
WORKDIR /frontend
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

# Build app
FROM base AS builder
RUN mkdir /frontend
WORKDIR /frontend
COPY --from=dependencies /frontend/node_modules ./node_modules
COPY . .
RUN npm run build

# Run app
FROM base AS runner
WORKDIR /app
ENV DEBUG=0
COPY --from=dependencies /frontend/package*.json ./
COPY --from=dependencies /frontend/node_modules ./node_modules
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
CMD ["npm", "run", "start"]