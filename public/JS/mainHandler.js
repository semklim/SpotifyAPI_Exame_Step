function mainHandler(e) {
    const target = e.target;
    const className = [...target.classList];
    if (className.includes('like')) {
        const likeCondition = target.getAttribute('data-likeCondition');
        const path = target.firstElementChild;
        target.classList.add("shake");
        setTimeout(function () {
            target.classList.remove("shake");
        }, 800);
        if (likeCondition === 'true') {
            target.style.width = '17';
            target.style.height = '15';
            path.style.stroke = 'lightgrey';
            target.style.fill = 'none';
            //   likeCondition = false;
            target.setAttribute('data-likeCondition', 'false');
            target.classList.add('hover');
        }
        else {
            target.style.width = '19';
            target.style.height = '17';
            path.style.stroke = 'none';
            target.style.fill = 'green';
            //   likeCondition = true;
            target.setAttribute('data-likeCondition', 'true');
            target.classList.remove('hover');
        }
    }
}
export default mainHandler;
