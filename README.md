### Installation

Install: clone, npm i, set up .env.

Run dev: npm run dev

Run prod: npm start

Env Vars: list all.

### Endpoints:

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

GET /api/account/balance

POST /api/transactions

GET /api/transactions?type=&start=&end=&page=&limit=

PATCH /api/transactions/:id

DELETE /api/transactions/:id

### Notes & Best practices 

- Money in cents: avoids floating-point rounding problems.

- Atomic balance updates: Mongo sessions/transactions ensure user balance + transaction write stay consistent.

- No negative balance if ALLOW_NEGATIVE_BALANCE=false.

- Custom sanitize: avoids the req.query immutable error; we only sanitize body/params and whitelist query building.

- Pagination metadata returned.

- Indexes on transactions for fast user/date queries.

- Helmet, CORS, compression, rate-limits enabled.

- ESM using "type": "module".