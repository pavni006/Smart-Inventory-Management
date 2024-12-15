# Smart Inventory Management System

A **full-stack inventory management application** that tracks product stock, batch expiry, and automatically generates alerts for low stock and upcoming expirations. Built with a modern MERN-style stack and intelligent background scheduling using **node-cron**.

---

## 🚀 Features

### 📌 Inventory Core
- Manage **products** with essential details such as category, price, and minimum stock level.
- Add **batches** for products with individual expiry dates and quantities.

### 🤖 Automatic Alert Generation
- **Low stock alerts** generated automatically if available stock falls below the defined threshold.
- **Expiry alerts** created if batches are approaching expiration within configurable windows (e.g., 10, 15, 30 days).
- These background tasks are handled using **node-cron**, without manual intervention.

### 📉 FIFO Stock Deduction
- Sales are processed using a **FIFO (First Expiry First Out)** mechanism — ensuring the oldest batch is deducted first during a sale.

### 🛠 Intelligent Cron Jobs
- **Daily midnight job** recalculates current stock and expiration windows.
- Automatically **creates, updates, or deletes alerts** based on stock changes and batch additions.

### 📊 Analytics Dashboard
- **React UI** with intuitive visualization of:
  - Current inventory state
  - Upcoming expiring batches
  - Active stock and expiry alerts
- Uses **Chart.js** for rich, interactive graphs.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB & Mongoose |
| Task Scheduler | node-cron |
| Frontend | React.js, Tailwind CSS |
| Charts | Chart.js |
| API Calls | Axios |

---

## 📦 Getting Started

Follow these steps to set up the project locally.

---

### Clone the repository
```bash
git clone https://github.com/pavni006/Smart-Inventory-Management.git
cd Smart-Inventory-Management/backend
```

### Create .env file
In the backend folder, add a .env file with:

```bash
PORT=5000
MONGO_URI=<Your MongoDB connection string>
```

### Setup backend server
```bash
cd backend
npm install
npm run start
```

You should now see:
```bash
MongoDB connected
Server running on port 5000
```

---

## 🧠 How It Works: Background Cron Jobs
This project uses node-cron to handle scheduled jobs:
| Schedule      | Function                                |
| ------------- | --------------------------------------- |
| `0 0 * * *`   | Recompute stock & expiry alerts nightly |
| Automatically | Delete alerts when stock is healthy     |
| Automatically | Generate new alerts when conditions met |

## 🧪 Testing the System

### ➤ Add Products
Send a POST request to:
```bash
POST /api/products
```
Example body:
```bash
{
  "name": "Paracetamol",
  "category": "Medicine",
  "minStockLevel": 10
}
```

### ➤ Add Batches
```bash
POST /api/batches
```
Example:
```bash
{
  "productId": "634abc123...",
  "quantity": 50,
  "expiryDate": "2025-08-01"
}
```

