<!-- Please update value in the {}  -->

<h1 align="center">{Memogen}</h1>

<div align="center">
   This is the frontend of my first CRUD notes and todo list manager application.
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png)

Introduce your projects by taking a screenshot or a gif. Try to tell visitors a story about your project by answering:

- Where can I see your demo? 
   -I will be deploying this entire app in the future. I have a limited time to deploy it on heroku which I have not used before since the deadline of this school project is later this day @ 12:00 am 2021-11-28. To use it for now, follow the instructions in the How-to-use section.
- What was your experience?
   -I had a lot of fun building the UI of this project. I learned how to utilize the useCallback hook in react to memoize function calls in different components.
- Are there improvements you want to make in the future?
   -I am planning to add more sleek animations in the routing of the pages in the future and animate the exit of the notes and tasks soon.

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Features

<h4>There are 2 types of users in this application</h4>
<ol>
   <li>Visitor user (don't have an account)</li>
   <li>Registered user (has an account)</li>
</ol>

<h4>Visitor's priviledges and limitations</h4>
<ul>
  <li>Can change the content, title and themes of the existing notes</li>
  <li>Can cross the existing tasks</li>
  <li>Cannot Add new notes</li>
  <li>Cannot add new tasks</li>
</ul>

<h4>Registered user's priviledges and limitations</h4>
<ul>
  <li>Can change the content, title and themes of the existing notes</li>
  <li>Can cross the existing tasks</li>
  <li>Can add infinite amount of notes</li>
  <li>Can add infinite amount of tasks</li>
</ul>

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/bibmode/memogen2.0

# Install dependencies
$ npm install

# Run the app
$ npm start
```

This is just the front end source code of memogen. To run this app in your computer you need to clone the backend repo of this project [here](https://github.com/bibmode/memogen-backend). Follow the instructions in the read me of the memogen backend repository.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Marked - a markdown parser](https://github.com/chjj/marked)

