Help Desk Project

Installation:

1. install MySQL

2. add '.env' file at './backend' with following content:
    ```
    DB_LOACALHOST=localhost
    DB_USER=yourUsername
    DB_PASSWORD=yourPassword
    DB_DATABASE=yourDatabase
    ```
3. run npm install or npm install --force at './backend' and './frontend' for installing related library

4. run npx knex migrate:latest to create table on your Database

5. run npx knex seed:run to create random content for table

6.  run npm start at './backend' and './frontend'