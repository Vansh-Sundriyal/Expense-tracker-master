# Expense Tracker Master

## Project Overview

Expense Tracker Master is a full-stack expense management application that allows users to record daily expenses, categorize spending, filter transactions, visualize spending patterns, and export filtered expenses as CSV files. The application uses a React frontend and an Express backend with JSON file persistence.

---

## Live Demo

Frontend:
https://expense-tracker-master-exp.vercel.app/

Backend:
https://expense-tracker-master-api.onrender.com/api/expenses

### Note

The backend is hosted on Render's free tier. The first request after a period of inactivity may take a few seconds while the server wakes up.

---

## Features

### Expense Management

* Add expenses
* Edit existing expenses
* Delete expenses
* Persistent storage using a JSON file

### Filtering

* Filter by category
* Filter by date range:

  * This Month
  * Previous Month
  * Last 6 Months
  * This Year
  * Previous Year

### Analytics

* Total spending summary
* Highest expense tracking
* Category-wise spending totals
* Pie chart visualization using Recharts

### CSV Export

* Export currently visible expenses
* Respects active category and date filters

### User Experience

* Responsive design
* Loading state while backend data is fetched
* Toast notifications
* Empty state handling
* Interactive Lordicon icons

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* React Toastify
* Lordicon

### Backend

* Node.js
* Express.js

### Storage

* JSON File

---

## Project Structure

```text
expense-tracker-master
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── utils
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── controllers
│   ├── routes
│   ├── data
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## How to Run Locally

### Prerequisites

* Node.js (v18 or newer)
* npm

### Clone Repository

```bash
git clone https://github.com/Vansh-Sundriyal/Expense-tracker-master.git
cd Expense-tracker-master
```

### Local API Configuration

The deployed version uses the hosted Render backend.

To run the project locally, open:

```text
client/src/services/api.js
```

Replace:

```js
const BASE_URL =
  "https://expense-tracker-master-api.onrender.com/api/expenses";
```

with:

```js
const BASE_URL =
  "http://localhost:5000/api/expenses";
```

### Backend Setup

```bash
cd server
npm install
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Documentation

### Get All Expenses

```http
GET /api/expenses
```

Response:

```json
[
  {
    "id": "123",
    "amount": "120",
    "category": "Food",
    "date": "2026-06-01",
    "note": "Breakfast"
  }
]
```

### Create Expense

```http
POST /api/expenses
```

Request Body:

```json
{
  "amount": "120",
  "category": "Food",
  "date": "2026-06-01",
  "note": "Breakfast"
}
```

### Update Expense

```http
PUT /api/expenses/:id
```

Request Body:

```json
{
  "amount": "150",
  "category": "Food",
  "date": "2026-06-01",
  "note": "Updated"
}
```

### Delete Expense

```http
DELETE /api/expenses/:id
```

Response:

```json
{
  "message": "Expense deleted"
}
```

---

## Resources and References

The following official documentation and resources were used during development:

### React

https://react.dev

### Vite

https://vitejs.dev

### Tailwind CSS

https://tailwindcss.com/docs

### Express

https://expressjs.com

### Recharts

https://recharts.org

### React Toastify

https://fkhadra.github.io/react-toastify

### Lordicon

https://lordicon.com

---

## Next Steps

Additional Features to implement later:

* Budget tracking per category
* Monthly spending trend charts
* CSV import support
* User authentication
* Database integration (PostgreSQL or MongoDB)
* Automated testing for API routes and React components

---

## Notes

AI-assisted tools were used during development for debugging, implementation review, and troubleshooting. All submitted code was reviewed, understood, tested, and modified where necessary before submission.

The project ships with sample expense data to make it easier to explore filtering, analytics, and chart functionality immediately after setup.
