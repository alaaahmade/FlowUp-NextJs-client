# Base stage for shared dependencies
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Dependencies stage - install all dependencies including dev
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Builder stage - build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Development stage
FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]

# Staging stage
FROM base AS staging
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json yarn.lock next.config.js ./
# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --spider -q http://localhost:3000/api/health || exit 1
EXPOSE 3000
CMD ["yarn", "start"]

# Production stage
FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json yarn.lock next.config.js ./
# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --spider -q http://localhost:3000/api/health || exit 1
EXPOSE 3000
CMD ["yarn", "start"] 