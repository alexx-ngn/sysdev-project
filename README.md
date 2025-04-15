# Installation Guide

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **PHP**: Version 8.4 or higher
- **Composer**: Version 2.8 or higher
- **Database**: MySQL
- **Node.js**: Version 22 or higher

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/alexx-ngn/sysdev-project.git
cd sysdev-project
```

## Install Dependencies

### Backend

Navigate to the backend directory and install the PHP dependencies:

```bash
cd backend
composer install
```

### Frontend (if applicable)

Navigate to the frontend directory and install the Node.js dependencies:

```bash
cd frontend
npm install
```

## Set Up Environment Variables

Copy the example environment file and configure your environment variables:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file to set your database connection and other environment-specific settings.
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=milesforhope
DB_USERNAME=root
DB_PASSWORD=
```

## Initialize Laravel App

Set up the database and application key:

```bash
cd backend
php artisan migrate
php artisan key:generate

## Start the Application

### Frontend

You can start the application using the following command:

```bash
cd frontend
npm run dev
```


### Backend

You can start the application using the following command:

```bash
cd backend
php artisan serve
```

## Access the Application

Open your web browser and go to `http://localhost:8000` to access the application.