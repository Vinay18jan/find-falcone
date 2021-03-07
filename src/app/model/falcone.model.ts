export class Falcone {
    token?: string;
    planet_names?: string[];
    vehicle_names?: string[];

    constructor() {
        this.token = undefined; 
        this.planet_names = new Array(); 
        this.vehicle_names = new Array(); 
    }
}