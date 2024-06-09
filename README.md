# TO DO 
    - Fix this
        - { user } data being returned from backend is different for Sign In vs Validate
            => This causes error when posting Comment. (I think it works for one right now)
            => Regardless, why is postRequest in api.js failing? token should still be correct 

        - Fix Favorites too 

        - Error when second (id 3) item is clicked
            - Issue: ImageUrls having a valid image i think, not empty array

        Q. Should the app reload after User signs in (not validate but sign in button)? 
            - Just window.reload(). JWT will be used to validate and re-sign in again 

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

