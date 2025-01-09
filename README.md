# BRACU CHATAPP

## Overview
BRACU CHATAPP is a real-time messaging application designed specifically for BRAC University community members. It enables users to engage in one-on-one chats, manage their profiles, share media, switch between light and dark themes, and enjoy integrated games like DX Ball, Racing, and Chess.

## Technology Stack
The BRACU CHATAPP is built using the MERN stack, which includes:
- **MongoDB:** A NoSQL database used to store user data and chat messages.
- **Express.js:** A web application framework for Node.js, used to build the server-side logic.
- **React:** A JavaScript library for building user interfaces, used for crafting the client-side experience.
- **Node.js:** A JavaScript runtime environment that executes JavaScript code server-side.

This stack provides a full JavaScript environment, enabling efficient development of fast and scalable web applications.

## Features

### Real-Time Messaging
- **One-on-One Chat:** Instant communication with real-time text messaging.
- **Message Timestamps:** Displays the time each message was sent.
- **Read Receipts:** Notification when messages are delivered and read.

### Profile Management
- **Basic Profile Setup:** Automatic avatar selection based on the user's registered gender.
- **Status Updates:** Shows whether users are online or offline.
- **Search Functionality:** Enables searching for users by username or email.

### User Connections and Search
- **Copy Message Text:** Allows users to copy text directly from messages.
- **Password Recovery:** Features a "Forgot Password" option for user convenience.
- **Emoji Support:** Enhances messages with a variety of emojis.
- **Media Sharing:** Users can share images with one another.

### Chat Enhancements
- **Notification Sounds:** Alerts for incoming messages.
- **Dark/Light Mode:** Theme toggling to suit user preferences.
- **Scroll Message:** Access to older messages via scrolling.
- **Mute Notifications:** Option to mute chat notifications.

### Integrated Games
- Users can play DX Ball, Racing, and Chess directly within the app.
![image](https://github.com/user-attachments/assets/a3a1de43-0c2f-4570-b8db-a9781577b27f)

## Installation and Running the Project
   ```bash
npm install
npm run build
then go lto http://localhost:5000/ and register and login
   ```
**Another Libaries Install**
   ```bash
npm install react-game-kit
npm install phaser
npm install chess.js react-chessboard
npm install matter-js
npm install stockfish
   ```
### Prerequisites
Make sure you have Node.js and npm installed. Download them from [Node.js official website](https://nodejs.org/).
here we use mongodb atlas web server you can install it own device if you want.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/cadmostafijur/CSE470_Project.git
   cd CSE470_Project
