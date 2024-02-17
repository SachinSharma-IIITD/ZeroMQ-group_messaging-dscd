// importing modules
const zeroMQ = require('zeromq');
const {Worker} = require("worker_threads");
const { error } = require('console');
const portfinder = require('portfinder');

// need to pass the server IP address and group IP address while invoking group.js "node group.js 192.168.1.17 192.168.1.30"
const SERVERIP = process.argv[2];
const SERVERPORT = 50000;

let PORT = 49000;


const IPADDRESS = process.argv[3];

// define the name of the server
let GROUP_NAME = "Group-1";

// maintaining the group information
let grpChatMemberInfo = {
    user : {},
    chat : []
}

async function runGrpServer()
{
    const groupServer = new zeroMQ.Request;
    groupServer.connect(`tcp://${SERVERIP}:${SERVERPORT}`); 

    await portfinder.getPort((err, port) => {
        PORT = port;
    });
    GROUP_NAME = `Group-${PORT}`;

    // group server send the message server, the request to register itself.
    const msg = {
        ip : IPADDRESS,
        port : PORT,
        requestName : "JOIN REQUEST",
        groupName : GROUP_NAME
    }
    await groupServer.send(JSON.stringify(msg));
    const receivedData = await groupServer.receive();
    console.log(receivedData.toString());
    groupServer.close();

    const grpREQ = new zeroMQ.Reply;
    
    await grpREQ.bind(`tcp://${IPADDRESS}:${PORT}`);

    for await (const [msg] of grpREQ){
        const request = JSON.parse(msg.toString());
        
        
        if (request['requestName']=="JOIN REQUEST"){
            console.log(`${request['requestName']} from ${request['uuid']}`);
            grpChatMemberInfo['user'][request['uuid']] = {
                Name : request['name'],
            };
            
            await grpREQ.send("RECEIVED");
        }
        else if (request['requestName']=="MESSAGE SEND"){
            console.log(`${request['requestName']} from ${request['uuid']}`);
            if ( !(request['uuid'] in grpChatMemberInfo['user'])){
                await grpREQ.send("FAIL");
            }
            else{
                grpChatMemberInfo['chat'].push({date:Date(), msg:request['msg'], sender:request['name']});
                await grpREQ.send("SUCCESS");
            }
        }
        else if (request['requestName']=="MESSAGE REQUEST"){
            console.log(`${request['requestName']} from ${request['uuid']}`);
            const worker = new Worker('./handleUser.js');
            worker.postMessage([grpChatMemberInfo['chat'],request['date']]);
            worker.on('message',async (msg)=>{
                await grpREQ.send(JSON.stringify(msg));
            });
        }
        else if (request['requestName']=="LEAVE REQUEST"){
            console.log(`${request['requestName']} from ${request['uuid']}`);
            if (request['uuid']  in grpChatMemberInfo['user']){
                delete grpChatMemberInfo['user'][request['uuid']];
                await grpREQ.send("SUCCESS");
            }
            else {
                await grpREQ.send("NOT JOINED THE GROUP");
            }
            
        }
        
    }
}




// start the runGrpServer();
runGrpServer();