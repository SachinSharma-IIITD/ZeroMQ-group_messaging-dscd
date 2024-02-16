// import libraries
const zmq = require("zeromq");
const os = require("os");
const readlineSync = require("readline-sync");
const {v4: uuidv4} = require("uuid");

// Need to provide the IP ADDRESS at the time of invoking the user.js, for eg. "node user.js 192.168.1.17";
const SERVERIP = process.argv[2];
const SERVERPORT = 50000;
// server port is fixed at 50000

// user port is fixed at 48000
const PORT = 48001;

// generating the uuid for the user
const UUID = uuidv4();

async function run() {
    while(true){

        console.log("------------------------------------------------------------------------------");
        // 1 --> give user list of all live message servers
        console.log(`1. Get Groups`);
        // 2 --> Let user join a message group
        console.log(`2. Join Groups`);
        const input = readlineSync.question('Enter your Input :  ');
        console.log("------------------------------------------------------------------------------");


        if (input == 1){
            // connect to message server and get the required list of live message groups
            const grpREQSocket = new zmq.Request;
            grpREQSocket.connect(`tcp://${SERVERIP}:${SERVERPORT}`);

            const obj = {
                uuid : UUID,
                requestName: "GROUP LIST REQUEST"
            }
            await grpREQSocket.send(JSON.stringify(obj));
            let response = await grpREQSocket.receive();
            response = JSON.parse(response.toString());
            //printing the group information
            console.log("GROUP INFORMATION");
            for (let i = 0;i<response.length;i++){
                console.log(`IP ADDRESS : ${response[i].ip}, NAME : ${response[i].groupName}, PORT : ${response[i].port}`);
            }
            console.log("------------------------------------------------------------------------------");
        }
        else if (input == 2){
            const grpIP = readlineSync.question('Enter Group IPADDRESS to connect : ');
            const grpPort = readlineSync.question('Enter Group port to connect : ');
            const UserName = readlineSync.question("Your Name : ");
            
            const groupSocket = new zmq.Request;
            groupSocket.connect(`tcp://${grpIP}:${grpPort}`);
            await groupSocket.send( JSON.stringify({ requestName :  "JOIN REQUEST" ,uuid:UUID, name : UserName}));
            const status = await groupSocket.receive();
            console.log(status.toString());
            console.log("------------------------------------------------------------------------------");

            let groupConsoleInput = 1;
            while(groupConsoleInput!=-1){
                console.log(`1. To Send Message in the Group : `);
                console.log(`2. To Receive Message from the Group`);
                console.log(`3. Leave the group`);

                groupConsoleInput = readlineSync.question("Give your input : ");
                if (groupConsoleInput == 1){
                    const message = readlineSync.question("Enter the message to send : ");
                    await groupSocket.send(JSON.stringify({requestName :  "MESSAGE SEND" ,uuid:UUID, name : UserName, msg : message}));
                    console.log((await groupSocket.receive()).toString());  
                    console.log("------------------------------------------------------------------------------"); 
                }
                else if (groupConsoleInput == 2)
                {
                    let isAll = readlineSync.question("Do you want all chats (0/1) : ");
                    const qdate = new Date();
                    if (isAll=="0"){
                        const hours = readlineSync.question('Give hours : ');
                        const minute = readlineSync.question('Give minutes : ');
                        const second = readlineSync.question('Give seconds : ');
                        qdate.setHours(hours);
                        qdate.setMinutes(minute);
                        qdate.setSeconds(second);
                    }
                    else{
                        qdate.setHours(0);qdate.setMinutes(0);qdate.setSeconds(0);
                    }
                    
                    await groupSocket.send(JSON.stringify({requestName :  "MESSAGE REQUEST" ,uuid:UUID, date : qdate}));
                    let recMsg = await groupSocket.receive();
                    if (recMsg == "error"){
                        console.log("error");
                        continue;
                    }
                    recMsg = JSON.parse(recMsg.toString());
                    console.log("------------------------------------------------------------------------------");
                    for (let i = 0;i<recMsg.length;i++){
                        let d = recMsg[i];
                        let resDate =new Date(d['date']); 
                        console.log(`${d['sender']} : ${d['msg']} (${resDate.getHours()}:${resDate.getMinutes()}:${resDate.getSeconds()})`);
                    }
                    console.log("------------------------------------------------------------------------------");
                }
                else if (groupConsoleInput == 3){
                    await groupSocket.send(JSON.stringify({requestName: "LEAVE REQUEST", uuid : UUID}));
                    console.log((await groupSocket.receive()).toString());
                    groupConsoleInput = -1;
                    console.log("------------------------------------------------------------------------------");
                }
            }
        }
        
    }
    
}

// run the userinterface
run()