# ============================================
# Ujjwal Kumar Portfolio - Production Dockerfile
# Architecture: Node.js Express + Webpack + Nginx
# ============================================

# Stage 1: Build frontend assets with webpack
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json* ./

# Install ALL dependencies (including devDeps for webpack)
RUN npm ci --legacy-peer-deps 2>/dev/null || npm install

# Copy source code
COPY . .

# Build webpack production bundle
RUN npm run frontend:build

# ============================================
# Stage 2: Production runtime
# ============================================
FROM node:18-alpine AS production

# Set production environment
ENV NODE_ENV=production
ENV PORT=2022

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install ONLY production dependencies
RUN npm ci --omit=dev --legacy-peer-deps 2>/dev/null || npm install --omit=dev

# Copy built public assets from builder
COPY --from=builder /app/public ./public

# Copy server files
COPY index.js .
COPY preloadables.js .
COPY views ./views

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

USER appuser

# Expose app port
EXPOSE 2022

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:2022/ || exit 1

# Start the Express server
CMD ["node", "index.js"]
