# Lumaa Spring 2025 Submission

## Database setup
Within the root of the directory, the database is dumped under a file named ```lumaa2025.backup``` allowing for a very seemless migration to another system with PostgreSQL.

By running the following command, the database can be very easily migrated to another system:
```
pg_restore -U (INSERT_USERNAME) -h (INSERT_IP/localhost) -p 5432 -d (INSERT_DATABASE_NAME) -v "lumaa2025.backup"
```

## How to run backend

```
cd backend
npm install
npm start
```

### Relevant Environmental Variables:
- `DATABASE_USER`: The username for the database.
- `DATABASE_PASSWORD`: The password for the `DATABASE_USER`.
- `DATABASE_HOST`: The hostname or IP address of the database server (e.g., `localhost` or a cloud provider).
- `DATABASE_PORT`: The port the database is listening on (e.g., `5432` for PostgreSQL).
- `DATABASE_NAME`: The name of the specific database you are using.
- `JWT_SECRET`: A secret key used to sign JWT tokens.
- `BCRYPT_HASH_COUNT`: The number of bcrypt rounds to use when hashing passwords (e.g., `12`).
- `TOKEN_EXPIRATION`: How long the JWT token is valid (e.g., `1h`, `7d`).
- `FRONTEND_URL`: The URL for the frontend application (e.g., `http://localhost:3000`).


## How to run frontend
```
cd frontend
npm install
npm run dev
```

### Relevant Environmental Variables:
- `BACKEND_URL`: The URL for the backend application (e.g., `http://localhost:3000`).

## Salary expections

~$3,900

## Video demonstration

https://www.youtube.com/watch?v=BoXwdJx1wSM

