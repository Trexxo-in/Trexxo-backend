import { latLngToCell, gridDisk, H3IndexInput, H3Index, cellToBoundary, cellToLatLng } from "h3-js";
import { DriversActivity } from "./types";
export class MapManager {
    //generate hex with clear output
    private resolution: number = 9;
    protected lat: number;
    protected lng: number;
    private k = 2;// radius of hex means distances bet center to k step 
    public hexCode: H3Index | undefined = undefined;
    constructor(lat: number, lng: number) {
        this.lat = Number(lat)
        this.lng = Number(lng)
    }
    // Generate hex from lat/lng
    hex(): H3Index {
        this.hexCode = latLngToCell(Number(this.lat), Number(this.lng), this.resolution)// creating a hex 
        return this.hexCode;
    }
    // Find drivers within k-ring around a given hex
    findDriversByHex(hexID: H3IndexInput, DriversActivity: DriversActivity[]): DriversActivity[] {
        const nearbyHexes = new Set(gridDisk(hexID, this.k));
        return DriversActivity.filter(driver => nearbyHexes.has(driver.location.hex));
    }
    isDriverInHex(driver: DriversActivity, centerHex: H3IndexInput): boolean {
        const nearbyHexes = new Set(gridDisk(centerHex, this.k));
        return nearbyHexes.has(driver.location.hex);
    }
    // Dynamically update radius
    setRadius(k: number): void {
        if (k < 0) throw new Error("Radius must be non-negative");
        this.k = k;
    }
    // Get geo-boundary (polygon) of a hex
    getHexBoundary(hexID: H3IndexInput): Array<[number, number]> {
        return cellToBoundary(hexID, true); // Returns array of [lat, lng]
    }
    // Get all hexes in radius k from current location
    getSurroundingHexes(): H3Index[] {
        const centerHex = this.hex();
        return gridDisk(centerHex, this.k);
    }
    // Get lat/lng center of a hex
    getHexCenter(hexID: H3IndexInput): { lat: number; lng: number } {
        const [lat, lng] = cellToLatLng(hexID);
        return { lat, lng };
    }




}