## What is this?

Some exercises from [Pirple](https://pirple.com/). Each homework assignment is in its branch (eg.: `homework-1`).

It's been hard to not install `nodemon`, but.. :D

## What is the course about

The objective is to write Node.js apps without _any_ npm dependencies (and maybe to see how hard it can be and how good it is to use good 3rd-party open source packages).

**Prerequisites**

* Listen on a PORT and accept incoming HTTP POST, GET, PUT, DELETE, HEAD
* Allow a client to connect and create, edit, delete user
* API allows a user to sign in and get a token to make auth requests
* API allows a user to sign out and invalidate the token
* The user can create a new "check" with their token (up to 5)
* The user can define what "up" and "down" is
* A signed-in user can edit/delete their "check"
* Do the "checking" in background once a minute and send alerts when the "check" changes it state
* Connect to Twilio to send SMS

## Homework #1

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice.

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.