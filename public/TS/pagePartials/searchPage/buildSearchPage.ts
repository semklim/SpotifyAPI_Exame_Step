type Icon = {
	height: number;
	url: string;
	width: number;
  }
  
  type Item = {
	href: string;
	icons: Icon[];
	id: string;
	name: string;
  }
  
  type Categories = {
	href: string;
	items: Item[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
  }
  
  interface Genres {
	categories: Categories;
  }

function buildSearchPage(obj: Genres) {
	const picColor = (function*() {
		const colors = [
		  'rgb(225, 51, 0)',
		  'rgb(115, 88, 255)',
		  'rgb(30, 50, 100)',
		  'rgb(232, 17, 91)',
		  'rgb(20, 138, 8)',
		  'rgb(188, 89, 0)',
		  'rgb(233, 20, 41)',
		  'rgb(225, 17, 140)',
		  'rgb(141, 103, 171)',
		  'rgb(216, 64, 0)',
		  'rgb(119, 119, 119)',
		  'rgb(220, 20, 140)',
		  'rgb(83, 122, 161)',
		  'rgb(81, 121, 161)',
		  'rgb(186, 93, 7)',
		  'rgb(230, 30, 50)',
		  'rgb(176, 40, 151)',
		  'rgb(125, 75, 50)',
		  'rgb(80, 55, 80)',
		  'rgb(228, 29, 99)',
		  'rgb(175, 40, 150)',
		  'rgb(165, 103, 82)',
		  'rgb(71, 125, 149)',
		  'rgb(176, 98, 57)',
		  'rgb(13, 114, 237)',
		  'rgb(13, 115, 236)',
		  'rgb(140, 25, 50)',
		  'rgb(235, 30, 50)',
		  'rgb(39, 133, 106)',
		  'rgb(5, 105, 82)',
		  'rgb(255, 0, 144)'
		];
		while (true) {
			for (let i = 0; i < colors.length; i++) {
			  yield colors[i];
			}
		  }
		})();

		const { categories: { items } } = obj;
		let genres = '';
		items.forEach((el) => {
		  const urlImg = el.icons[0].url;
		//   funk is undefined. can`t read.
		  if(el.id === 'funk') return undefined;
		  genres += `
			<div class="genres" id="${el.id === 'funk'? '0JQ5DAqbMKFFsW9N8maB6z' : el.id}" style="background-color:${ picColor.next().value }">
				<div class="genres__box">
					<span class="nameOfGenres">${el.name}</span>
					<img aria-hidden="false" draggable="false" loading="lazy" src="${urlImg}" class="imgOfGenres" alt="">
				</div>
			</div>`;
		  });
		const searchBox = `
		  <div class="wrapper">
			  <div class="searchTrack">
				  <input maxlength="800" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="What do you want to listen to?" type="text" name="" id="" class="searchbox">
			  </div>
		  </div>`;
		const box =`
			<h2 class="nameOfList">Browse all</h2>
			<div class="collectionGenres">
				${genres}
			</div>`;
		return {searchBox, box};
}

export default buildSearchPage;