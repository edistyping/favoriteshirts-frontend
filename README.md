# TO DO 
    (IP) Home page
        - Separate by Category
        - Show only Top 3 or 5 
            - Require scoring

    (IP) All
        - Filter
            - Maybe not for Home
        - Score/Review system 
            - For each Product
            - Need a new table "Score" to keep track of which products a User rated 
                - Can be called by User only 
                - Score table: Id, UserId, ProductId, Scoring 
                - Same as Favorite
        - Pages
            - Update formatting
        - Product 
            - Update formatting
        - Navigation
            - Update formatting
        - Profile
            - Allow users to change Name, Email
            - Delete an Account
            - See and Delete comments
                - Don't worry about editing or directing to that Product 

    (DONE) NavBar
        - Links
        - Login
        - SignUp

    (DONE) Other Pages (except Home)
        Fetch Products with Pagination: Fetch products from the backend in a paginated manner.
        Display Products in a Grid: Display the products in a grid/table layout.
        Implement Infinite Scrolling: Load more products as the user scrolls down.

    (DONE*) Favorite 
        - Database/LocalStorage => Redux => Component 
        (???) Issue: Favorite needs to be called AFTER User is checked
        (DONE) update GetFavorites to retrieve a list of ProductIds
        (DONE) create a new API GetFavoriteProducts that places the existing one 

    (DONE) Login
        - When App is initially on, verify Tokens 
            If Yes, sign in 
            If not, do nothing (Read Favorites from localStorage)

    (Done) Sign Out
        - Fixed
        - Reload upon signout 

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

