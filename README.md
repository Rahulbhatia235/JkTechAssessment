# User Authentication and Document Management Service

## Description
This is a backend service built with **NestJS** to manage **user authentication**, **document management**. It provides features such as user registration, login, JWT-based authentication, document upload.

## Features:
- **User Authentication:**
  - User registration with email/password
  - JWT-based authentication for login
  - Secure password storage with hashing
  - Authorization middleware with roles (Admin/User)
  
- **Document Management:**
  - Document upload (PDF, Word, etc.)
  - Document versioning
  - Document retrieval based on user permissions


## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [API Documentation](#api-documentation)
4. [Acknowledgements](#acknowledgements)


## Installation

### Prerequisites:
Before installing the project, ensure you have the following installed:
- **Node.js** (v14.x or above)
- **npm**
- **PostgreSQL** or any database supported by **TypeORM**

1. Clone the repository:
  git clone https://github.com/Rahulbhatia235/JkTechAssessment.git

2. Navigate to the project directory:
  cd jk-assignment

3. Download the dependency
  npm install

4. Run the application
  npm run start

### Usage:
Once the server is running, you can use the following API endpoints for user authentication, document management, and ingestion control.

POST /auth/register - Register a new user
POST /auth/login - User login and get JWT token



## API Documentation
The API follows REST principles and supports JSON format for data exchange. The service also provides Swagger documentation at /api-doc. You can view it by navigating to http://localhost:4080/api-doc once the application is running.

   

## Acknowledgements
NestJS for building the backend framework.
TypeORM for ORM and database management.
Passport.js for user authentication.
AWS SDK for document storage in S3.
Swagger for API documentation.
JWT for user authentication tokens