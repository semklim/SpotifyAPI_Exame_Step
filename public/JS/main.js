import Cookie from "./Cookies.js";
import mainClickerListener from "./Listeners/mainClickListener.js";
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";
import { giveMeLoginBox, giveMeUserBox } from "./pagePartials/login/loginBox.js";
import API from "./service/API.js";
import { APP } from "./service/APP.js";
import Auth from "./service/Auth.js";
function logicOfLoginBtn() {
    if (APP.isLoggedIn) {
        removeEventListener('click', mainClickerListener);
        APP.history.length = 0;
        APP.initLogout(btnLogaut);
    }
}
const loginMainBox = document.querySelector('.header-content');
let btn = document.getElementsByClassName('login')[0];
let btnLogaut;
if ((Cookie.get('accessToken'))) {
    Auth.refreshToken = Cookie.get('refreshToken');
    Auth.accessToken = Cookie.get('accessToken');
    Auth.expires_in = new Date(Cookie.get('expires_in'));
    API.accessToken = Auth.accessToken;
    API.expires_in = Auth.expires_in;
    API.user = JSON.parse(Cookie.get('userProfile'));
    loginMainBox.innerHTML = giveMeUserBox();
    APP.isLoggedIn = true;
    APP.PageRecomm().then(() => {
        window.addEventListener('click', mainClickerListener);
    });
}
else {
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
window.addEventListener('resize', setNumberOfGridColumns);
