import { test, expect } from "@playwright/test";
import { OwnersApi } from "./pages/api/owners.api";

const uniqueId = () => Date.now();
const API = "http://127.0.0.1:8000/api/owners";

test("GET owners", async ({ request }) => {
  const api = new OwnersApi(request);

  const response = await api.getOwners();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.count).toBeGreaterThan(0);
  expect(body.items.length).toBeGreaterThan(0);
});

test("POST owner", async ({ request }) => {
  const api = new OwnersApi(request);

  const { owner, payload } = await api.createOwner();

  expect(owner.id).toBeDefined();
  expect(owner.name).toBe(payload.name);
  expect(owner.email).toBe(payload.email);
});

test("GET owner by id", async ({ request }) => {
  const api = new OwnersApi(request);

  const { owner } = await api.createOwner();

  const response = await api.getOwner(owner.id);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(owner.id);
});

test("PATCH owner", async ({ request }) => {
  const api = new OwnersApi(request);

  const { owner } = await api.createOwner();

  const newEmail = `updated.${Date.now()}@example.com`;

  const response = await api.updateOwner(owner.id, {
    email: newEmail,
  });

  expect(response.status()).toBe(200);

  const get = await api.getOwner(owner.id);

  const updated = await get.json();

  expect(updated.email).toBe(newEmail);
});

test("DELETE owner", async ({ request }) => {
  const api = new OwnersApi(request);

  const { owner } = await api.createOwner();

  const response = await api.deleteOwner(owner.id);

  expect(response.status()).toBe(204);

  const get = await api.getOwner(owner.id);

  expect(get.status()).toBe(404);
});

