#!/bin/bash

# Usage: ./start.sh <mysql_root_password>

# Check if the MySQL root password is provided as a command-line argument
if [ -z "$1" ]; then
  echo "Usage: ./start.sh <mysql_root_password>"
  exit 1
fi

mysql_root_password="$1"

# Create the database and tables using an external SQL file
mysql -u root -p"${mysql_root_password}" < start.sql

# Function to stop the backend application
function stop_backend {
  local backend_pid=$(lsof -t -i:3000)
  if [ -n "$backend_pid" ]; then
    echo "Stopping the backend application (PID: $backend_pid)..."
    kill "$backend_pid"
  fi
}

# Define a trap to call stop_backend function on script exit
trap stop_backend EXIT

# Start the backend application
cd backend
npm install &&
npx prisma db pull &&
npx prisma generate &&
npm run dev &

# Start the frontend application
cd ../frontend
npm install &&
npm run dev

# The trap will automatically call stop_backend function here

# Exit the script
exit