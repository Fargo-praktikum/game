const isServer = !(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
);

export default isServer;
