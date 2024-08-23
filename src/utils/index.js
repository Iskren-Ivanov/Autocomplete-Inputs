
export const fetchData = async (url, method = "GET", headers = { "Accept": "application/json" }, body) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: method === "GET" || body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response?.text();
        return data ? JSON.parse(data) : [];
    } catch (error) {
        throw error;
    }
}; 