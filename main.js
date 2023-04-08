const bookmarkedDivs = JSON.parse(localStorage.getItem("bookmarked_divs")) || [];



const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery='';
const APP_ID = '276f5bce';
const APP_KEY = 'afa019a3c33e8276c9f65a8c559672ec';


searchForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});


async function fetchAPI(){    
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;

    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
}




document.addEventListener('click', function(event) {
    if(event.target.classList.contains('bookmark-btn')){
        // const clickButton = event.target;
        // console.log(clickButton);
        // const clickedButtonId = event.target.id;
        // console.log(clickedButtonId);
        // const suffixId= parseInt(clickedButtonId.split("_")[1]);
        // console.log(suffixId);

        const siblingId = event.target.previousElementSibling.id;
        console.log(siblingId);       
        const siblingHtml = document.getElementById(siblingId).innerHTML; 

        const isAlreadySaved = bookmarkedDivs.includes(siblingHtml);
        if (!isAlreadySaved) {
            bookmarkedDivs.push(siblingHtml);
            localStorage.setItem("bookmarked_divs", JSON.stringify(bookmarkedDivs));          
        }
        addToBookmarkPage();
        }       
})

document.addEventListener('click', function(event) {
    if(event.target.classList.contains('delete-btn')){
        const favSiblingHtml = event.target.previousElementSibling.innerHTML;
        deleteFromBookmark(favSiblingHtml);

    }
})

// To delete from the local strorage and fill the 
function deleteFromBookmark(del){
    const arrIndex = bookmarkedDivs.indexOf(del);
    if(arrIndex > -1){
        bookmarkedDivs.splice(arrIndex, 1);
        // updating the local storage.
        localStorage.setItem("bookmarked_divs", JSON.stringify(bookmarkedDivs));

    }
    addToBookmarkPage();
}



const favList = document.querySelector('#fav-list');

// Function to add to favourite when bookmark button is clicked.
function addToBookmarkPage(){
    console.log('adding to fav');

    // Removing the content of favList. so replace all.
    favList.innerHTML="";
    bookmarkedDivs.forEach((result, index) => {
        const newFavDiv = document.createElement("div");
        newFavDiv.id = "newFavId";

        let generatedFavHtml = result;

         // insert html into newFavDiv.
        newFavDiv.innerHTML = generatedFavHtml;

        // create a bookmark button element with the unique id.
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete Recipe';

        // Container for div
        const favContainer = document.createElement("div");      

        favContainer.appendChild(newFavDiv);
        favContainer.appendChild(deleteButton);

        favList.appendChild(favContainer);

    })

   

}










function generateHTML(results){
    container.classList.remove('initial');

    // Local array to save recipe temporarily.
    
    results.forEach((result, index) => {
        const newDivId = "div_" + index;
        const bookmarkButtonId = "bookmark_" + index;

        // create a new div element with the Unique ID and
        // the current item from the storeRecipe
        const newDiv = document.createElement("div");
        newDiv.id = newDivId;

        let generated_HTML =
        `<div class="item">
        <img src="${result.recipe.image}" alt="food item">
        <div> <h1 class="title">${result.recipe.label}</h1></div>

        <div class="flex-container add-btn-bookmark">            
            <a class= "view-button" href="${result.recipe.url}" target="_blank"> View Recipe </a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)} </p>
        <p class="item-data">Diet Labels: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
        <p class="item-data">Health Label:  ${result.recipe.healthLabels.slice(0,7)}</p>
        </div>
        `;
        
        // insert html into newDiv div.
        newDiv.innerHTML = generated_HTML;

        // create a bookmark button element with the unique id.
        const bookmarkButton = document.createElement('button');
        bookmarkButton.id = bookmarkButtonId;
        bookmarkButton.className = 'bookmark-btn';
        bookmarkButton.textContent = 'Save Recipe';

        // container for div and 
        const itemContainer = document.createElement("div");      

        itemContainer.appendChild(newDiv);
        itemContainer.appendChild(bookmarkButton);

        searchResultDiv.appendChild(itemContainer);
    });    
};




function openNav() {
    document.getElementById("mySidenav").style.width = "600px";
    // document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}