# HOW TO MONETIZE?
    - Donation (please help me)
    - Membership 
    - Sponsor

# To Fix
    1. Implement adding/removing from favorites via Products
        - Needs a way to update 'LocalStorage' and 'State' 
            - For state, we use redux so not bad

        Q1. Can we move handleFavorites to Products?
            If so, can handleFavorites check and update Faovirtes state? Instead of us doing in Product.js 

            Should it be moved to a database call? 

# Resources
    ## Sequlize stuff
    https://github.com/001-mak/Sequelize-Postgres-Database/blob/main/controllers/departmentController.js

    https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9



====================================================================
-- working 
pg_dump --dbname=postgres --host=localhost --table=product --username=postgres --encoding=utf8 --no-owner  --password > server1_db.sql
psql --host=heffalump.db.elephantsql.com --username=ajftcpaw --dbname=ajftcpaw --password -f "server1_db.sql"
====================================================================

