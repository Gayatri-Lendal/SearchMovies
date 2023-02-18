//API-most popular movies are displayed on the home screen when the user has not searched yet.
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
//This API displays the searched movies by the user.
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

   
const moiveBox = document.querySelector("#movie-box")

//we are fetching data from the api on showing it on the console.
const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    //show us the list of movies
    showMovies(data);
}
//initial call
getMovies(APIURL);

//take the data convert it into html and append it to the movieBox,append is to add
const showMovies = (data) => {
    moiveBox.innerHTML = "";  //empty the movie box
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
            //show sample data
            // const box = `
            // <div class="box">
            //     <img src="${IMGPATH+result}" alt="" />
            //     <div class="overlay">
            //         <h2>Overview:</h2>
            //         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis iste doloribus quam voluptatum, illum unde nostrum dignissimos, mollitia, sapiente porro natus neque cupiditate distinctio quod possimus aliquid reiciendis vel. Soluta?</p>
            //     </div>
            // </div>
            // `

            //show actual data of movies
            const box = document.createElement("div")
            box.classList.add("box")
            box.innerHTML = `
                <img src="${imagePath}" alt="" />

                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                        ${result.overview}
                    </p>
                 </div>
            `
            moiveBox.appendChild(box)
        }
    )
}

document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        //show searched movies
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
        //show popular movies
            getMovies(APIURL);
        }
    }
)



// in the website we are going to show image,title,rating and overview of the movie.


// NEW CONCEPTS I learnt while making this project

//forEach loop > The forEach() method calls a function for each element in an array.

/* Async Function >
"async and await make promises easier to write"
async makes a function return a Promise
await makes a function wait for a Promise
The keyword async before a function makes the function return a promise

The await keyword can only be used inside an async function.
The await keyword makes the function pause the execution and wait for a resolved promise before it continues
*/

//html new concepts >> span and overlay
// to get the image concatenate poster_path with base url 
//to append child first we need to make it a document object

//dom-querySelector >
/*event-addEventListener >The querySelector() method returns the first element that matches a CSS selector.
                         >To return all matches (not only the first), use the querySelectorAll() instead.*/
//addEventListener >The addEventListener() method attaches an event handler to an element