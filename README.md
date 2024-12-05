# Medication Reminder App

## Overview

The **Medication Reminder App** is a full-stack application designed to help users manage their medication schedules. It consists of a backend API built with **Node.js and Express** and a frontend built with **React**. The backend handles user authentication, medication management, and acknowledgment logging, while the frontend provides a user-friendly interface.

The app features **two roles**:  
1. **User**:  
   - Can create/add medicines.  
   - Can view the list of medicines they added.  
   - Can acknowledge medicines.  
2. **Admin**:  
   - Can view all acknowledgments.  
   - Can delete acknowledgments.  

---

## Architecture

The application is divided into two main parts:

### Backend:
- Built with **Node.js** and **Express**.
- Handles:
  - User authentication.
  - Medication management.
  - Acknowledgment logging.
- Uses **MySQL** for data storage.
- API documentation is provided using **Postman**.

### Frontend:
- Built with **React**.
- Provides a user-friendly interface for users to interact with the application.
- Communicates with the backend API to perform CRUD operations.

---

## Folder Structure

```plaintext
medication-reminder-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── medicineController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── medicineRoutes.js
│   ├── .env
│   ├── postman-collection.json
│   ├── server.js
│   ├── package.json
│   ├── node_modules/
│   └── package-lock.json
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── Login.js
│   │   │   ├── MedicineSchedule.js
│   │   │   └── Register.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── AppWrapper.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── ...
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tailwind.config.js
├── README.md
```

---

## Running the Application Locally

### Prerequisites

- **Node.js** and **npm** installed
- **MySQL** installed and running

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd medication-reminder-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```plaintext
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=medication_reminder
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations (if applicable):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the backend server:
   ```bash
   node server.js
   ```

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd medication-reminder-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

---

## Accessing the Application

- **Frontend**: Open your browser and navigate to [http://localhost:3001](http://localhost:3001)
- **Backend API**: The backend API is accessible at [http://localhost:3000/api](http://localhost:3000/api)
- **Postman Collection**: The Postman collection is accessible at [http://localhost:3000/postman-collection](http://localhost:3000/postman-collection)

---

## API Documentation

API documentation is provided using **Postman**. You can import the Postman collection from the following URL:  
[http://localhost:3000/postman-collection](http://localhost:3000/postman-collection)

---

## Database Setup
To set up the database schema, run the following SQL commands in your MySQL client:

```bash
CREATE DATABASE medication_reminder;

USE medication_reminder;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    dosage VARCHAR(255) NOT NULL,
    schedule_time TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE acknowledgment_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    medicine_id INT,
    status VARCHAR(50) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

ALTER TABLE acknowledgment_logs MODIFY COLUMN status VARCHAR(255) DEFAULT 'Taken'; 
```

## Summary

This README provides an overview of the **Medication Reminder App**, explains the architecture, and includes detailed instructions on running the backend and frontend locally. It highlights the role-based features for **users** and **admins**, providing clarity on their respective functionalities. Users can **add medicines**, **view the list of medicines they added**, and **acknowledge medicines**, while admins can manage and delete acknowledgments. This documentation helps users understand the project structure and set it up on their local machines.