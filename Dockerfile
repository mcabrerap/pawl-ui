# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js app
# Compila el proyecto
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:1.21-alpine

# Copy the build output from the previous stage to the Nginx document root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for incoming traffic
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
