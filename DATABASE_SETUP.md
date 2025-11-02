# Database Setup Guide

## Overview
This guide explains how to set up the PostgreSQL database for the Alians website project.

## Current Configuration
The application is configured to connect to a PostgreSQL database with the following details:
- Host: 65.108.255.102
- Port: 5432
- Database Name: alians_db
- Username: postgres
- Password: 4pPAn4kpXFK3

## Environment Variables
The database connection is configured through the `DATABASE_URL` environment variable in the `.env.local` file:

```
DATABASE_URL=postgres://postgres:digitizeLabs_qwerty_92458@65.108.255.102:5432/alians_db
```

## Automatic Database Creation
The application is configured to automatically create the database if it doesn't exist. When the application starts, it will:

1. Try to connect to the specified database
2. If the connection fails with a "database does not exist" error, it will:
   - Connect to the default 'postgres' database
   - Create the 'alians_db' database
   - Connect to the newly created database
3. Sync the database schema (create tables if they don't exist)

## Manual Database Setup
If you need to manually set up the database, you can run:

```bash
npm run db:setup
```

This script will:
1. Connect to the database
2. Create the necessary tables
3. Handle any database creation if needed

## Troubleshooting
### Common Issues
1. **Connection Refused**: Ensure the PostgreSQL server is running and accessible from your network.
2. **Authentication Failed**: Verify the username and password in the `.env.local` file.
3. **Database Does Not Exist**: The application should automatically create the database, but if it fails, you may need to create it manually.

### Checking Database Connection
You can test the database connection by running the setup script:

```bash
npm run db:setup
```

### Verifying Tables
After running the setup, you should see a `projects` table in your database with the following structure:
- id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- name (STRING, NOT NULL)
- description (TEXT)
- createdAt (DATE)
- updatedAt (DATE)

## Security Notes
- The database password is stored in the `.env.local` file which should NOT be committed to version control
- The `.gitignore` file is configured to exclude `.env.local` from commits
- In production, consider using more secure methods for managing credentials