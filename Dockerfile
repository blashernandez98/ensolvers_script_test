# Use the official Node.js image as the base image
FROM node:14

# Set a working directory inside the container
WORKDIR /app

# Copy the backend source code to the container
COPY backend /app/backend

# Copy the frontend source code to the container
COPY frontend /app/frontend

# Copy start.sh and start.sql scripts
COPY start.sh /app/start.sh
COPY start.sql /app/start.sql

# Set environment variables for Prisma
ENV DATABASE_URL=mysql://root:root@mysql:3306/notes?schema=public



# Expose the port used by the frontend app
EXPOSE 5173

# Start both backend and frontend applications
CMD ["/bin/bash", "/app/start.sh", "your_mysql_root_password"]


