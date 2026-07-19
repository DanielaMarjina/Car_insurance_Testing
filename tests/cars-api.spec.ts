import { test, expect } from "@playwright/test";
import { CarsApi } from "./pages/api/cars.api";
import { OwnersApi } from "./pages/api/owners.api";

const uniqueId = () => Date.now();

test("GET cars", async ({ request }) => {

    const api = new CarsApi(request);

    const response = await api.getCars();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.count).toBeGreaterThan(0);
    expect(body.items.length).toBeGreaterThan(0);

});

test("POST car", async ({ request }) => {

    const ownersApi = new OwnersApi(request);
    const carsApi = new CarsApi(request);

    const { owner } = await ownersApi.createOwner({
        name: "API Owner",
        birthdate: "1995-01-01",
        year_of_driver_license: 2015,
        driver_license_cat: "B",
        email: `api${uniqueId()}@mail.com`
    });


    const car = await carsApi.createCar({

        vin: `VIN${uniqueId()}`,
        make: "Toyota",
        model: "Corolla",
        year_of_manufacture: 2023,
        power: 120,
        cc: 1600,
        category: "EURO6",
        owner_id: owner.id

    });

    expect(car.status()).toBe(201);

});

test("GET car by id", async ({ request }) => {

    const ownersApi = new OwnersApi(request);
    const carsApi = new CarsApi(request);

    const { owner } = await ownersApi.createOwner({
        name: "Owner",
        birthdate: "1990-01-01",
        year_of_driver_license: 2010,
        driver_license_cat: "B",
        email: `api${uniqueId()}@mail.com`
    });

    const created = await carsApi.createCar({

        vin: `VIN${uniqueId()}`,
        make: "BMW",
        model: "X5",
        year_of_manufacture: 2020,
        power: 200,
        cc: 3000,
        category: "EURO6",
        owner_id: owner.id

    });

    const car = await created.json();

    const response = await carsApi.getCar(car.id);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(car.id);

});

test("DELETE car", async ({ request }) => {

    const ownersApi = new OwnersApi(request);
    const carsApi = new CarsApi(request);

    const { owner } = await ownersApi.createOwner({
        name: "Owner",
        birthdate: "1995-01-01",
        year_of_driver_license: 2015,
        driver_license_cat: "B",
        email: `api${uniqueId()}@mail.com`
    });

    const created = await carsApi.createCar({

        vin: `VIN${uniqueId()}`,
        make: "Audi",
        model: "A4",
        year_of_manufacture: 2022,
        power: 170,
        cc: 2000,
        category: "EURO6",
        owner_id: owner.id

    });

    const car = await created.json();

    const del = await carsApi.deleteCar(car.id);

    expect(del.status()).toBe(204);

});