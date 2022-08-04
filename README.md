# Quick start

### Step 0. Prepare config
1. create `.env` file;
2. fill variables self data: 
   - TG_TOKEN=`you telegram token`,
   - DATABASE_URL=`"postgresql://user:password@localhost:5432/database?schema=public`>

### Step 1. Install dependencies
```
npm i
```
### Step 2. Prisma generate
```
npx prisma generate
```
### Step 3. Run app

```
npm run start
```
### Step 4 (optional). Fill fake data
```
npm run seed
```
