export type Car = {
  vin: string;
  make: string;
  model: string;
  year_of_manufacture: number;
  power: number;
  cc: number;
  category: string;
  owner_id:string;
};

export function buildCar(overrides: Partial<Car> = {}): Car {
  const unique = Date.now();

  return {
    vin: `VIN${unique}`,
    make: "BMW",
    model: "320d",
    year_of_manufacture: 2020,
    power: 190,
    cc: 1995,
    category: "EURO3",
    owner_id:"",
    ...overrides,
  };
}