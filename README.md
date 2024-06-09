## course-website

## Introduction
This README file will guide you through the process of setting up and running the project.

## Prerequisites
- Node.js and npm installed on your machine
- A database (e.g., PostgreSQL, MySQL) and the necessary credentials

## Setup and Installation

### 1. Clone the Repository
First, clone the repository to your local machine:
```
git clone https://github.com/mothana404/course-project.git
```

### 2. How to run the server
go to the backend file from the terminal:
```
cd Backend
```

#### then install the necessary npm packages:
```
npm i
```

#### open the config file in the Backend and replace the data for your database

#### download the DB file with data sample and import it to your database

#### create a .env file in Backend folder with these data
```
SECRET_KEY=8d00285ecc43735bac65b905f8146003f6fea944bdc2197b013de6610926ad0222a1cc0641c0f48287c37938cf2081612b89e7ec82b7d60dcbb80609b7d84d81
PORT=8080
```

#### download the file from this link and paste the file in the Backend folder
[Download firebaseServiceAccountKey.json](https://drive.google.com/file/d/1QIMVeBj1GGEPIkgnhw6dlaVKLCzf89FQ/view?usp=drive_link)

#### run command:
```
nodemon .\server.js
```

### 2. How to run frontend file
#### go to the frontend file from a new terminal:
```
cd frontend
```

#### then install the necessary npm packages:
```
npm i
```

#### run command:
```
npm start
```