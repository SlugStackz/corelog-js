# CoreLog — Full Stack Logging Application

CoreLog is a lightweight full-stack logging application built to practice backend API design, client/server integration, and debugging asynchronous workflows. It allows users to create and delete log entries through a browser interface backed by a REST API.

This project was developed as part of my transition into software development and demonstrates hands-on experience building and integrating frontend and backend components.

---

## Features

* Create log entries through a web interface
* Delete existing entries
* RESTful API backend
* JSON-based persistence layer
* Modular server architecture
* Client/server communication using Fetch API

---

## Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express

**Other Tools**

* Git
* JSON data storage

---

## Project Structure

server.js — Express server entry point
logs.js — Routing and logic layer
storage.js — Persistence layer
logs.sample.json — Example data format
public/ — Frontend interface

---

## Running Locally

Clone the repo and install dependencies:

```
npm install
```

Start the server:

```
node server.js
```

Then open your browser:

```
http://localhost:3000
```

---

## What I Learned

* REST API construction and routing
* CRUD data handling
* Debugging client/server contract mismatches
* Async request flow reasoning
* Modular code organization
* Version control workflow using Git

---

## Future Improvements

* Edit/update log entries
* Search/filter functionality
* UI enhancements
* Persistent database integration
