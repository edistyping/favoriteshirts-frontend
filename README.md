# TO DO 
    - patchProduct in api.js is not working
        - productAction.js -> updateProduct calls it thu 

        
    1. Add "Edit My Post" page
        ShowMyPosts 
            - Get all Posts in MyPosts page 
                - Retrieve info from /api/User/posts
            Select a post
                - Edit a Post page 
                    Change 
                    - /api/patch/product/{id}

    2. Add 'Edit My Profile" page
            - /api/patch/user/{id}

    3. Make 'Post a Deal' button public. If Guest clicks it, then 

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

