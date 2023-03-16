# notepoint.
a cs35l project

NotePoint is a web application that can be used to continuously track Spotify statistics of registered users, including their top songs, favorite artists, or genres. Although Spotify itself releases user statistics annually in a so-called “Spotify Wrapped”, our app is fundamentally different as it makes listening statistics more readily available and accessible at any time. Furthermore, we allow users who have not set up an account with NotePoint to browse any songs, albums, or artists available on Spotify and display basic listening statistics just by connecting their Spotify account.

# How our app works
Our app was strictly structured on React, so all the tabs/pages seen on the screen can be attributed to certain components created by us that would interact with different parts of the UI, as well as our __Mongo Database__, which we used to store all of our user data. The pages that don't necessarily need user auth, namely the Discover page, could just ping the Spotify API endpoints to acquire a temporary token to search for songs, artists, albums, etc.

However, for the ones that do require auth, after you register, you can click a "Link Spotify" button, which links your Spotify account and permitting Spotify to use your data based on some **access scopes** like *top_read*, for example that allows Spotify to return to you your most listened to songs.

Diverging a little bit, our Mongo Database is what stores all of our user data. So it essentially keeps track of the amount of users, their passwords (encrypted), as well has some of their top songs, genres, etc. In the future, we do hope be able to utilize this data to create a Recommender System to recommend certain songs to users based on their recent listens.

# To use our app, either:
### 1. Use this link, which brings you to our Notepoint webpage deployed on Vercel
Here you can browse Spotify, create a Notepoint account, and take a peek at your Spotify statistics!
   
### 2. Clone repo and run from there. To do so complete the following steps
   1) Clone repo into empty directory, then extract.
   2) Do an ```npm install``` to install all packages.
   3) With two separate command windows, use one to enter the backend directory and with the other, enter into the frontend directory.
   
  ```
  cd backend  # with window 1
  
  cd frontend # with window 2
  ```
  
  4) When you are in the backend directory, run 
        ```npm start``` 
     to start our backend server, run on __Express__ with __Node__.
  5) On the other window in the front end directory, run
        ```npm run dev```
     to start our webpage, using __React__ + __Vite__.
     
# Using our webpage (Registration, Discovery, Profile, etc)
There are a couple things to note (haha) with our webpage:
  1. To use the Discovery tab on Notepoint, there was no need to login for the user. Essentially it is a way for the user to browse the Spotify, while being in the comfort and convenience of our app.
  2. For the profile as well as statistics aspect of our webpage, they require you to register/sign-in, for which there are tabs and links planted on certain webpages, including the home, for the user to click on. 
