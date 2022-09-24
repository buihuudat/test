FROM node:16.17-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["npm", "start"]
LABEL key="app"
EXPOSE 5000