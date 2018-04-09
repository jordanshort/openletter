# OpenLetter

This social media app allows a user to write open letters to an individual, group or organization.  It was built using React, Redux, JavaScript, Nodejs/Express, Postgres and Socket.io.  The purpose of this type of platform is to allow the user have a place to better write and share longer posts they wouldn't normally share on another social media site.  The user is able to create a network of other authors they follow.  This allows them to see the letters of the other authors they follow upon logging in.  A user can save letters they are interested in to read later, co-sign any letter they agree with or leave a response to the author's letter.


## Home Page

Upon logging in, a user is taken to their home page.  Here they are able to see the most recent letters written by authors they follow. These letters are the results of a SQL query and then mapped over and displayed using a nice CSS card effect.  On the right, a list of the top ten most popular letters are displayed.  This top ten feature makes use of some of SQL's aggregate functions to search for the posts with the most cosigns in the last 24 hours.  Therefore, its a dynamic list that is constantly updating throughout the day.

![homepage](https://user-images.githubusercontent.com/32680642/38476887-47a66a1a-3b6d-11e8-90e5-e96bfb2c13c9.PNG)


## Search

The search engine is one of the most important features of this application.  Having a robust search engine allows a user to search for other authors and specific letters or topics they are interested in.  The search engine is built using Postgres's Full Text Search, tsvector and tsquery features.  The results are then displayed by author and by letters.

![searchresults](https://user-images.githubusercontent.com/32680642/38476899-51822e16-3b6d-11e8-83bc-c747ae9e3503.PNG)


## Profile Page

The profile page allows a user to manage their own profile and what is displayed to other users.  It also shows a count as well as a link to the authors the user is following, and is followed by.  These relationships are built and tracked using relational tables in a Postgres database.  At the bottom, a list of recommended authors to follow is generated using a formula in SQL that searches for authors the user should follow.

![profilepage](https://user-images.githubusercontent.com/32680642/38476909-580e0aa2-3b6d-11e8-8616-93e69495c979.PNG)

## Letter View

Here you are able to read a letter.  On the left, you are able to follow the author if you don't already follow them, co-sign and respond to the letter.  Conditional rendering is used to display a deactivated cosign button if you have already cosigned that letter before.  That way you can only cosign a letter once.  Below the letter, responses are displayed so that users can have a conversation about the letter.  The comments are created and displayed using Socket.io so they happen in real-time, just like a chat.

![letterview](https://user-images.githubusercontent.com/32680642/38476913-5d32f434-3b6d-11e8-8033-9b4bf47b605e.PNG)

### Compose Letter
Here you can compose your letter.  This component was built using React Quill so that a user can style their letter allowing them to better emphasize their letter and make it more appealing to readers.

![composeletter](https://user-images.githubusercontent.com/32680642/38476918-62ce49ac-3b6d-11e8-995c-7040a0fd1eab.PNG)


## Built With

* React | Redux
* Javascript
* Node.js | Express | Massive
* Postgres
* Socket.io



## Author

* **Jordan Short** - *Initial work* - [JordanShort](https://github.com/jordanshort)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
