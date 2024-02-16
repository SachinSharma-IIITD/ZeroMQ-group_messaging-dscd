const { parentPort } = require('worker_threads');

function compareDates(date1, date2) {
    date2 = new Date(date2);
    date1 = new Date(date1);

    if (date1.getFullYear() < date2.getFullYear()) {
        return true
    }
    if (date1.getMonth() < date2.getMonth()) {
        return true;
    }
    if (date1.getDate() < date2.getDate()) {
        return true;
    }
    if (date1.getHours() < date2.getHours()) {
        return true;
    }
    if (date1.getMinutes() < date2.getMinutes()) {
        return true;
    }
    if (date1.getSeconds() < date2.getSeconds()) {
        return true;
    }
    return false; 
}


parentPort.on('message',async (params)=>{
    chat = params[0];
    date = params[1];

    chat.sort((a,b)=> new Date(a.date) - new Date(b.date));
    // console.log((chat[0])['date']);
    // console.log(date);
    let l = 0;
    let h = chat.length-1;

    let reqChat = [];
    let reqIndx = -1;

    while(l<=h){
        let mid = Math.floor((l+h)/2);
        // console.log(mid);
        if (compareDates((chat[mid])['date'],date)){
            l = mid + 1;
        }
        else {
            h = mid - 1 ;
        }
    }
    reqIndx = l;
    for (let i = reqIndx;i<chat.length;i++){
        reqChat.push(chat[i]);
    }
    parentPort.postMessage(reqChat);

    process.exit();

});