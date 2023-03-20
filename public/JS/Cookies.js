class Cookie {
    /**
     * Set a cookie with the given name and value.
     * @param name - The name of the cookie.
     * @param value - The value to be stored in the cookie.
     * @param days - The number of days until the cookie expires (optional).
     */
    static set(name, value, days) {
        let expires;
        if (days) {
            let time = new Date();
            const now = time.getUTCDate();
            time.setUTCDate(now + days);
            // @ts-ignore
            time = time.toGMTString();
            expires = `expires=${time}`;
        }
        else
            expires = `expires=`;
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; path=/`;
    }
    /**
     * Get the value of a cookie with the given name.
     * @param name - The name of the cookie.
     * @returns The value of the cookie, or null if the cookie does not exist.
     */
    static get(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : null;
        //   const cookies = document.cookie.split(';');
        //   for (const cookie of cookies) {
        // 	const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
        // 	if (cookieName === name) {
        // 	  return cookieValue;
        // 	}
        //   }
        //   return null;
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
