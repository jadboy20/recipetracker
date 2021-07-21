# Dockerfile

FROM node:12.13.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY . .
RUN chown -R app /opt/app
RUN npm install pm2 -g
USER app
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "pm2" ]
