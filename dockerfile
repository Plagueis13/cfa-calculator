# Build Environment: Node + Playwright
FROM mcr.microsoft.com/playwright:focal

# Env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3000

# Copy all app files into Docker Work directory
COPY backend/package*.json /app/
COPY backend/app.js /app/
COPY backend/cfaClient.js /app/

# Install Deps
RUN npm install

# Run Node index.js file
CMD [ "node", "app.js" ]