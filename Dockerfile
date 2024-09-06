# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the app code and build the application
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy the built assets from the builder stage
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

# Install production dependencies
RUN npm install --only=production

# Expose the port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]

