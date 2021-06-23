import { networkInterfaces } from "os";

export function findIP(): string | null {
    const nets = networkInterfaces();
    let result = null;

    Object.values(nets).some((nameNets) => {
        if (!nameNets) return;
        return nameNets.some((net) => {
            let needStop = false;
            if (net.family === "IPv4" && !net.internal && net.address.startsWith("192")) {
                result = net.address;
                needStop = true;
            }
            return needStop;
        });
    });

    return result;
}
