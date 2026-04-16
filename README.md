# 6-10-sessions-and-login

## Setup

1. Edit `db/pool.js` and update the user and password fields to match your local Postgres setup (On macOS you may be able to delete those fields entirely)

2. Run these commands to set up the database, seed, and start the server:

```sh
cd server

# Install dependencies
npm install

# Create the database (run once)
createdb users_db           # Mac
sudo -u postgres createdb users_db   # Windows/WSL

# Seed the database with hashed passwords
node db/seed.js

# Start the server (port 3000)
npm run dev
```

3. Open the app and sign in to one of the users below

Seeded users (all have these passwords):

| Username | Password    |
| -------- | ----------- |
| alice    | password123 |
| bob      | hunter2     |
| carol    | opensesame  |
