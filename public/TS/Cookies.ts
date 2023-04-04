class Cookie {
	/**
	 * Set a cookie with the given name and value.
	 * @param name - The name of the cookie.
	 * @param value - The value to be stored in the cookie.
	 * @param days - The number of days until the cookie expires (optional).
	 */
	public static set(name: string, value: string, days?: number): void {
	  let expires: string;
		if(days){
			let time = new Date();
			const now = time.getUTCDate();
			time.setUTCDate(now + days);
			// @ts-ignore
			time = time.toGMTString();
			expires = `expires=${time}`
		}else expires = `expires=`

	  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; path=/`;
	}
  
	/**
	 * Get the value of a cookie with the given name.
	 * @param name - The name of the cookie.
	 * @returns The value of the cookie, or null if the cookie does not exist.
	 */
	public static get(name: string): string | null {
			let matches = document.cookie.match(new RegExp(
			  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : null; 
	}
  
	/**
	 * Delete a cookie with the given name.
	 * @param name - The name of the cookie to be deleted.
	 */
	public static deleteCookie(name: string): void {
	 Cookie.set(name, '', -1);
	}

		/**
	 * Delete all cookies from domain.
	 */
	public static clearAllCookie () {
		let cookies = document.cookie.split("; ");
		for (let c = 0; c < cookies.length; c++) {
			let d = window.location.hostname.split(".");
			while (d.length > 0) {
				let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
				let p = location.pathname.split('/');
				document.cookie = cookieBase + '/';
				while (p.length > 0) {
					document.cookie = cookieBase + p.join('/');
					p.pop();
				};
				d.shift();
			}
		}
	}
  }
  
export default Cookie;