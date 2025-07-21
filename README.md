# FolkTrade - A MERN Stack Marketplace App

FolkTrade is a full-stack MERN application that serves as a community marketplace. Users can sign up, log in, browse products listed by others, and sell their own items. The application features user authentication, product management, and a clean, modern user interface.

## Features

- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **Product Listings:** Users can view a gallery of products available for sale.
- **Sell Products:** An intuitive form allows authenticated users to list their own products, including image uploads.
- **My Products:** Users can view and manage the products they have listed.
- **User Profiles:** Users can view and edit their profile information.
- **Responsive Design:** The application is built with Tailwind CSS for a responsive experience on all devices.
- **Theming:** Includes a light/dark mode toggle.

## Technology Stack

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool and development server for modern web projects.
- **React Router:** For client-side routing.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Axios:** For making HTTP requests to the backend API.
- **React Hot Toast:** For user-friendly notifications.

### Backend

- **Node.js:** A JavaScript runtime for the server.
- **Express:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database for storing user and product data.
- **Mongoose:** An ODM library for MongoDB and Node.js.
- **JSON Web Tokens (JWT):** For securing API endpoints.
- **Bcrypt.js:** For hashing user passwords.
- **Cloudinary:** For cloud-based image storage.
- **Nodemailer:** For sending emails (e.g., for OTPs or notifications).

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB Atlas account (or a local MongoDB instance)
- Cloudinary account

### Local Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd FolkTrade
    ```

2.  **Set up the Backend:**

    - Navigate to the server directory:
      ```bash
      cd server
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `server` directory and add the following variables:
      ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      PORT=5000
      CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret
      EMAIL_USER=your_email_address
      EMAIL_PASS=your_email_password
      ```
    - Start the backend development server:
      ```bash
      npm run dev
      ```
    - The server will be running on `http://localhost:5000`.

3.  **Set up the Frontend:**
    - Open a new terminal and navigate to the client directory:
      ```bash
      cd client
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the frontend development server:
      ```bash
      npm run dev
      ```
    - The application will be available at `http://localhost:5173`.

---

## Available Scripts

### Backend (`server` directory)

- `npm run dev`: Starts the server with Nodemon for development.
- `npm start`: Starts the server for production.

### Frontend (`client` directory)

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Lints the source code.
