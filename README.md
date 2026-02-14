# 360 Core Investment & Referral System

A high-precision Investment and Referral Reward platform built for the **360 Core Inc** technical assignment. This system features an automated daily return protocol, a tiered referral reward structure, and a robust ledger-based accounting system.

## 🚀 Key Features
- **Mandatory Referral System**: Direct signups are restricted. Users must join via a verified referral code.
- **Investment Protocol**: Minimum $100 entry with 0.6% automated daily returns.
- **3x Earning Cap**: Intelligent cap logic that halts all earnings (returns + bonuses) once 300% of principal is reached.
- **Tiered Referral Bonus**: Referrers earn a 5% instant liquid bonus on the first two deposits of their associates.
- **Transaction Ledger**: Every financial event (Deposit, Return, Bonus) is recorded with full audit trails.
- **Industrial UI**: A responsive, creamy light-themed dashboard with real-time performance tracking.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: MySQL.
- **Security**: JWT Authentication, Bcrypt Password Hashing.

---

## 📦 Setup Instructions

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

## 📖 API Documentation

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

## 📊 Database Schema Explanation
- **User**: (id, name, email, password, referralCode, referredBy, totalInvested, totalEarned)
  - `referredBy`: Tracks the network hierarchy.
  - `totalInvested`: Aggregated capital injection.
  - `totalEarned`: Aggregated yields and bonuses.
- **Transaction**: (id, userId, type, amount, description, createdAt)
  - `type`: ENUM('DEPOSIT', 'DAILY_RETURN', 'REFERRAL_BONUS')
  - Immutable record of every financial movement.

---

## 🚀 Scaling to 100,000 Users
To transition from a proof-of-concept to a production-grade 100k+ user system:

1. **Background Job Processing**: The `run-daily-returns` logic would be offloaded to **BullMQ** or **RabbitMQ**. Workers would process users in parallel batches (e.g., 500 users per worker) to avoid event-loop blocking and timeouts.
2. **Database Performance**:
   - **Read Replicas**: Direct all dashboard and ledge read queries to MySQL replicas.
   - **Indexing**: Composite indexes on `(userId, type, createdAt)` for rapid transaction retrieval.
3. **Caching Strategy**: Implement **Redis** to cache user's "Remaining Cap" and "Total Invested" values, invalidating only on new transactions. This reduces DB load by ~70% as users frequently refresh dashboards.
4. **API Gateway & Load Balancing**: Use **NGINX** or **AWS ALB** to distribute traffic across multiple instances of the Express server.
5. **State Consistency**: Implement distributed locking (Redlock) to ensure the daily return protocol cannot be triggered simultaneously by different admin task instances.

---
**Build for Precision. Engineered for Growth.**
**360 Core Inc Assignment Response.**
