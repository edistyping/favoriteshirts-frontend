# TO DO 

    NavBar
        - Links
        - Login
        - SignUp

    All Pages
        - Favorite Features
            State 
            - Guest: LocalStorage   
            - User: Database
        = Use Features (productIds) to show Add/Remove button

# HOW TO MONETIZE?
    - Donation (please help me)
    - Membership 
    - Sponsor



# COMMMANDS
To re-deploy to github (static website), run the following two
    npm run build
    npm run deploy


# Resources
    ## Sequlize stuff
    https://github.com/001-mak/Sequelize-Postgres-Database/blob/main/controllers/departmentController.js

    https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c
    
====================================================================
-- Moing table from one database to another  
pg_dump --dbname=postgres --host=localhost --table=product --username=postgres --encoding=utf8 --no-owner  --password > server1_db.sql
psql --host=heffalump.db.elephantsql.com --username=ajftcpaw --dbname=ajftcpaw --password -f "server1_db.sql"
====================================================================

