FROM node:20-alpine

# Create a new user with limited privileges
# and set up the application directory
# addgroup means add group
# adduser means add user
# -S means create a system user
# -G means add user to a group
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

# Set up the application directory and give ownership to nodeuser
WORKDIR /home/nodeuser/app
RUN chown -R nodeuser:nodegroup /home/nodeuser/app

# Copy the package.json and package-lock.json files
COPY --chown=nodeuser:nodegroup package*.json ./

# Change to nodeuser before running npm install
USER nodeuser
RUN npm install

# Copy the rest of the application files
COPY --chown=nodeuser:nodegroup . .

# Expose the application port
EXPOSE 3000

# Run as nodeuser
USER nodeuser

# Start the application
CMD ["npm", "start"]
