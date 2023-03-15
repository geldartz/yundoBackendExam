# Yundo Backend Exam
This repository contains my response to the backend technical exam at Yundo.


## Installation

Clone the repository first

```git
git clone https://github.com/geldartz/yundoBackendExam.git 
```

Go to folder

```bash
cd  yundoBackendExam
```

Install all npm packages

```bash
npm install
```

## Migrations and Seeders

Create a mysql database in your local enviroment and edit the development database credentials in config/config.json

Please run this command to migrate the tables to the database.
This will create a User table.
```bash
npx sequelize-cli db:migrate
```

To have an initial data to the database. Please run this seeder to create a new user with a default password = "password"
```bash
npx sequelize-cli db:seed:all
```

## Available REST APIs

To access all the APIs in this application, please refer to this URL.
[https://documenter.getpostman.com/view/19670999/2s93JuuNfh](https://documenter.getpostman.com/view/19670999/2s93JuuNfh)

## Unit Test

Please change the login credentials in before function before running the test.

For testing please stop running npm dev on port 5001 and run this command.
```bash
npm run test
```

Thank you!

## License

[MIT](https://choosealicense.com/licenses/mit/)