# notepoint.
cs35l project

NotePoint is a web application that can be used to continuously track Spotify statistics of registered users, including their top songs, favorite artists, or genres. Although Spotify itself releases user statistics annually in a so-called “Spotify Wrapped”, our app is fundamentally different as it makes listening statistics more readily available and accessible at any time. Furthermore, we allow users who have not set up an account with NotePoint to browse any songs, albums, or artists available on Spotify.

# Using our web app
There are two different ways of enjoying our app:
### Method 1. Run the web version deployed using Vercel
This is the preferred way, as you do not have to set up your own project.
Access our deployed version at the following [link](https://notepoint.vercel.app/).  
Here you can browse Spotify, create a Notepoint account, and take a peek at your Spotify statistics!

Note:
Unfortunately, at this time, Spotify does not permit us to make the personal listening statistics feature available to all users. Since our app is still officially in "development mode", we are only allowed to enable this feature for up to 25 selected users who must be manually added to our test user list. Thus, when you access our deployment without being previously added to the test list, you will be able to create an account with us and use the Discover page, but will likely have trouble retrieving your statistics. If you would like to be added to the test list, please email us at __datowq@g.ucla.edu__, but bear in mind that there might not be any more spots left. We are working on obtaining a quota extension from Spotify that will allow us to make the web app available to all interested users.
   
### Method 2. Run the app locally
1) Clone the 'notepoint' repository into a directory of your choice using ```git clone https://github.com/datowq/notepoint.git``` and enter the ```notepoint``` directory.
2) You will notice that there are separate folders for frontend and backend. Open two separate terminal windows and use one for frontend, one for backend.
3) In the backend terminal window, execute the following shell commands:

```
cd backend      // enter the backend folder
npm install     // install all dependencies for backend
npm start       // start the backend server
```

4) In the frontend terminal window, execute the following shell commands:

```
cd frontend     // enter the frontend folder
npm install     // install all dependencies for frontend
npm run dev     // run the frontend using React + Vite
```

Note: Even after executing the following commands in separate windows, your local app will not function properly without several environmental variables stored securely in a ```.env``` file. Since the ```.env``` file contains secret keys specific to our app, we unfortunately cannot share it with you. Thus, in order to have a fully functional app, you will have to set up your own database on [mongoDB](https://www.mongodb.com), an email for sending automatic messages, and register an app at the [Spotify developer dashboard](https://developer.spotify.com/dashboard). Below, we provide a template for our ```.env``` files. In order for the app to work, use the same names for environmental variables, but replace the comments by your own secret keys.

Put this ```.env``` file in your ```notepoint/backend``` folder:

```
MONGODB_URI= // your mongoDB connection string (accessible on the mongoDB dashboard)

MAIL_USER=notepoint.verify@gmail.com // this is an example email address we use to send automatic messages
MAIL_PWD= // your email password

CLIENT_ID= // client ID of your registered Spotify app
CLIENT_SECRET= // client secret key to your Spotify app

FRONT=http://localhost:5173   // this is an example URL you will be running your frontend on
URL=http://localhost:3001     // this is an example URL you will be running your backend on
```
Put this ```.env``` file in your ```notepoint/frontend``` folder:

```
VITE_URL=http://localhost:3001   // this is an example URL you will be running your backend on
```
As an indicator of successful configuration of your backend, once you run ```npm start``` in backend, you should see the messages:
```
Server listening on port 3001    // assuming your backend runs on http://localhost:3001
Connected to DB
```
     
# Some clarification on the website's features
There are a couple things to note (haha) with our webpage:
  1. To use the Discovery page on NotePoint, there is no need for the user to login. Essentially, it is a way for the user to browse Spotify, while being in the comfort and convenience of our app.
  2. The Profile page (containing user statistics) is only accessible after creating an account / signing in. This allows us to remember your Spotify credentials for next time and store snapshots of your listening statistics. Snapshots are a useful way to track your listening history and development of your music taste.

# More info on the inner workings of NotePoint
We developed our app using React, so all the tabs/pages seen on the screen can be attributed to certain components that would interact with different parts of the UI, as well as our database hosted on __MongoDB__, used to store all user data we collect. The Discover page does not necessarily need user authentication as it only searches through data publicly available on Spotify to all users. Thus, it can simply ping the Spotify API endpoints to acquire a temporary token to search for songs, artists, albums, etc.

However, for the ones that do require authentication, after you register, you can click the "Link Spotify" button, which links your Spotify account to NotePoint and permits us to retrieve your personal data from the Spotify API based on several **access scopes**. This is how we can show you your favorite songs, albums, etc.

Diverging a little bit, our database keeps track of the number of users, their emails, passwords (encrypted), and (if linked) their Spotify access tokens.  This eases user experience on our platform: registered users do not have to connect their Spotify every time they log in. We also use the database to store snapshots of user's stats. In the future, we do hope be able to utilize this data to create a recommender system to recommend certain songs to users based on their recent listens.
