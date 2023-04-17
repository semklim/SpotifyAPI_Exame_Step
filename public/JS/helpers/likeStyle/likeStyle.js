import { APP } from "../../service/APP.js";
function likeStyle(target, likeCondition) {
    const path = target.firstElementChild;
    if (likeCondition) {
        if (APP.isLoggedIn) {
            target.style.width = '19';
            target.style.height = '17';
            path.style.stroke = 'none';
            target.style.fill = 'green';
            target.setAttribute('data-like-condition', 'true');
            target.classList.remove('hover');
        }
    }
    else {
        target.style.width = '17';
        target.style.height = '16';
        path.style.stroke = 'lightgrey';
        target.style.fill = 'none';
        target.setAttribute('data-like-condition', 'false');
        target.classList.add('hover');
    }
}
export default likeStyle;
