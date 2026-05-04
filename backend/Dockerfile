FROM node:20-alpine

# Install build tools needed for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create uploads directories
RUN mkdir -p uploads/gallery uploads/faculty uploads/ebooks uploads/results uploads/magazine uploads/announcements

EXPOSE 5000

CMD ["npm", "run", "dev"]
