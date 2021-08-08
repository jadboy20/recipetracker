# Dockerfile

FROM node:10.19.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY . .
RUN chown -R app /opt/app
USER app
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "pm2-docker" ]
