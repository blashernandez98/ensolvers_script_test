#!/bin/bash

# Usage: ./start.sh <mysql_root_password>

# Check if the MySQL root password is provided as a command-line argument
if [ -z "$1" ]; then
  echo "Usage: ./start.sh <mysql_root_password>"
  exit 1
fi

mysql_root_password="$1"

# Database setup
database_name="notes"

# Create the database and tables using an external SQL file
mysql -u root -p"${mysql_root_password}" < start.sql

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

# Exit the script
exit
