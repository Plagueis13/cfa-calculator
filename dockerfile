# Build Environment: Node + Playwright
FROM node:lts-alpine

# Env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3000

# Copy all app files into Docker Work directory
COPY backend/ .

# Install Deps
RUN npm install

# Run Node index.js file
CMD [ "node", "app.js" ]