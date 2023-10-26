Help Desk Project

Installation:

1. install MySQL

2. add '.env' file at './backend' with following content:
    ```
    DB_USER=yourUsername
    DB_PASSWORD=yourPassword
    DB_DATABASE=yourDatabase
    ```
3. run npm install or npm install --force at './backend' and './frontend' for installing related library

4. run npx knex migrate:latest to create tables to your Database

5. run npx knex seed:run to create content for tables

6.  run npm start at './backend' and './frontend'

7. use user account at 'backend\seeds\create_users_and_tickets_data.ts' get login info or      check table from MySQL database users table