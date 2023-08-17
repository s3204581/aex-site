# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This will only re-run if these files change, not your entire codebase
COPY package*.json ./

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh



# Install the backend dependencies
RUN npm install

# Copy the rest of your backend code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["/usr/local/bin/wait-for-it.sh", "clamav:3310", "--timeout=60", "--", "node", "server.js"]


