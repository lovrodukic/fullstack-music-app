# Music Sharing App

This project is a **full-stack, single-page web application** for music sharing,
designed to let users create and manage playlists, as well as explore other
users' playlists. Built with the **Model-View-Update (MVU)** architecture and
the Lit framework, the app offers a highly responsive, dynamic interface
without requiring full page reloads. A MongoDB database backs the application,
storing user profiles, authentication data, music tracks, and playlists.

## Project Overview

- **Frontend**: Developed with the Lit framework and organized using the MVU
  (Model-View-Update) architecture, enabling efficient in-place updates and a
  seamless user experience. Modify DOM tree to implement components.
- **Backend**: Built with Express.js, the backend handles user authentication,
  playlist management, and communication with the MongoDB database. RESTful APIs
  facilitate all interactions between the frontend and backend.
- **Database**: MongoDB stores user profiles, playlists, and music track info
- **API Design**: The backend exposes a RESTful API for CRUD operations on user
  profiles, music tracks, and playlists

## Project Structure

The application is organized into three primary packages under `packages/`:

- `proto/`: HTML and styling prototype, including index, login, and registration
  pages.
- `app/`: App components, styling, views.
- `server/`: Data models for users, playlists, credentials. Routes and services.

## Key Features

- **User Authentication**: Secure user profiles with the ability to sign up,
  log in, and manage playlists.
- **Playlist Management**: Users can create, edit, and delete playlists. Users
  can explore other users' playlists and explore/add songs to the database.
- **RESTful API**: The application’s RESTful API supports flexible data
  management and enables smooth communication between frontend and backend
  components.

## Technologies

- **Frontend**: Lit framework, MVU architecture
- **Backend**: Node.js, Express.js, MongoDB
- **API**: RESTful endpoints for CRUD operations
- **Languages**: HTML, CSS, TypeScript, JavaScript
