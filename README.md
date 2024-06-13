# CRM Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [License](#license)

## Introduction

Welcome to the CRM Application. This project is a mini Customer Relationship Management (CRM) system designed to manage customer data and run marketing campaigns efficiently. It features data ingestion, audience creation, campaign management, and Google-based authentication.
## Interface
![image](https://github.com/aditya6021/crm-app/assets/105545824/c5452de7-0ca8-4259-830e-1d4f979e9798)



## Features

1. **Data Ingestion**:
    - APIs to ingest customer and orders data into the database.
2. **Send Campaign**:
    - Create audiences based on specific rules.
    - Check audience size before creating campaigns.
    - Save audiences and list past campaigns.
    - Google-based authentication.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/crm-app.git
    cd crm-app
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add your environment variables:

    ```sh
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

4. **Start the development server**:

    ```sh
    npm start
    ```

## Usage

1. **Data Ingestion**:

    Use Postman or any API client to hit the data ingestion endpoints and insert data into the `customers` and `orders` tables.

2. **Send Campaign**:

    - Open the application in your browser.
    - Sign in using Google authentication.
    - Create an audience by specifying rules and conditions.
    - Check the audience size and create the audience.
    - View and manage past campaigns.

## API Endpoints

1. **Check Audience Size**:

    ```sh
    POST /api/audiences/check_size
    ```

    **Request Body**:

    ```json
    {
        "rules": [
            { "field": "total_spends", "operator": ">", "value": "10000", "condition": "AND" },
            { "field": "max_visits", "operator": "=", "value": "3", "condition": "AND" }
        ]
    }
    ```

2. **Create Audience**:

    ```sh
    POST /api/audiences
    ```

    **Request Body**:

    ```json
    {
        "rules": [
            { "field": "total_spends", "operator": ">", "value": "10000", "condition": "AND" },
            { "field": "max_visits", "operator": "=", "value": "3", "condition": "AND" }
        ]
    }
    ```

3. **Send Campaign**:

    ```sh
    POST /api/campaigns/send
    ```

    **Request Body**:

    ```json
    {
        "audience_id": 1,
        "message": "Hi {name}, here is 10% off on your next order"
    }
    ```

## Scripts

- **Start Development Server**: `npm start`
- **Build Production Version**: `npm run build`
- **Run Tests**: `npm test`

## Technologies Used

- **Frontend**:
    - React
    - React Router
    - CSS

- **Backend**:
    - Node.js
    - Express
    - PostgreSQL

- **Authentication**:
    - Firebase Authentication

- **Other Tools**:
    - Axios
    - Postman


## License

This project is licensed under the MIT License.
