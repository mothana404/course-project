## course-website

## Introduction
This README file will guide you through the process of setting up and running the project.

## Prerequisites
- Node.js and npm installed on your machine
- A database (PostgreSQL) and the necessary credentials

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

then install the necessary npm packages:
```
npm i
```

#### create the DataBase File:
* download the DB file that contains data sample and import it to your database
[Download DB file](https://drive.google.com/file/d/1a95yJKdklkoRikWhnWJXv4WF9RSv4gDP/view?usp=sharing)

#### connect to your DataBase:
* open the config file in the Backend folder and replace the data for your database on it

#### set the environment variables:
* create a **.env** file in Backend folder and copy these data sample to it
```
SECRET_KEY=8d00285ecc43735bac65b905f8146003f6fea944bdc2197b013de6610926ad0222a1cc0641c0f48287c37938cf2081612b89e7ec82b7d60dcbb80609b7d84d81
PORT=8080
```

#### Firebase Key:
download the firebase file from this link and paste the file in the Backend folder
[Download firebaseServiceAccountKey.json](https://drive.google.com/file/d/1QIMVeBj1GGEPIkgnhw6dlaVKLCzf89FQ/view?usp=sharing)



run command:
```
nodemon .\server.js
```

***

### 2. How to run frontend file
go to the frontend file from a new terminal:
```
cd frontend
```

then install the necessary npm packages:
```
npm i
```

run command:
```
npm start
```

***
### 3. Extra
!(files structure)[https://drive.google.com/file/d/1VkyGLNBnQyblYDqV8JE5r2yLQP06QH6w/view?usp=sharing]


!(config file)[https://drive.google.com/file/d/1fjKJpeXMEMukUVsKpS4XQAwz7eUvRYcQ/view?usp=sharing]