# TO DO 
    1. How should Brand vs Product URL work?
        - User can select Brand or Other 
        - Don't let Users fill in with spams
            - Users can pay me to add their Brand here
            - You get a free pass if your Brand is established enough obviously. 


# HOW TO MONETIZE?
    - Donation (please help me)
    - Membership 
    - Sponsor

# To Fix
    1. Re-write Favorites functionality
        - Move handleFavorite to Product component
    2. NavBar  
        Problem: It keeps blinking even when a user is logged in
    3. Admin page 
    4. Home page update 


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

