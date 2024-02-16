
# Server.js

This is the main server file for the Message Server project.

## Running the Server
1. Install node : `sudo apt install nodejs`
2. Install npm  : `sudo apt install npm`
3. Install dependencies : `npm install`
4. Run the server: `node Server.js <IP_ADDRESS>` (use ifconfig to get the IP ADDRESS of the server)

## Overview

The server uses ZeroMQ for messaging and is designed to handle two types of requests: "GROUP LIST REQUEST" and "JOIN REQUEST".

- "GROUP LIST REQUEST": This request is sent by clients to get the list of live groups. The server responds with the current list of groups.
- "JOIN REQUEST": This request is sent by message servers to join the network. The server registers the new group in its list and responds with "SUCCESS".

## Dependencies

- ZeroMQ: This is used for messaging between the server and clients.
- fs: This is used for file system operations.
- os: This is used for operating system related operations.



Replace `<IP_ADDRESS>` with the IP address of the server machine.

## Code Structure

- The server's IP address and port number are defined in the `networkParameter` object.
- The `grpData` array stores the list of groups.
- The `runMessageServer` function sets up the server and handles incoming requests.