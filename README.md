# 360 Core Investment & Referral System

A high-precision Investment and Referral Reward platform built for the **360 Core Inc** technical assignment. This system features an automated daily return protocol, a tiered referral reward structure, and a robust ledger-based accounting system.

##  Key Features
- **Mandatory Referral System**: Direct signups are restricted. Users must join via a verified referral code.
- **Investment Protocol**: Minimum $100 entry with 0.6% automated daily returns.
- **3x Earning Cap**: Intelligent cap logic that halts all earnings (returns + bonuses) once 300% of principal is reached.
- **Tiered Referral Bonus**: Referrers earn a 5% instant liquid bonus on the first two deposits of their associates.
- **Transaction Ledger**: Every financial event (Deposit, Return, Bonus) is recorded with full audit trails.
- **Industrial UI**: A responsive, creamy light-themed dashboard with real-time performance tracking.

---

##  Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: MySQL.
- **Security**: JWT Authentication, Bcrypt Password Hashing.

---

##  Setup Instructions

### 1. Prerequisite
- Node.js (v18+)
- MySQL Server

### 2. Configuration
Create a `.env` file in the `server` directory:
```env
DB_NAME=investment_db
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
ADMIN_KEY=secret_admin_key
```

### 3. Database Initialization
```bash
# In /server
npm install
node create_db.js
node seed.js
```
*Note: This creates the initial registry entry with referral code: `ADMIN1` (or `ORIGIN`).*

### 4. Direct Operations
```bash
# Start Backend (In /server)
npm run dev

# Start Frontend (In /client)
npm run dev
```

---

##  API Documentation

### Authentication
- `POST /api/auth/register`: 
  - Body: `{ name, email, password, referralCode }`
  - Returns: `{ token, user }`
- `POST /api/auth/login`: 
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Transactions
- `POST /api/transactions/deposit`: 
  - Auth: JWT Required
  - Body: `{ amount }` (Min $100)
- `GET /api/transactions`: 
  - Auth: JWT Required
  - Returns: Last 10 ledger entries.

### Admin
- `POST /api/admin/run-daily-returns`: 
  - Header: `x-admin-key: secret_admin_key`
  - Action: Triggers global 0.6% interest distribution.
  - Frequency: Once per day (enforced).

---

##  Database Schema Explanation
- **User**: (id, name, email, password, referralCode, referredBy, totalInvested, totalEarned)
  - `referredBy`: Tracks the network hierarchy.
  - `totalInvested`: Aggregated capital injection.
  - `totalEarned`: Aggregated yields and bonuses.
- **Transaction**: (id, userId, type, amount, description, createdAt)
  - `type`: ENUM('DEPOSIT', 'DAILY_RETURN', 'REFERRAL_BONUS')
  - Immutable record of every financial movement.

---

## Scaling Strategy (100k Users)
To scale this system to support 100,000+ users, the following infrastructure upgrades are recommended:

*   **Asynchronous Processing**: Offload the daily return logic to background workers using **BullMQ** or **RabbitMQ**. This ensures the main API remains responsive while processing large batches of users.
*   **Database Scaling**: Implement **Read Replicas** to offload read-heavy dashboard queries from the primary database. Add composite indexes on transaction tables to maintain performance as data grows.
*   **Caching Layer**: Use **Redis** to cache high-frequency data such as user balances and earning cap statuses. This significantly reduces the database query load.
*   **Horizontal Scaling**: Deploy the application across multiple server instances behind a **Load Balancer** (e.g., Nginx or AWS ALB) to handle increased concurrent traffic.
*   **Distributed Locking**: Use a distributed lock (like Redlock) to prevent race conditions and ensure scheduled tasks are only executed once across the cluster.

---

