import { test as base, expect } from "@playwright/test";
import { OwnersApi } from "../pages/api/owners.api";

export const test = base.extend<{
    owner: any;
}>({
    owner: async ({ request }, use) => {
        const ownersApi = new OwnersApi(request);

        const { owner } = await ownersApi.createOwner();

        await use(owner);

        await ownersApi.deleteOwner(owner.id);
    },
});

export { expect };