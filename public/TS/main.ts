import Cookie from "./Cookies.js";
import mainClickerListener from "./Listeners/mainClickListener.js";
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";
import { burgerUserBox, giveMeLoginBox, giveMeUserBox } from "./pagePartials/login/loginBox.js";
import API from "./service/API.js";
import { APP } from "./service/APP.js";
import Auth from "./service/Auth.js";


const loginMainBox = document.querySelector('.header-content') as HTMLElement;


if ((Cookie.get('accessToken'))) {
	Auth.refreshToken = Cookie.get('refreshToken')!;
	Auth.accessToken = Cookie.get('accessToken');
	Auth.expires_in = new Date(Cookie.get('expires_in')!);
	API.accessToken = Auth.accessToken;
	API.expires_in = Auth.expires_in;
	API.user = JSON.parse(Cookie.get('userProfile')!);
	loginMainBox.innerHTML = giveMeUserBox()
	APP.isLoggedIn = true;
	APP.PageRecomm().then(() => {
		window.addEventListener('click', mainClickerListener);
	});

} else {
	Cookie.clearAllCookie();
	loginMainBox.innerHTML = giveMeLoginBox();
	APP.getToken().then(() => {
		APP.PageRecomm()
		.then(() => {
			window.addEventListener('click', mainClickerListener);
		});
	});
}
setNumberOfGridColumns();
window.addEventListener('resize',setNumberOfGridColumns);