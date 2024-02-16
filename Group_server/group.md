# group.js

This is the main group file for the Message Server project.

## Running the Group Server

1. Install node : `sudo apt install nodejs`
2. Install npm  : `sudo apt install npm`
3. Install dependencies : `npm install`
4. Run the group server: `node group.js <SERVER_IP_ADDRESS> <GROUP_IP_ADDRESS>`

## Overview

The group server uses ZeroMQ for messaging and is designed to handle four types of requests: "JOIN REQUEST", "MESSAGE SEND", "MESSAGE REQUEST", and "LEAVE REQUEST".

- "JOIN REQUEST": This request is sent by clients to join the group. The server adds the new user to the group.
- "MESSAGE SEND": This request is sent by clients to send a message to the group. The server adds the message to the group chat.
- "MESSAGE REQUEST": This request is sent by clients to get the group chat messages. The server responds with the chat messages.
- "LEAVE REQUEST": This request is sent by clients to leave the group. The server removes the user from the group.

## Dependencies

- ZeroMQ: This is used for messaging between the server and clients.
- worker_threads: This is used for performing CPU-intensive JavaScript operations.
- console: This is used for logging.



Replace `<SERVER_IP_ADDRESS>` and `<GROUP_IP_ADDRESS>` with the IP addresses where you want to run the server and the group respectively.

## Code Structure

- The server's IP address and port number, and the group's IP address and port number are defined at the top of the file.
- The `grpChatMemberInfo` object stores the group chat and user information.
- The `runGrpServer` function sets up the group server and handles incoming requests.