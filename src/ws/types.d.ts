export interface ServerToClient {

}

export interface ClientToServer {
    activeDriver:(data)=>void
}

export interface Point{
    langitude:string,
    longitude:string,
    hex:string
}