# Base image of node 
FROM node:20

# Set working directory
WORKDIR /app

# Copy everything in current directory to /app directory
COPY . .

# Run the npm command
RUN npm install --production

# Port setup
EXPOSE 3000

# Start the node application
CMD [ "node", "server.js" ]
