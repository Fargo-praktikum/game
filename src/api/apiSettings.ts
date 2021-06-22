const externalApiHost = "://ya-praktikum.tech";

export const settings = {
    baseurl: `https${externalApiHost}/api/v2`,
};

export function getApiBaseUrl(isInternal = false): string {
    return isInternal ? "/api" : settings.baseurl;
}
