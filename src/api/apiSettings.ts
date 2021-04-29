const host = "://ya-praktikum.tech";

export const settings = {
    baseurl: `https${host}/api/v2`,
};

export function getApiBaseUrl(): string {
    return settings.baseurl;
}
