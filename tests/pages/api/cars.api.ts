import { APIRequestContext } from "@playwright/test";

export type CarData = {
    vin: string;
    make: string;
    model: string;
    year_of_manufacture: number;
    power: number;
    cc: number;
    category: string;
    owner_id: string;
};

export class CarsApi {
    constructor(private readonly request: APIRequestContext) { }

    async getCars() {
        return this.request.get("/api/cars/");
    }

    async getCar(id: string) {
        return this.request.get(`/api/cars/${id}`);
    }

    async createCar(car: CarData) {
        return this.request.post("/api/cars/", {
            data: car,
        });
    }

    async deleteCar(id: string) {
        return this.request.delete(`/api/cars/${id}`);
    }

    async getCategories() {
        return this.request.get("/api/cars/cars-categories");
    }
}