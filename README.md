Help Desk Project

Installation:

1. add '.env' file at './backend' with following content:
    ```
    DB_LOACALHOST=localhost
    DB_USER=yourUsername
    DB_PASSWORD=yourPassword
    DB_DATABASE=yourDatabase
    ```
2. run npm install or npm install --force at './backend' and './frontend' for installing related library

3. run npx knex migrate:latest to create table on your Database

4. run npx knex seed:run to create random content for table

5.  run npm start at './backend' and './frontend'