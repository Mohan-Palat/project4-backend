# Introduction
The inspiration for this project came from decorating the house for the holidays over the Thanksgiving extended weekend.  While listening to a local radio station for over 2 hours, it seemed like some songs were played multiple times.  I decided it was time to look into the playlist and do some analysis!

# Foundation

For the capstone project of the SEI experience provided by General Assembly, the goal is to build a fully functioning web application which consists of the following two apps:

1. A front-end React application that updates the UI and communicates with a backend API.
2. Backend API - while there are several options, the choice was Express with Mongo + Mongoose.

# Application Locations
The front end is located <a href="https://project4-cram.herokuapp.com/">here.</a>  Its GitHub is <a href="https://github.com/jmieszko/project4-frontend">here.</a>
The backend is located <a href="https://johnm-project4-cram.herokuapp.com/">here.</a>  

# API Usage
All data are populated using an external API: <a href="https://nowplaying.bbgi.com/WMGQFM/list?limit=1000"></a>
The 1000 limit is the maximum number of entries the API will return; if the number is higher, or not specified at all, then the API returns a blank array and an error message.  
* The backend compares the results to the API and a MongoDB collection based on the "timestamp" field of the object.
* If there is a match in the MongoDB collection, the backend will not add it so as to avoid duplicates.
* If there is a match, the backend will create a document and populate with the data from the external API.  In addition, other date-related fields are added for functionality.
* The backend also supplies collections to enable sorting (by title or artist) as well as a snapshot of the playlist for not just the entire collection, but also the current date starting at 12:00a.


# User Stories

- [x] As a user, I want to be able to search by either artist or title so that I know how many instances they appeared. 

- [x] As a user, I want to see a list of songs played today so that I know what was recently played.

- [x] As a user, I want to see all of the songs played and when so that I can understand the playlist.

- [x] As a user, I want to see a list of unique songs played (unique is by both artist and title) so that I can determine how often certain songs are played.

- [x] As a user, I want to be able to sort the list by time played to better understand the playlist.

- [x] As a user, I want to be able to sort the list by title to better understand the playlist.

- [x] As a user, I want to be able to sort the list by artist to better understand the playlist.

- [x] As a user, I do not want to see duplicate entries in the playlist so that I can efficiently browse the playlist.

- [x] As a user, I want to see an average number of songs played per hour to better understand the playlist.

## Future Enhancements

- Update timestamps based on US Eastern time, as that is where the radio station is located.  Presently, the timestamps are UTC.

- Implement more analytics around individual songs, artists, averages, etc.

- Improve search capabilities to produce more results especially around the analytics mentioned above.

- Fix the sorting options for the Title, Artist, and Time Played.


# Wireframes

<img src="/wireframe.png" />
Wireframe 

# Acknowledgements
<p>The following resources were used in the implementation of this site:</p>
 <a href="https://codepen.io/tobyj/pen/QjvEex">Christmas Lights Header</a>

<a href="https://kb.objectrocket.com/mongo-db/mongodb-group-by-multiple-fields-using-aggregation-function-464">MongoDB Group By Multiple Fields Using Aggregation</a>

<a href="https://stackoverflow.com/questions/29108779/how-to-get-selected-value-of-a-dropdown-menu-in-reactjs">Drop Down Menu in React</a>
 
 <a href="https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button">Wrapping a React router link in an HTML button</a>

<a href="https://dev.to/itz_giddy/how-to-query-documents-in-mongodb-that-fall-within-a-specified-date-range-using-mongoose-and-node-524a">Query documents in Mongoose with specified date range</a>

<a href="https://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value">Mongoose Find by Like</a>

<a href="https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find/26814550">Mongoose Search Part of String</a>

<a href="https://stackoverflow.com/questions/25231022/mongoose-how-to-group-by-and-populate">Mongoose Group By and Populate</a>

<a href="https://medium.com/@jeanjacquesbagui/in-mongoose-sort-by-date-node-js-4dfcba254110">Mongoose Sorting</a>

<a href="https://www.w3schools.com/howto/howto_css_placeholder.asp">Change Placeholder CSS</a>

<a href="https://www.w3schools.com/css/css3_buttons.asp">Buttons CSS</a>

<a href="https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript">Convert string to date in Javascript</a>
