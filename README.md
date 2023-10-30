Help Desk Project

Installation:

1. install MySQL

2. clone file from https://github.com/Kimau102/help_desk.git

3. add '.env' file at './backend' with following content:
    ```
    DB_USER=yourUsername
    DB_PASSWORD=yourPassword
    DB_DATABASE=yourDatabase
    ```
4. run npm install or npm install --force at './backend' and './frontend' for installing related library

5. run npm run knex migrate:latest to create tables to your Database

6. run npm run knex seed:run to create content for tables

7.  run npm start at './backend' and './frontend'

8. use user account at 'backend\seeds\create_users_tickets.ts' get login ac and password or check table from MySQL database users table