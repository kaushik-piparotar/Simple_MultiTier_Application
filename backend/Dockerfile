FROM node:18

WORKDIR /app

# Copy source code
COPY . .

# Generate package.json and install dependencies
RUN npm init -y
RUN npm install express sqlite3

EXPOSE 5000

CMD ["node", "server.js"]
