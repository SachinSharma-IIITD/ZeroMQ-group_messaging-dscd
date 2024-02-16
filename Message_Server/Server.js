// importing modules 
const zeroMQ = require('zeromq');
const fs = require("fs");
const os = require("os");

let IPADDRESS = process.argv[2];

console.log(`IPADDRESS OF THE SERVER ${IPADDRESS}`);
// defining network parameter
// port 50000 fixed for message server
const networkParameter = {
    IP : IPADDRESS,
    PORT : 50000,
}
// defining the array for group data
let grpData = []

async function runMessageServer(){
    // setup the server socket of Reply type
    const server = new zeroMQ.Reply;

    // binding the server with IP and port
    await server.bind(`tcp://${networkParameter.IP}:${networkParameter.PORT}`);

    console.log(`----------------SERVER RUNNING ON PORT ${networkParameter.PORT}----------------`);

    for await (const [msg] of server) {
        const request = JSON.parse(msg.toString());

        // this condition serve to clients and return live group lists
        if (request['requestName']=="GROUP LIST REQUEST"){
            console.log(`${request['requestName']} FROM ${request['uuid']}`);
            await server.send(JSON.stringify(grpData));
        }
        // this condition serve to message servers
        else if (request['requestName']=="JOIN REQUEST"){
            console.log(`${request['requestName']} FROM ${request['ip']}:${request['port']}`);

            // register the new group in grpData
            grpData.push(request);

            
            await server.send("SUCCESS");

        }
        
    }
}


// running the message server
runMessageServer();