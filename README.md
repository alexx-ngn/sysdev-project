# Installation Guide

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **PHP**: Version 8.4 or higher
- **Composer**: Version 2.8 or higher
- **Database**: MySQL
- **Node.js**: Version 22 or higher
- **Docker**: Version 20.10 or higher

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

Edit the `.env` file to set the database connection and other environment-specific settings:

```bash
APP_NAME=MilesForHope

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=milesforhope
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@milesforhope.org"
MAIL_FROM_NAME="Miles for Hope"

FRONTEND_URL=http://localhost:3000

#Ask Alex for Stripe API keys
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=
STRIPE_KEY=
```

## Run Supporting Services with Docker Compose

To run the database and mail catcher in Docker, from the project root execute:

```bash
docker compose -f docker/docker-compose.yml up -d
```

This will bring up:
- **MySQL** on http://localhost:3306
- **phpMyAdmin** at http://localhost:8080
- **Mailpit** at http://localhost:8025

To tear everything down:

```bash
docker compose -f docker/docker-compose.yml down
```

## Initialize Laravel App

Set up the database and application key:

```bash
cd backend
php artisan migrate
php artisan key:generate
```

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

Open your web browser and go to `http://localhost:3000` to access the application.

## Admin Access

By default, the first user in the admin panel will have to setup the admin account at `http://localhost:3000/admin`