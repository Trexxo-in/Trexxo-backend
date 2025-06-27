import {db} from '../config'
const activeDriver = db.ref('active_driver')
const driverDb=db.ref('drivers')
const riderDb=db.ref('riders')
export { activeDriver,driverDb,riderDb };
