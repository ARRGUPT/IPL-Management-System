# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 5000

# Use environment variables at runtime for configuration
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
