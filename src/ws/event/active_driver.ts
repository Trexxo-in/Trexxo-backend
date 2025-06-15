import { activeDriver } from "../db/model"
import { Point } from "../types"

const addActiveDriver = async (id: string, name: string, location: Point, time: number=Date.now(), isOnline: boolean = true) => {
    try {
         await activeDriver.push({
            lat: location.langitude,
            hex: location.hex,
            lon: location.longitude,
            name,
            id,
            time,
            isOnline
        })
        return `This Driver id - ${id} is actived`
    } catch (error) {
        console.log(error)
        return `Error happened`
    }

}



export { addActiveDriver }