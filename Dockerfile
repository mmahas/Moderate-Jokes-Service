# Build stage
FROM node:lts AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

COPY . .

# Build TypeScript files
RUN yarn build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy built files from the build stage to the production stage
COPY --from=build /app/dist ./dist

# Copy the .env file to the production stage
COPY .env ./

EXPOSE 8001

# Specify the command to run the production server
CMD ["node", "dist/app.js"]
