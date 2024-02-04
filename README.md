# HOW TO MONETIZE?
    - Donation (please help me)
    - Membership 
    - Sponsor


frontend
    - limit post
    - limit comment spamming
    - deleting a post if user 


# TO DO 
    1. Post page
        - UI stuff
    2. Favorite/Unfavorite visual event trigger 
        - This will work with 'currentFavorites'
    3. Model/Detail page 
        - UI stuff 
    4. Rating
    - * Create Rating table
    - When a user rates, add to Rating table 
        - If they rated it already, return 500 code
        - Else update Products table 
                - Just show effects that it's been rated like "Thank you!" 

    5. More Data 
        - 

# Who should be allow to post?
    + Main page 
        Shows Popular ones
    + Custom page (User; Posts by Users only)
    + Verified/Partnered page (Sponors; Post or Request)
        = Show each partners by row. Each row is a slider that shows popular products (Max 5; show 3 each) 
    
    + Comments
        - New Table?
            - ID, Product_ID, User_ID, Comment, Upvote
    + Reviews
        - New Table?
            - ID, Product_ID, Brand, Website_ID, Rating   
        + From website Review
        + From product link; amazon, walmart

# Home 
    Favorites: 
        Guest: Get localStorage 
        User: Get it from DB 

# Advertise
    - Only Pro User can submit a request 
        - confirm in both front (Advertise) and back ('/sendemail)
        INPUT 
        1. image files or imgur links
        
        Descriptions (Optional; Examples)

        Features (Optional; Examples)
        
        HOW TO WASH
            default: Mahine wash cold 


# Recommendation
    - Allow users to pick few tags. 
    - Recommend brands, types, and qualities
    - Recommend options for T-shirts and companies 


# Resources
    ## Sequlize stuff
    https://github.com/001-mak/Sequelize-Postgres-Database/blob/main/controllers/departmentController.js

    https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9



