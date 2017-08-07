FROM node:6.11

# Environment variables which handle runtime behaviour.
ENV SERVICE_PORT 3000
ENV WAIT_START 0

# Install the modules and build the code.
COPY package.json .
RUN npm install --production --registry https://${NPM_REGISTRY}
COPY . .
RUN npm run build

# Expose, wait as long as specified, then start the server.
EXPOSE ${SERVICE_PORT}
CMD echo "Waiting for ${WAIT_START}s..." && sleep ${WAIT_START} && npm start
