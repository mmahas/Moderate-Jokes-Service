export function getAuthHeader(token: string) {
    return {
        headers: {
            Authorization: `${token}`,
        },
    };
}
