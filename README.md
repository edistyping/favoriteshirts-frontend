# TO DO
    To Do 
        - Login component
            - Add change my password 

        - Formatting
            1. Home
            2. Post
            3. Favorite
            4. Profile
            5. My Post (IP) 
                - Add a button to switch between Products and Comments 

                - Products
                    - Edit
                        - Edit all info 
                    - Delete 
                - Comments
                    - Delete only 
                
    BUG
        - (Done) Read product data as a local state variable, not redux variable
            - Move 'handleFavoriteClick' outside Product.js 
            - Update Favorite component so Add/Remove favorite  
            - 'Add/Remove Favorite' affect Favorite redux variable 

        - (Done) Fix Modal in White
            - Sctructure thing more neatly
            - Set the default for Option fields. It's coming in Empty 
            - Features, Maintenances. don't show if empty. format if so
        - (Done) Add comment sections 
            - (Backend) Update API so it returns Username 

        - (Done) Sign Out does nothing. 
            - I think Window.reload being called before dispatch() is finished is the reason. 
        - (Done) Upvote/DownVote doesn't change once a User clicks it  
        - (Done) Products will get added/duplicate randomly
            = UseEffect() 
        - (Done) After adding a comment, Username doesn't show up instantly 
        - (Done) When a Page is selected, fix that message thing
            - Need a Loading variable
                loading, products (null, 0, 0+)
        - (Done) Allow user to pick a favorite color when creating a username
            - For Comment/Post, show their color 

    (IP) All pages
        - Filter
            - Maybe not for Home
        - Product 
            - Update formatting
        - Pages
            - Update formatting
        - Profile
            - Allow users to change Name, Email
            - Delete an Account
            - See and Delete comments
                - Don't worry about editing or directing to that Product 
        - (DONE) Navigation
            - Update formatting
        - (Done) Score/Review system 
            - How should the Client be updated when they rates a vote? 
        - (Done) Add to Product
            - For Reading initial points and user-select
            - For upvoting and downvoting calls 
        - (Done) Need a new table "Score" to keep track of which products a User rated 

    (IP) Home page
        - Separate by Category
        - Show only Top 3 or 5 
    (Future) Filter Bar 
        - Brand, Size, Gender
    (Future) Sort
        - Upvotes, Downvotes 

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

