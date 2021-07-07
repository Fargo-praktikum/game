export function makeStartLogsText(
    hosts: string[],
    protocol = "https",
    port: number | string,
) {
    return `
Running on:
${hosts.map(host => `   * ${protocol}://${host}:${port}`).join("\n")}
`;
}
