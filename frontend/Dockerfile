FROM node:16.15.0-alpine

# Set the working directory in the container
WORKDIR /app

RUN npm install serve -g

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install 

# Copy the entire project directory to the container
COPY . .


# Build the frontend application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run", "prod"]
