# Group Messaging Application using ZeroMQ

## Dependencies
- **ZeroMQ**: This is used for messaging between the server and clients.
- **fs**: This is used for file system operations.
- **os**: This is used for operating system related operations.
- **worker_threads**: This is used for performing CPU-intensive JavaScript operations.
- **console**: This is used for logging.
- **readline-sync**: This is used for reading user input from the console.
- **uuid**: This is used for generating unique identifiers for the users.


## Server

### How to run

1. Install node : `sudo apt install nodejs`
2. Install npm  : `sudo apt install npm`
3. Install dependencies : `npm install`
4. Run the server: `node Server.js <IP_ADDRESS>` (use ifconfig to get the IP ADDRESS of the server)   

> Replace `<IP_ADDRESS>` with the IP address of the server machine.

*Refer to [Group_server/group.md](./Group_server/group.md) for details*

## Group Server

### How to run

1. Install node : `sudo apt install nodejs`
2. Install npm  : `sudo apt install npm`
3. Install dependencies : `npm install`
4. Run the group server: `node group.js <SERVER_IP_ADDRESS> <GROUP_IP_ADDRESS>`

> Replace `<SERVER_IP_ADDRESS>` and `<GROUP_IP_ADDRESS>` with the IP addresses where you want to run the server and the group respectively.

*Refer to [Message_Server/Server.md](./Message_Server/Server.md) for details*

## User

### How to run

1. Install node : `sudo apt install nodejs`
2. Install npm  : `sudo apt install npm`
3. Install dependencies : `npm install`
4. Run the user interface: `node user_1.js <SERVER_IP_ADDRESS>`

> Replace `<SERVER_IP_ADDRESS>` with the IP address of the server.

*Refer to [Users/user.md](./Users/user.md) for details*
