import { CarsApi } from "../../../pages/api/cars.api";
import { OwnersApi } from "../../../pages/api/owners.api";
import { buildCar } from "../../../shared/data/car.factory";
import { invalidVins, validVins } from "../../../shared/data/vin.data";
import { test, expect } from "@playwright/test";



for (const vin of validVins) {

  test(`create car with valid VIN ${vin}`, async ({ request }) => {

    const ownersApi = new OwnersApi(request);
    const carsApi = new CarsApi(request);

    const { owner } = await ownersApi.createOwner();

    const response = await carsApi.createCar(
      buildCar({
        vin,
        owner_id: owner.id,
      })
    );

    expect(response.status()).toBe(201);

    const createdCar = await response.json();

    await carsApi.deleteCar(createdCar.id);

    await ownersApi.deleteOwner(owner.id);

  });

}

for (const vin of invalidVins) {

  test(`invalid VIN ${vin}`, async ({ request }) => {

    const ownersApi = new OwnersApi(request);
    const carsApi = new CarsApi(request);

    const { owner } = await ownersApi.createOwner();

    const response = await carsApi.createCar(
      buildCar({
        vin,
        owner_id: owner.id,
      })
    );

    expect(response.status()).not.toBe(201);

    await ownersApi.deleteOwner(owner.id);

  });

}