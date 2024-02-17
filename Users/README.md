# user_1.js

This is the main user interface file for the Message Server project.

## Overview

The user interface uses ZeroMQ for messaging and provides a menu for users to interact with the message groups. It handles four types of requests: "GROUP LIST REQUEST", "JOIN REQUEST", "MESSAGE SEND", "MESSAGE REQUEST", and "LEAVE REQUEST".

- "GROUP LIST REQUEST": This request is sent to the server to get the list of live message groups.
- "JOIN REQUEST": This request is sent to a group to join it.
- "MESSAGE SEND": This request is sent to a group to send a message.
- "MESSAGE REQUEST": This request is sent to a group to get the group chat messages.
- "LEAVE REQUEST": This request is sent to a group to leave it.

## Dependencies

- ZeroMQ: This is used for messaging between the user interface and the server/groups.
- os: This is used for operating system related operations.
- readline-sync: This is used for reading user input from the console.
- uuid: This is used for generating unique identifiers for the users.

## Running the User Interface
## Running the Group Server

1. Install node : `sudo apt install nodejs`
2. Install npm  : `sudo apt install npm`
3. Install dependencies : `npm install`
4. Run the user interface: `node user_1.js <SERVER_IP_ADDRESS>`

Replace `<SERVER_IP_ADDRESS>` with the IP address of the server.

## Code Structure

- The server's IP address is passed as a command line argument. The server port and the user port are fixed at 50000 and 48000 respectively.
- A unique identifier for the user is generated using the uuid library.
- The `run` function provides the main user interface loop. It displays a menu for the user to interact with the message groups and handles the user's input.