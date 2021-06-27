import { baseUrl } from "../../configs/baseUrl";

export function getApiBaseUrl(isInternal = false): string {
    return isInternal ? "/api" : baseUrl;
}
