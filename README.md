# HOW TO MONETIZE?
    - Donation (please help me)
    - Membership 
    - Sponsor

# To Fix
    - (WHITE first) Favorites

        Synchro
            - Listen for changes in Local Storage using the 'storage' event
            - When a change occurs, dispatch an action to update the cart. Other tabs will receive this update via the 'storage' event listener

# Resources
    ## Sequlize stuff
    https://github.com/001-mak/Sequelize-Postgres-Database/blob/main/controllers/departmentController.js

    https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9



====================================================================
-- working 
pg_dump --dbname=postgres --host=localhost --table=product --username=postgres --encoding=utf8 --no-owner  --password > server1_db.sql
psql --host=heffalump.db.elephantsql.com --username=ajftcpaw --dbname=ajftcpaw --password -f "server1_db.sql"
====================================================================

