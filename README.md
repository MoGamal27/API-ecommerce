# E-Commerce Application

A comprehensive e-commerce application with user authentication, role-based user management, email verification, password recovery, PayPal payment processing, and full CRUD operations for products, shopping cart, and orders. Built using Node.js, Express.js, and PostgreSQL.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

## Introduction

This project is a feature-rich e-commerce application that provides user authentication, role-based user management, email verification, password recovery, seamless PayPal payment processing, and full CRUD operations for products, shopping cart, and orders.

## Features

- **User Authentication:**
  - Register and authenticate users securely.

- **Role-Based User Management:**
  - CRUD operations for user management based on roles (admin, user).

- **Email Verification:**
  - Verify user emails during the registration process.

- **Password Recovery:**
  - Enable users to recover their passwords securely.

- **PayPal Payment Processing:**
  - Integrate PayPal for secure and efficient payment processing.

- **Product Management:**
  - CRUD operations for managing products.

- **Shopping Cart:**
  - CRUD operations for managing the shopping cart.

- **Order Management:**
  - CRUD operations for managing orders.

Usage
To start the application, run:
npm start
 http://localhost:4000 

## API Endpoints

### User Management:

- `GET /users`: Get a list of all users.
- `GET /users/:id`: Get details of a specific user.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user.
- `DELETE /users/:id`: Delete a user.

### Email Verification:

- `POST /verify-email/:token`: Verify user email.

### Password Recovery:

- `POST /recover-password`: Initiate password recovery.
- `POST /reset-password/:token`: Reset user password.

### PayPal Integration:

- `POST /create-payment`: Create a PayPal payment.
- `GET /success`: Handle successful PayPal payment.
- `GET /cancel`: Handle canceled PayPal payment.

### Product Management:

- `GET /products`: Get a list of all products.
- `GET /products/:id`: Get details of a specific product.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update a product.
- `DELETE /products/:id`: Delete a product.

### Shopping Cart:

- `GET /cart/:userId`: Get the shopping cart for a specific user.
- `POST /cart`: Add a product to the shopping cart.
- `PUT /cart/:id`: Update the quantity of a product in the cart.
- `DELETE /cart/:id`: Remove a product from the cart.

### Order Management:

- `POST /orders`: Create a new order. **(Requires JWT Verification)**
- `GET /orders/:id`: Get details of a specific order. **(Requires JWT Verification)**
- `GET /orders/:userId`: Get the order history for a specific user. **(Requires JWT Verification)**
- `PUT /orders/:id`: Update the status of an order. **(Requires JWT Verification)**
- `DELETE /orders/:id`: Cancel an order. **(Requires JWT Verification)**


Dependencies
Node.js
Express.js
PostgreSQL
