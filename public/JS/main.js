import Cookie from "./Cookies.js";
import mainClickerListener from "./Listeners/mainClickListener.js";
import { setNumberOfGridColumns } from "./helpers/setNumberOfColumns.js";
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
const btn = document.querySelector('.login');
if ((Cookie.get('accessToken'))) {
    Auth.refreshToken = Cookie.get('refreshToken');
    Auth.accessToken = Cookie.get('accessToken');
    Auth.expires_in = new Date(Cookie.get('expires_in'));
    API.accessToken = Auth.accessToken;
    API.expires_in = Auth.expires_in;
    API.user = JSON.parse(Cookie.get('userProfile'));
    btn.textContent = "Logout";
    btn.setAttribute('data-isLoggedIn', 'true');
    APP.isLoggedIn = true;
    APP.PageRecomm().then(() => {
        window.addEventListener('click', mainClickerListener);
    });
}
else {
    Cookie.clearAllCookie();
    APP.getToken().then(() => {
        APP.PageRecomm()
            .then(() => {
            window.addEventListener('click', mainClickerListener);
        });
    });
}
////////// изза новой линейки архитектуры, не понял куда это засутунь
///это всплытие блока кнопок при нажатии на блок юзера в хедере
let loginBox = document.querySelector('.loginBox-when-auth');
let burgerButtons = document.querySelector('.burger-buttons-login');
loginBox.addEventListener('click', function (event) {
    burgerButtons.classList.add('active');
    event.stopPropagation(); // предотвращает всплытие события
});
// обработчик событий для клика на документе
document.addEventListener('click', function (event) {
    if (!loginBox.contains(event.target)) {
        burgerButtons.classList.remove('active');
    }
});
//////////////////////////////
btn.addEventListener('click', logicOfLoginBtn);
setNumberOfGridColumns();
window.addEventListener('resize', setNumberOfGridColumns);
API.UserProfile().then(data => { console.log(data); });
