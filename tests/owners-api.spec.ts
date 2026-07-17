import { test, expect } from "@playwright/test";

const uniqueId = () => Date.now();
const API = "http://127.0.0.1:8000/api/owners";

test("GET /api/owners", async ({ request }) => {
  const response = await request.get(API);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.count).toBeGreaterThan(0);
  expect(Array.isArray(body.items)).toBe(true);
  expect(body.items.length).toBeGreaterThan(0);
});

  test("POST /api/owners", async ({ request }) => {
    const email = `api${uniqueId()}@example.com`;

    const response = await request.post(API, {
      data: {
        name: "API Test",
        birthdate: "1995-01-01",
        year_of_driver_license: 2015,
        driver_license_cat: "B",
        email,
      },
    });

    expect(response.status()).toBe(201);

    const owner = await response.json();

    expect(owner.id).toBeDefined();
    expect(owner.name).toBe("API Test");
    expect(owner.email).toBe(email);
  });

  test("GET /api/owners/{owner_id}", async ({ request }) => {
  const email = `api${uniqueId()}@example.com`;

  const create = await request.post(API, {
    data: {
      name: "API Test",
      birthdate: "1995-01-01",
      year_of_driver_license: 2015,
      driver_license_cat: "B",
      email,
    },
  });

  expect(create.status()).toBe(201);

  const owner = await create.json();

  const response = await request.get(`${API}/${owner.id}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(owner.id);
  expect(body.name).toBe("API Test");
  expect(body.email).toBe(email);
});

  test("PATCH /api/owners/{owner_id}", async ({ request }) => {
    const email = `api${uniqueId()}@example.com`;

    const create = await request.post(API, {
      data: {
        name: "API Test",
        birthdate: "1995-01-01",
        year_of_driver_license: 2015,
        driver_license_cat: "B",
        email,
      },
    });

    expect(create.status()).toBe(201);

    const owner = await create.json();

    const newEmail = `updated${uniqueId()}@example.com`;

    const patch = await request.patch(`${API}/${owner.id}`, {
      data: {
        email: newEmail,
      },
    });

    expect(patch.status()).toBe(200);

    const get = await request.get(`${API}/${owner.id}`);

    expect(get.status()).toBe(200);

    const updated = await get.json();

    expect(updated.email).toBe(newEmail);
  });

  test("DELETE /api/owners/{owner_id}", async ({ request }) => {
    const email = `api${uniqueId()}@example.com`;

    const create = await request.post(API, {
      data: {
        name: "API Test",
        birthdate: "1995-01-01",
        year_of_driver_license: 2015,
        driver_license_cat: "B",
        email,
      },
    });

    expect(create.status()).toBe(201);

    const owner = await create.json();

    const del = await request.delete(`${API}/${owner.id}`);

    expect(del.status()).toBe(204);

    const get = await request.get(`${API}/${owner.id}`);

    expect(get.status()).toBe(404);
  });

