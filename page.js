let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
	let { title, link, description } = result;
	//create result container
	let resultItemEl = document.createElement("div");
	resultItemEl.classList.add("result-item");
	searchResultsEl.appendChild(resultItemEl);
	//create litle
	let resultTitleEl = document.createElement("a");
	resultTitleEl.href = link;
	resultTitleEl.target = "_blank";
	resultTitleEl.textContent = title;
	resultTitleEl.classList.add("result-title");
	resultItemEl.appendChild(resultTitleEl);
	//create break line
	let titleBreakEl = document.createElement("br");
	resultItemEl.appendChild(titleBreakEl);
	//create URL element
	let urlEl = document.createElement("a");
	urlEl.href = link;
	urlEl.target = "_blank";
	urlEl.textContent = link;
	urlEl.classList.add("result-url");
	resultItemEl.appendChild(urlEl);
	let titleBreakEl2 = document.createElement("br");
	resultItemEl.appendChild(titleBreakEl2);
	//create description Element
	let descriptionEl = document.createElement("p");
	descriptionEl.classList.add("link-description");
	descriptionEl.textContent = description;
	resultItemEl.appendChild(descriptionEl);
}

function displayValues(search_results) {
	spinnerEl.classList.toggle("d-none");
	for (let result of search_results) {
		createAndAppendSearchResults(result);
	}
}

function searchWiki(event) {
	if (event.key === "Enter") {
		searchResultsEl.textContent = "";
		spinnerEl.classList.toggle("d-none");
		let inputVal = searchInputEl.value;
		let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;
		let options = {
			method: "GET",
		};
		fetch(url, options)
			.then((response) => {
				return response.json();
			})
			.then((jsonBody) => {
				let { search_results } = jsonBody;
				displayValues(search_results);
			});
	}
}
searchInputEl.addEventListener("keydown", searchWiki);
