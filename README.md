# TO DO 
    - Favorite

    - Home 
        When I go back to Home from Favorites, it error. 

    - Post
        For ProductUrl, change the default for select/option

    - Update Home 
        - Show each Category products as a slide in row 

    - Product (single) 
        - If User is not logged in, remove 'Add New Comment' button and add a placeholder/watermark to the Text input that says "PLEASE LOGIN TO LEAVE A COMMENT"
        - Show Name, Brand (Name), Description, Price, ImageUrls, Features, Maintenancnes, ProductUrls, 
        - For showing Images, show one main then others are available to be click to switch below 
        - Add a X button

    - Sign Up
        - 

        
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

