# Cmc_In

Cmc_In, is an open-source project that facilitates communication
among student community within Cmc institution!

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

Node.js and npm.

Composer 

PHP 8.0+ and MySQL database server running


## Installation Guide
### Clone the Repository:

```
https://github.com/soufianemou/cmc-in-backend.git
```
### Install Dependencies Backend:


Navigate to the project directory: ``` cd cmc_in ```

Install Composer dependencies: ``` composer install ```

Generate Application Key: ``` php artisan key:generate ```

Navigate to the project directory: ``` cd cmc_in ```


### Configure Database:

Copy: ```.env.example``` to ```.env``` and update database credentials:

```
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=root
DB_PASSWORD=
```
Create Database with the same name DB_DATABASE in ```.env```

### Migrate Database:


```php artisan migrate```

### Seed Database (Optional):

```php artisan db:seed```

### Storage Link :

```php artisan storage:link```

Start the backend server :

```php artisan serve```

### Install Dependencies Frontend:


Navigate to the frontend directory: ```cd frontend```

create a .env file in frontend directory and add this line : 

```
VITE_API_URL=http://localhost:8000
```

Install npm dependencies: ```npm install```

Start the frontend server: ```npm run dev```


### Configuring Google Authentication:

To enable Google authentication , you need to set up a project in the Google Developer Console and obtain the necessary credentials. and update .env file:

```
GOOGLE_CLIENT_ID= your-google-client-id
GOOGLE_CLIENT_SECRET= your-google-client-secret
```

### Configuring Mail Settings

To configure mail settings, you will need to set up the necessary SMTP details in your .env file.

## Contributing

so after cloning the projet

Create a new branch for your feature or bug fix: ```git checkout -b feature/my-feature```

Commit your changes: ```git commit -m 'Add new feature'```

Push your changes to your fork: ```git push origin feature/my-feature```

Open a Pull Request against the main branch of the original repository and clearly explain your changes in the PR description.

#### Thank you for your interest in contributing to Cmc_In! I appreciate your help
