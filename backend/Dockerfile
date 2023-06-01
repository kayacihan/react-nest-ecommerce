# Use an official Node.js runtime as the base image
FROM node:16.15.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install 

# Copy the entire project directory to the container
COPY . .

# build
#RUN npm run build

# Expose port 8000 for the backend API
EXPOSE 8000

# Set the command to run the backend application
CMD [ "npm", "start" ]

