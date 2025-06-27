import { H3IndexInput } from "h3-js"

export interface ServerToClient {

}

export interface ClientToServer {
    activeDriver:(data)=>void
}
export interface DriversActivity{
    name:String,
    driverId:String,
    location:Point,
    time:Date,
    city:String,

}
export interface Driver{
    name:String,
    address:String,
    home_location:Point,
    created_at:Date,
    started_at:Date,
    updated_at:Date,
    rating:Number,
    dob:String,
    lisence_url?:String,
    insuance_url?:String
}

export interface Point{
    langitude:number ,
    longitude:number ,
    hex:H3Index
}