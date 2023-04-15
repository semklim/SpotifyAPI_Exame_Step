import Cookie from "./Cookies.js";
import mainClickerListener from "./Listeners/mainClickListener.js";
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";
import { burgerUserBox, giveMeLoginBox, giveMeUserBox } from "./pagePartials/login/loginBox.js";
import API from "./service/API.js";
import { APP } from "./service/APP.js";
import Auth from "./service/Auth.js";


function logicOfLoginBtn() {
	removeEventListener('click', mainClickerListener);
	APP.history.length = 0;
	
	if (btn.getAttribute('data-isLoggedIn') === 'false') {
		APP.initLogin(btn);
	}
	else {
		APP.initLogout(btn);
	}
}
const loginMainBox = document.querySelector('.header-content') as HTMLElement;
let btn = <HTMLButtonElement>document.querySelector('.login')!;

if ((Cookie.get('accessToken'))) {
	Auth.refreshToken = Cookie.get('refreshToken')!;
	Auth.accessToken = Cookie.get('accessToken');
	Auth.expires_in = new Date(Cookie.get('expires_in')!);
	API.accessToken = Auth.accessToken;
	API.expires_in = Auth.expires_in;
	API.user = JSON.parse(Cookie.get('userProfile')!);
	//
	loginMainBox.innerHTML = giveMeUserBox()
	let userName = document.querySelector('.login-name-profile')
	//@ts-ignore
	API.UserProfile().then(data => {userName.textContent = data.display_name})
	btn = <HTMLButtonElement>document.querySelector('.logout')!;
	// loginBoxHtml.style.display = 'none'
	// btn.textContent = "Logout";
	btn.setAttribute('data-isLoggedIn', 'true');

	burgerUserBox();
	APP.isLoggedIn = true;
	APP.PageRecomm().then(() => {
		window.addEventListener('click', mainClickerListener);
	});

} else {
	Cookie.clearAllCookie();
	loginMainBox.innerHTML = giveMeLoginBox()
	btn = <HTMLButtonElement>document.querySelector('.login');
	APP.getToken().then(() => {
		APP.PageRecomm()
		.then(() => {
			window.addEventListener('click', mainClickerListener);
		});
	});
}
btn.addEventListener('click', logicOfLoginBtn);

setNumberOfGridColumns();
window.addEventListener('resize',setNumberOfGridColumns);