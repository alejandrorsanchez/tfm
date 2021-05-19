export class Coordinate {
  lat: number;
  lng: number;

  constructor() {
  }

  getDistanceWith(coordinate: Coordinate): number {
    const rad = function(x) {return x*Math.PI/180;}
    const R = 6378.137;
    const dLat = rad( coordinate.lat - this.lat );
    const dLong = rad( coordinate.lng - this.lng );
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(this.lat)) *
      Math.cos(rad(coordinate.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Number((R * c).toFixed(2));
  }
}
