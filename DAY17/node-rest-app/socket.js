//socket.io 패키지 참조 
//npm i socket.io 
const SocketIO = require("socket.io");

const moment = require('moment');


//socket.js 모듈 기능 정의 
module.exports =(server)=>{

    //socket.js socket.io CORS 통신설정 예시 – socket cors 이슈 발생 시 사용
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        },
    });



   //클라이언트(웹브라우저)와 서버의 소켓서버와 연결이 완료된 상태에서 모든 메시징은 발생합니다.
   io.on("connection",(socket)=>{


        //클라이언트에서(웹브라우저)에서 broadcast란 서버측 이벤트 수신기를 호출하고
        //클라이언트에서 전달된 메시지를 수신한후 다시 현재 소켓서버에 연결된 모든 클라이언트(웹브라우저)사용자들에게 
        //메시지지를 발송한다.
        socket.on("broadcast",function(msg){
            //io.emit() 메소드는 서버소켓과 연결된 모든 사용자에게 정의된 클라이언트 메시지 수신기로 메시지를 발송합니다. 
            io.emit("receiveAll",msg);
        });


        //리액트 앱에서 reactSend 서버 이벤트 수신기로 메시지를 보내오면 해당 메시지를 수신하는 기능 구현
        //수신한 msg 데이터는 다시 서버소켓과 연결된 모든 사용자들의 reactReceive 클라이언트 이벤트 수신기로 전송됩니다.
        socket.on("reactSend",async(msg)=>{

            msg.msg_date = moment(Date.now()).format("HH:mm");

            io.emit("reactReceive",msg);
        });

        //....


   });
}