class Cookie {
    /**
     * Set a cookie with the given name and value.
     * @param name - The name of the cookie.
     * @param value - The value to be stored in the cookie.
     * @param days - The number of days until the cookie expires (optional).
     */
    static set(name, value, days) {
        const expires = days ? `; expires=${new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()}` : '';
        document.cookie = `${name}=${value}${expires}; path=/`;
    }
    /**
     * Get the value of a cookie with the given name.
     * @param name - The name of the cookie.
     * @returns The value of the cookie, or null if the cookie does not exist.
     */
    static get(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
    /**
     * Delete a cookie with the given name.
     * @param name - The name of the cookie to be deleted.
     */
    static deleteCookie(name) {
        Cookie.set(name, '', -1);
    }
}
export default Cookie;