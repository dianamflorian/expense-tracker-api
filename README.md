# Expense Tracker & Budget REST API

A robust, production-grade TypeScript backend REST API built with Node.js, Express, and SQLite for personal expense tracking and budget management.

## What the Project Does

This API provides a complete backend solution for managing personal finances. It allows users to:
- Record, retrieve, update, and delete individual financial expenses with strict input validation.
- Set and manage category-based monthly spending budgets.
- Generate aggregate spending summaries grouped by category.
- Monitor system health via dedicated health check endpoints.
- Ensure data integrity and reliability through a comprehensive unit and integration test suite.

## Who It Is For

- **Individual Users / Self-Hosters:** Looking for a lightweight, self-hosted backend to power personal budgeting tools.
- **Frontend Developers:** Seeking a clean, well-documented REST API to pair with React, Vue, or mobile applications (Flutter/React Native).
- **Software Engineers:** Evaluating a clean architecture TypeScript Node.js codebase adhering to strict modular organization, error handling, and testing practices.

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (via `sqlite3`)
- **Security & Logging:** Helmet, CORS, Morgan
- **Testing:** Jest, Supertest, `ts-jest`

---

## Project Structure

```text
src/
├── controllers/    # Request handlers and business logic
├── models/         # Database access layer and SQL queries
├── routes/         # API endpoint routing definitions
├── middlewares/    # Custom Express middlewares (validation, error handling)
├── database.ts     # SQLite connection and schema initialization
├── app.ts          # Express application configuration
└── server.ts       # Application entry point
tests/              # Integration and unit test suites
```

---

## Setup & Installation Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/dianamflorian/expense-tracker-api.git
cd expense-tracker-api
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration in `.env`:
```env
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build and Run Production Server
```bash
npm run build
npm start
```

### 5. Run Test Suite
```bash
npm test
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/health` | System health check |
| **GET** | `/api/v1/expenses` | Retrieve all expenses |
| **POST** | `/api/v1/expenses` | Create a new expense (validated) |
| **GET** | `/api/v1/expenses/summary` | Get spending summary grouped by category |
| **GET** | `/api/v1/expenses/:id` | Retrieve single expense by ID |
| **PUT** | `/api/v1/expenses/:id` | Update expense by ID |
| **DELETE** | `/api/v1/expenses/:id` | Delete expense by ID |
| **GET** | `/api/v1/budgets` | Retrieve all monthly budgets |
| **POST** | `/api/v1/budgets` | Create or update budget limit |
| **DELETE** | `/api/v1/budgets/:id` | Delete budget by ID |

---

## Future Roadmap & TODO (>= 25 Hours of Upcoming Engineering Work)

| Task ID | Feature / Module | Description | Estimated Hours |
| :--- | :--- | :--- | :--- |
| **FM-01** | **Recurring Transactions** | Implement automated scheduling and recurring expense insertion (weekly, monthly, yearly) with background cron jobs. | 8 hours |
| **FM-02** | **Multi-Currency Conversion** | Integrate external FX rate APIs to support multi-currency expense entry and automatic base-currency conversion. | 6 hours |
| **FM-03** | **CSV / PDF Export** | Add export endpoints (`/api/v1/expenses/export/csv` and PDF report generation) for tax and accounting purposes. | 5 hours |
| **FM-04** | **JWT Authentication & Role Guards** | Implement secure user registration, login JWT tokens, password hashing (bcrypt), and multi-user role guards. | 8 hours |
| **FM-05** | **Budget Alert Webhooks** | Trigger real-time alerts and notifications when spending reaches 80% and 100% of category budget limits. | 4 hours |
| **Total** | **Planned Enhancements** | Comprehensive enterprise-grade feature expansion | **31 Hours** |

## License

ISC
