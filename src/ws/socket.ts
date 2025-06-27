import { DefaultEventsMap, Server, Socket } from "socket.io";
import { ClientToServer, ServerToClient } from "./types";
import { addActiveDriver } from "./event/active_driver";
import h3 from 'h3-js';
export default function Socket_Init(io: Server<ClientToServer, ServerToClient, DefaultEventsMap, any>) {
    io.on('connection', (socket: Socket<ClientToServer, ServerToClient>) => {

     console.log(`connected socket id: ${socket.id}`)
     
     socket.on('activeDriver', async (data)=>{
      const {id,name,longitude,langitude}=data 
      let hex=h3.latLngToCell(Number(langitude),Number(longitude),9)
      let res=  await addActiveDriver(id,name,{langitude:langitude.toString(),longitude:longitude.toString(),hex},Date.now())
      console.log(res)
     })

  
     /***
      * Disconnected this socket
      * 
      */
     
        socket.on('disconnect',()=>{

     })
    })
    
}