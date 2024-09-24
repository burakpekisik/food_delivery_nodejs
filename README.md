# Food Delivery Project

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Introduction
The Food Delivery Project is a web application built using Node.js that allows users to order food from various restaurants. It provides a seamless experience for customers to browse menus, place orders, and track their deliveries in real-time. This project aims to enhance the online food ordering experience by incorporating modern web technologies and best practices.

## Features
- User registration and authentication
- Browse customers and menus
- Add items to the cart and place orders
- Manage order statuses
- Admin dashboard to manage restaurants and orders
- Responsive design for mobile and desktop users

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** JSON Web Tokens (JWT)
- **Version Control:** Git, GitHub

## Getting Started
To get a local copy of this project up and running, follow these steps.

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/burakpekisik/food_delivery_nodejs.git
   ```

2. Navigate to the project directory:
   ```bash
   cd food_delivery_nodejs
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the root directory. Use the following template:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Create a new account or log in with your existing account.
3. Browse through the available restaurants and their menus.
4. Add items to your cart and proceed to checkout to place your order.

## API Endpoints
The project includes the following API endpoints:

- **User Authentication**
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Log in an existing user

- **Restaurants**
  - `GET /api/restaurants`: Retrieve a list of all restaurants
  - `GET /api/restaurants/:id`: Get details of a specific restaurant

- **Orders**
  - `POST /api/orders`: Place a new order
  - `GET /api/orders/:id`: Retrieve order details

- **Admin**
  - `GET /api/admin/orders`: Retrieve all orders for admin

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
