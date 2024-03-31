# HOW TO MONETIZE?
    - Donation (please help me)
    - Membership 
    - Sponsor

# To Fix
    1. Fixed Favorites
    2. Updating Post page 
        Add imageUrl
        Add Files
            If image files
                1. Send it to Azure Storage
                2. Update database 


// TO DO
// 1. Add capabiltiy for users to user their image file
    - Condense, add to Storageaccount, get the id and add to database 
// 2. Fix Favorites workflow (syncing)
    - localStorage vs Database 

# Resources
    ## Sequlize stuff
    https://github.com/001-mak/Sequelize-Postgres-Database/blob/main/controllers/departmentController.js

    https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9



====================================================================
-- working 
pg_dump --dbname=postgres --host=localhost --table=product --username=postgres --encoding=utf8 --no-owner  --password > server1_db.sql
psql --host=heffalump.db.elephantsql.com --username=ajftcpaw --dbname=ajftcpaw --password -f "server1_db.sql"
====================================================================

