# Base stage for shared dependencies
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Define build arguments
ARG NODE_ENV
ARG NEXT_PUBLIC_HOST_API
ARG NEXT_PUBLIC_ASSETS_API
ARG PORT
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CALLBACK_URL
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_CLIENT_EMAIL
ARG FIREBASE_PRIVATE_KEY
ARG GA_MEASUREMENT_ID
ARG GA_API_SECRET

# Dependencies stage - install all dependencies including dev
FROM base AS deps
COPY package.json yarn.lock ./
RUN npm install 

# Builder stage - build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY src/types/react-lazy-load-image-component.d.ts ./src/types/

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}
ENV NEXT_PUBLIC_ASSETS_API=${NEXT_PUBLIC_ASSETS_API}
ENV PORT=${PORT:-3000}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV GOOGLE_CALLBACK_URL=${GOOGLE_CALLBACK_URL}
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
ENV FIREBASE_CLIENT_EMAIL=${FIREBASE_CLIENT_EMAIL}
ENV FIREBASE_PRIVATE_KEY=${FIREBASE_PRIVATE_KEY}
ENV GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
ENV GA_API_SECRET=${GA_API_SECRET}

RUN npm run build

# Development stage
FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Staging stage
FROM base AS staging
RUN apk add --no-cache curl
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json yarn.lock next.config.js ./

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}
ENV NEXT_PUBLIC_ASSETS_API=${NEXT_PUBLIC_ASSETS_API}
ENV PORT=${PORT:-3000}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV GOOGLE_CALLBACK_URL=${GOOGLE_CALLBACK_URL}
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
ENV FIREBASE_CLIENT_EMAIL=${FIREBASE_CLIENT_EMAIL}
ENV FIREBASE_PRIVATE_KEY=${FIREBASE_PRIVATE_KEY}
ENV GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
ENV GA_API_SECRET=${GA_API_SECRET}

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT:-3000}/api/health || exit 1

EXPOSE ${PORT:-3000}
CMD ["npm", "run", "start:prod"]

# Production stage
FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json yarn.lock next.config.js ./

# Set runtime environment variables
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}
ENV NEXT_PUBLIC_ASSETS_API=${NEXT_PUBLIC_ASSETS_API}
ENV PORT=${PORT}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV GOOGLE_CALLBACK_URL=${GOOGLE_CALLBACK_URL}
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
ENV FIREBASE_CLIENT_EMAIL=${FIREBASE_CLIENT_EMAIL}
ENV FIREBASE_PRIVATE_KEY=${FIREBASE_PRIVATE_KEY}
ENV GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
ENV GA_API_SECRET=${GA_API_SECRET}

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT}/api/health || exit 1
EXPOSE ${PORT}
CMD ["npm", "run", "start"] 
