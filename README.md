# 360coreInc: Core Investment & Referral System

![Investment Dashboard](https://via.placeholder.com/1200x400/0A2542/FFFFFF?text=360coreInc+Investment+Platform+Screenshot+-+Coming+Soon!)
*(Placeholder image - Imagine a sleek, light-themed dashboard with charts and real-time data.)*

Welcome to `360coreInc` – a cutting-edge Investment and Referral Reward platform engineered specifically for the **360 Core Inc** technical assignment. This robust system showcases an automated daily return mechanism, a dynamic tiered referral structure, and an immutable ledger-based accounting core, all designed for precision and transparency.

Developed by **Alok345**.

---

## ✨ Project Overview

This project delivers a high-precision, ledger-based financial system complete with an intuitive user interface and a powerful backend. It's built to demonstrate robust transaction management, automated financial operations, and a scalable architectural approach suitable for high-volume environments. From mandatory referral systems to intelligent earning caps, `360coreInc` covers critical aspects of a modern investment platform.

---

## 🚀 Key Features

Experience a platform built for control, transparency, and strategic growth:

*   🤝 **Mandatory Referral System**: Ensuring structured growth, direct sign-ups are restricted. All users must join the network via a verified referral code, fostering a true community.
*   💰 **Automated Investment Protocol**: A minimum entry of $100 unlocks a consistent 0.6% automated daily return, meticulously calculated and distributed.
*   🛑 **3x Earning Cap Logic**: An intelligent system that gracefully halts all forms of earnings (daily returns + referral bonuses) for a user once their total accumulated earnings reach 300% of their initial principal investment.
*   🎁 **Tiered Referral Bonus**: Referrers are instantly rewarded with a liquid 5% bonus on the first two deposits made by their direct associates, incentivizing network expansion.
*   📚 **Immutable Transaction Ledger**: Every single financial event – be it a Deposit, Daily Return, or Referral Bonus – is meticulously recorded in an immutable ledger, providing a full, auditable transaction history.
*   💻 **Industrial-Grade UI/UX**: A responsive, creamy light-themed dashboard offering real-time performance tracking and a seamless user experience, designed for clarity and ease of use.

---

## 🛠️ Tech Stack

Built with a modern and efficient stack, ensuring high performance, scalability, and maintainability.

### Frontend
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-black?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

*   **Next.js 15 (App Router)**: A powerful React framework for building fast, scalable, and SEO-friendly web applications.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without leaving your HTML.
*   **Lucide Icons**: A beautiful and customizable icon library for a polished user interface.

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)

*   **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
*   **Sequelize ORM**: A powerful object-relational mapper for Node.js, making it easy to interact with relational databases.

### Database
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

*   **MySQL**: A robust, open-source relational database management system.

### Security
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

*   **JWT Authentication**: Securely transmits information between parties as a JSON object.
*   **Bcrypt Password Hashing**: A strong hashing function designed to protect passwords.

---

## 📁 Project Structure

A clean and organized directory structure for seamless development and understanding.

```
.
├── .gitignore               # Specifies intentionally untracked files to ignore
├── README.md                # This comprehensive README file
├── client/                  # Frontend application powered by Next.js
│   ├── public/              # Static assets (images, fonts, etc.)
│   ├── src/                 # Main source code for the Next.js app
│   │   ├── app/             # App Router pages and layouts
│   │   ├── components/      # Reusable UI components
│   │   └── lib/             # Utility functions and client-side logic
│   └── package.json         # Frontend dependencies and scripts
├── login_payload.json       # Example JSON payload for login requests
└── server/                  # Backend API built with Node.js, Express, and Sequelize
    ├── config/              # Database configuration
    ├── controllers/         # API logic handlers
    ├── models/              # Sequelize models (database schemas)
    ├── routes/              # API endpoint definitions
    ├── utils/               # Utility functions (e.g., JWT, bcrypt)
    ├── .env.example         # Example environment variables
    ├── create_db.js         # Script to initialize the database
    ├── seed.js              # Script to populate initial data
    ├── server.js            # Main backend application entry point
    └── package.json         # Backend dependencies and scripts
```

---

## ⚙️ Installation & Setup Instructions

Follow these steps to get the `360coreInc` platform up and running on your local machine.

### 1. Prerequisites

Ensure you have the following installed:

*   **Node.js**: Version 18 or higher. [Download here](https://nodejs.org/en/download/).
*   **MySQL Server**: A running MySQL instance. [Download here](https://dev.mysql.com/downloads/mysql/).

### 2. Configuration

Navigate to the `server` directory and create a `.env` file. Populate it with your database credentials and secret keys:

```env
DB_NAME=investment_db
DB_USER=root
DB_PASS=your_mysql_password
DB_HOST=localhost
JWT_SECRET=a_very_strong_and_random_jwt_secret_key
ADMIN_KEY=your_secret_admin_key_for_daily_returns
```

*   **`DB_NAME`**: Name for your MySQL database.
*   **`DB_USER`**: Your MySQL username (e.g., `root`).
*   **`DB_PASS`**: Your MySQL password.
*   **`DB_HOST`**: Your MySQL host (usually `localhost`).
*   **`JWT_SECRET`**: A strong, unique string for JWT token signing.
*   **`ADMIN_KEY`**: A secret key required for triggering daily returns via the admin endpoint.

### 3. Database Initialization

1.  **Install Backend Dependencies**:
    Navigate to the `server` directory and install required Node.js packages:
    ```bash
    cd server
    npm install
    ```
2.  **Create Database & Tables**:
    Run the database creation script. This will create the `investment_db` (or whatever you named it in `.env`) and define all necessary tables.
    ```bash
    node create_db.js
    ```
3.  **Seed Initial Data**:
    Populate the database with initial data, including a mandatory admin user.
    ```bash
    node seed.js
    ```
    *Note: This script initializes the system with an initial registry entry (e.g., an admin user) and creates their referral code, typically `ADMIN1` or `ORIGIN`, which can be used for the first user registrations.*

### 4. Run the Application

#### Start Backend Server

From the `server` directory:

```bash
npm run dev
```
The backend server will typically run on `http://localhost:5000`.

#### Start Frontend Application

1.  **Install Frontend Dependencies**:
    Open a new terminal, navigate to the `client` directory, and install required Node.js packages:
    ```bash
    cd ../client
    npm install
    ```
2.  **Run Frontend Development Server**:
    From the `client` directory:
    ```bash
    npm run dev
    ```
The frontend application will typically run on `http://localhost:3000`.

---

## 🚀 Usage & API Documentation

Interact with the `360coreInc` platform via its intuitive frontend or directly through its robust API.

### Authentication Endpoints

*   **Register a New User**
    *   `POST /api/auth/register`
    *   **Body**:
        ```json
        {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "password": "StrongPassword123",
          "referralCode": "ADMIN1" // Must be a valid existing referral code
        }
        ```
    *   **Returns**: `{ token: "...", user: { id, name, email, referralCode, ... } }`

*   **User Login**
    *   `POST /api/auth/login`
    *   **Body**:
        ```json
        {
          "email": "john.doe@example.com",
          "password": "StrongPassword123"
        }
        ```
    *   **Returns**: `{ token: "...", user: { id, name, email, referralCode, ... } }`

### Transaction Endpoints (JWT Required)

*   **Make a Deposit**
    *   `POST /api/transactions/deposit`
    *   **Auth**: Requires a valid JWT in the `Authorization` header (e.g., `Bearer <token>`).
    *   **Body**:
        ```json
        {
          "amount": 100 // Minimum deposit amount is $100
        }
        ```
*   **Get User Transaction History**
    *   `GET /api/transactions`
    *   **Auth**: Requires a valid JWT in the `Authorization` header.
    *   **Returns**: An array of the last 10 ledger entries for the authenticated user.
        ```json
        [
          {
            "id": 1,
            "userId": 101,
            "type": "DEPOSIT",
            "amount": 500.00,
            "description": "Initial investment",
            "createdAt": "2023-10-27T10:00:00Z"
          },
          // ... more transactions
        ]
        ```

### Admin Endpoints

*   **Trigger Daily Returns (Admin Only)**
    *   `POST /api/admin/run-daily-returns`
    *   **Header**: `x-admin-key: your_secret_admin_key` (as configured in `.env`)
    *   **Action**: This endpoint initiates the global distribution of 0.6% daily interest to all eligible investors.
    *   **Frequency**: This operation is designed to run only once per day, enforced by the backend logic.

---

## 📊 Database Schema Explanation

The system's core data is structured around two primary entities: `User` and `Transaction`.

### `User` Table

*   **`id`**: Unique identifier for each user (Primary Key).
*   **`name`**: Full name of the user.
*   **`email`**: Unique email address for login.
*   **`password`**: Hashed password using Bcrypt.
*   **`referralCode`**: Unique code generated for each user, used for referrals.
*   **`referredBy`**: The `referralCode` of the user who referred this user, establishing the network hierarchy.
*   **`totalInvested`**: Aggregated sum of all deposits made by the user.
*   **`totalEarned`**: Aggregated sum of all daily returns and referral bonuses received by the user.
*   **`isEarningCapReached`**: Boolean flag indicating if the user has reached their 3x earning cap.
*   **`createdAt`**, **`updatedAt`**: Timestamps for record creation and last update.

### `Transaction` Table

*   **`id`**: Unique identifier for each transaction (Primary Key).
*   **`userId`**: Foreign Key referencing the `User` table, indicating which user initiated/received the transaction.
*   **`type`**: An ENUM with possible values: `'DEPOSIT'`, `'DAILY_RETURN'`, `'REFERRAL_BONUS'`. This categorizes the financial event.
*   **`amount`**: The monetary value of the transaction.
*   **`description`**: A brief explanation or context for the transaction.
*   **`createdAt`**: Timestamp when the transaction was recorded. This table serves as an immutable, append-only ledger of all financial movements within the system.

---

## 📈 Scaling Strategy (100k+ Users)

To ensure the `360coreInc` platform can gracefully scale to support 100,000+ users and beyond, the following infrastructure and architectural upgrades are recommended:

*   **Asynchronous Processing with Message Queues**:
    *   Offload heavy, batch-oriented tasks like the daily return distribution logic to background workers.
    *   Implement **BullMQ** or **RabbitMQ** to queue these tasks, allowing the main API to remain responsive while complex computations run in the background. This is crucial for distributing interest to tens of thousands of users without blocking the primary application.

*   **Database Scaling & Optimization**:
    *   **Read Replicas**: Deploy read replicas for the MySQL database to offload read-heavy dashboard queries and analytical reports from the primary database, improving overall read performance and reducing contention.
    *   **Index Optimization**: Continuously monitor and add composite indexes to high-traffic tables (especially `Transaction` and `User`) based on query patterns. This drastically improves query execution times as data volumes grow.
    *   **Connection Pooling**: Implement robust database connection pooling to efficiently manage database connections, reducing overhead.

*   **Caching Layer with Redis**:
    *   Introduce **Redis** as a caching layer for high-frequency, read-intensive data.
    *   Cache user balances, earning cap statuses, referral network details, and frequently accessed transaction summaries. This significantly reduces direct database query load and improves response times for common user requests.

*   **Horizontal Scaling with Load Balancing**:
    *   Deploy the Node.js backend and Next.js frontend across multiple server instances (containers/VMs).
    *   Place these instances behind a **Load Balancer** (e.g., Nginx, AWS Application Load Balancer, or Kubernetes Ingress) to distribute incoming traffic evenly, enhancing throughput and fault tolerance.

*   **Distributed Locking for Critical Tasks**:
    *   Utilize a distributed lock manager (e.g., **Redlock** with Redis) to ensure that scheduled tasks, particularly the `run-daily-returns` job, are executed exactly once across a clustered environment, preventing race conditions and duplicate processing.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
*(Note: A `LICENSE` file would typically be created in the root directory)*