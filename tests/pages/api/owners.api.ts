import {
    APIRequestContext,
    APIResponse,
    expect,
} from "@playwright/test";

export type OwnerPayload = {
    name: string;
    birthdate: string;
    year_of_driver_license: number;
    driver_license_cat: string;
    email: string;
};

export class OwnersApi {
    constructor(private readonly request: APIRequestContext) { }

    private readonly endpoint = "/api/owners";

    async createOwner(overrides: Partial<OwnerPayload> = {}) {
        const uniqueId = Date.now();

        const payload: OwnerPayload = {
            name: "Api Owner",
            birthdate: "1992-06-29",
            year_of_driver_license: 2012,
            driver_license_cat: "B",
            email: `api.owner.${uniqueId}@example.com`,
            ...overrides,
        };

        const response = await this.request.post(this.endpoint, {
            data: payload,
        });

        expect(response.status()).toBe(201);

        const owner = await response.json();

        return {
            owner,
            payload,
        };
    }

    async getOwners() {
        return this.request.get(this.endpoint);
    }

    async getOwner(id: string) {
        return this.request.get(`${this.endpoint}/${id}`);
    }

    async updateOwner(id: string, data: Partial<OwnerPayload>) {
        return this.request.patch(`${this.endpoint}/${id}`, {
            data,
        });
    }

    async deleteOwner(id: string) {
        return this.request.delete(`${this.endpoint}/${id}`);
    }
}