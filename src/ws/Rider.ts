import { directionsService } from "./config";
import { MapManager } from "./Map";
import { Point } from "./types";

export class Rider extends MapManager {
  constructor(lat: number, lng: number) {
    super(lat, lng);
  }

  // Calculate ETA from driver to rider
  async getEta(driverLocation: Point): Promise<any> {
    const { lat, lng } = this; // rider's location

    try {
      const res = await directionsService.getDirections({
        profile: 'driving',
        waypoints: [
          {
            coordinates: [driverLocation.longitude, driverLocation.langitude], // origin
          },
          {
            coordinates: [lng, lat], // destination (rider)
          },
        ],
        geometries: 'geojson',
      }).send();

      const eta = res.body.routes?.[0]; // duration in seconds
      return eta ?? null;
    } catch (error) {
      console.error("Failed to get ETA:", error);
      return null;
    }
  }

  book(): void {
    console.log(`Ride booked to: ${this.hex()}`);
  }
}
