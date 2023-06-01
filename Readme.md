# Music Store Web App

## Introduction

This is a web application for a music store where customers can browse and purchase music instruments and supplies. It also includes an admin interface for managing products and stock. The application is built using a full-stack approach, with the frontend developed using ReactJS and the backend developed using NestJS. The application supports authentication based on roles, allowing customers and administrators to have different access levels.

## Features

- Customers can browse and search for products in the store.
- Customers can add products to their shopping cart and place orders.
- Administrators can create, update, and delete products.
- Administrators can manage the stock levels of products.
- Authentication system with role-based access control.
- Sortable tables for product listings.
- Search functionality to find specific products.

## Technology Used

- Frontend: ReactJS, ContextApi ,TypeScript
- Backend: NestJS, TypeOrm, TypeScript
- Database: Postgres
- Containerization: Docker, docker-compose

## Setup Instructions

To set up the project locally, follow these steps:

- Clone the repository to your local machine.
- Use node version: `16.15.0`
- Run `docker-compose up postgres -d` to run database server
- Install the required dependencies for both the backend and frontend:
  - Backend: Run `npm install` or `yarn` in the `backend` directory.
  - Frontend: Run `npm install` or `yarn` in the `frontend` directory.
- Configure the environment variables:
  - Backend: Create a `.env` file in the `backend` directory and provide the necessary environment variables.
- Start the backend server:
  - Run `npm run start` or `yarn start` in the `backend` directory.
- Start the frontend development server:
  - Run `npm run dev` or `yarn dev` in the `frontend` directory.
- Access the application by visiting the provided URL in your browser.

or

- Clone the repository to your local machine.
- Run `docker-compose up` or `docker compose up` for backend and frontend that also create `postgres` and `pgadmin` on `http://localhost:5050` with email: `admin@admin.com` and password: `admin`
- Access the application by visiting the provided URL in your browser on [http://localhost:3000](http://localhost:3000)

adding seed products

in the `backend` directory after running backend:

- Run `npm run create-products` or `yarn create-products` (this option uses Docker file to run .sh file)

  or

- Run `npm run create-products-local` or `yarn create-products-local`

## API Documentation

- Please refer to the [API documentation for local](https://documenter.getpostman.com/view/13377092/2s93mBvJbq) for details on the backend API routes and responses.

  or

- After running backend, please Swagger at [http://localhost:8000/api/](http://localhost:8000/api/)

## User Accounts

The application provides two types of user accounts:

1. Admin User:

   - Email: admin@admin.com
   - Password: admin

   The admin user has full access to the admin interface and can perform CRUD operations on products, manage stock levels, and perform other administrative tasks.

2. Customer User:

   - Email: user@user.com
   - Password: user

   The customer user can browse the store, search for products, add items to the shopping cart, and place orders.

## User Story

As a customer, I want to be able to browse the music store and search for specific products. I should be able to view product details, add products to my shopping cart, and place orders securely.

As an administrator, I want to have access to an admin interface where I can manage the products in the store. I should be able to create new products, update existing products, and delete products if necessary. I should also be able to manage the stock levels of the products.
