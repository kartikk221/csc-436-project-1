export const CACHE_KEY = 'conversion_data';

async function fetch_conversion_data() {
    // Make a fetch to the CoinDesk API to retrieve the current data
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');

    // Return the data as JSON
    return await response.json();
}

export function get_cache_expires_at() {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
        const { expires_at } = JSON.parse(raw);
        return expires_at;
    }

    return 0;
}

export async function get_conversion_data({ cache = true, cache_lifetime_ms = 1000 * 60 * 5 } = {}) {
    // Check cache if requested
    if (cache) {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
            // Destructure and ensure the data is not too old
            const { expires_at, data } = JSON.parse(raw);
            if (expires_at > Date.now()) return data;
        }
    }

    // Fetch the data
    const data = await fetch_conversion_data();

    // Cache the data
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
            data,
            expires_at: Date.now() + cache_lifetime_ms,
        })
    );

    // Return the data
    return data;
}
