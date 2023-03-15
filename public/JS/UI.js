"use strict";

const UI = (function () {
	const DOMElements = {
		logo: document.querySelector('.logo>img'),
		accountLink: document.querySelector('.accountLink'),
		accountInfo: document.querySelector('.account>ul')
	}
	return {
		createAccount({ display_name, email, external_urls: { spotify }, images }) {
			const logo = DOMElements.logo;
			const acLink = DOMElements.accountLink;
			const ac = DOMElements.accountInfo;
			logo.setAttribute('src', images[0].url);
			acLink.setAttribute('href', spotify);
			ac.innerHTML += `
			<li>${display_name}</li>
			<li>${email}</li>
			`


		},
		// createLiEl(tracks) {
		// 	const mainUl = DOMElements.ul;
		// 	let all_li = ``;
		// 	tracks.forEach(({ album: { images, name }, name: trackName, preview_url }) => {
		// 		if (preview_url) {
		// 			all_li += `
		// 			<li class="info musicBox">
		// 			<img src="${images[1].url}" alt="" width="${images[1].width}" height="${images[1].height}">

		// 			<p class="nameAlbum" >Album: ${name}</p>
		// 			<p class="nameTrack" >Track: ${trackName}</p>
		// 			<audio src="${preview_url}" controls></audio>
		// 			</li>
		// 			`
		// 		}
		// 	});
		// 	mainUl.innerHTML = all_li;
		// }
	}
})();

export default UI;