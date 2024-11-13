# Use the base Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY photo-masonry/package*.json ./

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY photo-masonry/ .

# Set environment variables
# ENV VITE_API_URL=http://pexels.com/api

# Build the project
RUN npm run build

# Expose port
EXPOSE 5173

# Run project
CMD ["npm", "run", "dev"]
