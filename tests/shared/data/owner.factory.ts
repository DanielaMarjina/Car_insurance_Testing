export type Owner = {
    name: string;
    birthdate: string;
    year_of_driver_license: number;
    driver_license_cat: string;
    email: string;
};

export function buildOwner(overrides: Partial<Owner> = {}): Owner {
    const unique = Date.now();

    return {
        name: "Test Owner",
        birthdate: "1995-01-01",
        year_of_driver_license: 2015,
        driver_license_cat: "B",
        email: `owner${unique}@mail.com`,
        ...overrides,
    };
}