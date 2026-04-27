# E-Learning System - Setup Guide

## Prerequisites
- MySQL 8.0+ installed and running
- Node.js 20+ installed
- Git

## Database Setup

### 1. Create Database
Open MySQL and run:
```sql
CREATE DATABASE elearning_db;
USE elearning_db;
```

### 2. Run SQL Scripts (in order)

**Option A: MySQL Workbench (Recommended)**
1. Open MySQL Workbench
2. Connect to your local MySQL server (root user)
3. Select database: `USE elearning_db;`
4. Open each SQL file (File → Open SQL Script):
   - `sql/01_schema/01_tables.sql`
   - `sql/01_schema/02_constraints.sql`
   - `sql/01_schema/03_add_course_grade.sql`
   - `sql/03_logic/02_triggers.sql`
5. Execute each file by clicking the lightning bolt ⚡ icon

**Option B: phpMyAdmin (if using XAMPP)**
1. Start XAMPP → Start MySQL
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Select `elearning_db` database
4. Click "Import" tab
5. Upload and execute each SQL file in order

**Option C: VS Code Extension**
1. Install "MySQL" extension by Jun Han
2. Add connection to localhost
3. Right-click each SQL file → "Run MySQL Query"

**Option D: Command Line (if MySQL is in PATH)**
```bash
mysql -u root -p elearning_db < sql/01_schema/01_tables.sql
mysql -u root -p elearning_db < sql/01_schema/02_constraints.sql
mysql -u root -p elearning_db < sql/01_schema/03_add_course_grade.sql
mysql -u root -p elearning_db < sql/03_logic/02_triggers.sql
```

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database Connection
Create/update `backend/.env`:
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/elearning_db"
```
Replace `your_password` with your MySQL root password that you've created.

### 3. Sync Prisma with Database
```bash
npx prisma db pull      # Pull schema from MySQL
npx prisma generate     # Generate Prisma Client
```

### 4. View Database (Optional)
```bash
npx prisma studio       # Opens UI at http://localhost:5555
```

## Project Structure

```
├── sql/
│   ├── 01_schema/          # Database schema
│   │   ├── 01_tables.sql
│   │   ├── 02_constraints.sql
│   │   └── 03_add_course_grade.sql
│   ├── 02_data/            # Sample data
│   └── 03_logic/           # Triggers, procedures, functions
│       └── 02_triggers.sql
├── backend/
│   ├── prisma/
│   │   └── schema.prisma   # Prisma schema (auto-generated)
│   ├── src/                # NestJS source code
│   └── .env                # Database connection
└── frontend/               # React frontend
```

## Common Commands

### Prisma
```bash
npx prisma studio           # Open database UI
npx prisma db pull          # Sync schema from database
npx prisma generate         # Generate Prisma Client
npx prisma format           # Format schema file
```

## Troubleshooting

### "Can't connect to MySQL server"
- Check if MySQL is running
- Verify DATABASE_URL in .env
- Check MySQL port (default: 3306)

### "Unknown database 'elearning_db'"
- Create the database first: `CREATE DATABASE elearning_db;`

### "Access denied for user"
- Check username and password in DATABASE_URL
- Verify MySQL user has proper permissions

### Prisma Client not found
- Run `npx prisma generate`
- Restart your IDE/terminal

## Team Workflow

1. **First time setup**: Follow all steps above
2. **After pulling changes**: 
   - If SQL files changed: Re-run SQL scripts
   - If schema changed: Run `npx prisma db pull && npx prisma generate`
3. **Before committing**: Don't commit `.env` file (contains passwords)

## Notes
- The `.env` file is gitignored for security
- Each team member needs their own `.env` with their MySQL credentials
- Triggers automatically calculate GPA - no manual calculation needed
- Use Prisma Studio to view/edit data during development
