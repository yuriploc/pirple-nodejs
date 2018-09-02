## Prerequisites

* Listen on a PORT and accept incoming HTTP POST, GET, PUT, DELETE, HEAD
* Allow a client to connect and create, edit, delete user
* API allows a user to sign in and get a token to make auth requests
* API allows a user to sign out and invalidate the token
* The user can create a new "check" with their token (up to 5)
* The user can define what "up" and "down" is
* A signed-in user can edit/delete their "check"
* Do the "checking" in background once a minute and send alerts when the "check" changes it state
* Connect to Twilio to send SMS