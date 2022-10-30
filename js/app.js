/* list 
** Globel Variabels { linkApi , arrJasonAp i} 
** main code {hide waiting layer , navbar animation  }
**navBar links event { go home , go search , go ingredient  ,contact} 
** function switch from section to anothe 
**
**
*/






/*Globel Variabels */
let linkApi = '';
let arrJasonApi = {};

//  Globel variable for NavBar
let disappearNavBar = $("nav .disappear");
let linksNavBar = $("nav a");
let navXIcon = $("nav .appear i.fa-xmark");
let navOpenIcon = $("nav .appear .openIcons span");
let endOfNavBar = $(".endOfNavBar");

// main code
$("body").ready(function () {


    // first we have to hide waitingLayer
    $(".waitingLayer").addClass("d-none");
    $("nav").removeClass("d-none")




    // ---------------------------------------NavBar------------------------------------------------

    /*disappearNavBar animation */
    // event to disapear nav bar by x icon 
    navXIcon.click(disappearNav)
    // this function hide or show the navbar when you click in the ☰open icon
    navOpenIcon.click(function () {


        disappearNavBar.show();
        disappearNavBar.animate({ width: "200px" }, 500, function () {
            disappearNavBar.animate({ paddingTop: "0px" }, 500)
            linksNavBar.animate({ fontSize: "1em", paddingTop: "0px" }, 500);


        });
        endOfNavBar.show(1100);




        $(this).addClass("d-none");
        navXIcon.removeClass("d-none");





    })
    goHome();



    // navBar links event to 
    $("#Home").click(goHome);
    $("#Search").click(goSearch);
    $("#Category").click(goCategories);
    $("#Area").click(goArea);
    $("#ingredients").click(goIngredient);
    $("#Contact").click(goContact);

    //search events

    $("div.row.search #searchByLetter").keyup(function () {
        this.maxLength = 1;
        searchByletter($(this).val());
    })

    $(" div.row.search #searchByName").keyup(function () {
        searchByName($(this).val());
    })
















})


/*Main function
** we will use this to move from section to another*/
let divContact = $(".contact");
let divSearch = $("div.row.search");
function goHome() {
    foodItemsDiv.innerHTML = "";
    checkContact();
    checkSearch();
    linkApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    getApiArr(linkApi, displayFoods);
    disappearNav();

}
function goSearch() {
    foodItemsDiv.innerHTML = "";
    checkContact();
    divSearch.removeClass("d-none");
    document.querySelector('section.container.mainPage .row.mainShow').innerHTML = ""
    disappearNav();


}
function goCategories() {
    foodItemsDiv.innerHTML = "";
    checkContact();
    checkSearch();
    linkApi = "https://www.themealdb.com/api/json/v1/1/categories.php";
    getApiArr(linkApi, displayCatagories);

    disappearNav();

}
function goArea() {
    foodItemsDiv.innerHTML = "";
    checkContact();
    checkSearch();
    linkApi = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    getApiArr(linkApi, displayArea);
    disappearNav();


}
function goIngredient() {
    foodItemsDiv.innerHTML = "";
    checkContact();
    checkSearch();
    linkApi = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
    getApiArr(linkApi, displayIngredient);
    disappearNav();

}

function goContact() {
    foodItemsDiv.innerHTML = "";
    checkSearch();
    divContact.removeClass("d-none")
    document.querySelector('section.container.mainPage .row.mainShow').innerHTML = ""
    disappearNav();



}




// check functions 
function checkContact() {
    if (
        !divContact.hasClass("d-none")

    ) {
        divContact.addClass("d-none");

    }
}


function checkSearch() {

    if (
        !divSearch.hasClass("d-none")

    ) {
        divSearch.addClass("d-none");

    }
}





/* small function to help 
** get API arr
** get meal by letter 
** search
** get meal by ingredents */
// globel variabels for functions 
const foodItemsDiv = document.querySelector('section.container.mainPage .row.mainShow');
function getApiArr(linkApi, displayFunction) {
    $(".waitingLayerApi").show(0,function(){
    
        $(this).removeClass("d-none");
    
        } )
    fetch(linkApi)
        .then((response) => response.json())
    .then((data) => arrJasonApi = data).then(displayFunction);
    $(".waitingLayerApi").fadeOut(1500,function(){
    
    $(this).addClass('d-none');

    })

}
function getCategory(Category) {
    linkApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`;
    getApiArr(linkApi, displayFoods);

}

// this function will display food from the ingredient by using displayFood 
function getByIngredient(ingredient) {
    linkApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    getApiArr(linkApi, displayFoods);

}

function getByArea(Area) {
    linkApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`;
    getApiArr(linkApi, displayFoods);

}

// getMeal display the information about food
function getMeal(idMeal) {
    linkApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    getApiArr(linkApi, function () { displayMeal(arrJasonApi.meals[0]) });





    function displayMeal(meal) {
        let recipes = "";
        let tags = "";




        // check there is  tags or not then collect tags
        if (meal.strTags !== null) {
            let tagsEle = meal.strTags.split(",")




            for (let i = 0; i < tagsEle.length; i++) {
                tags += `
        <div class=" rounded-5 bg-warning me-2 d-flex justify-content-center align-items-center p-2 ">
             ${tagsEle[i]}

         </div>`;
            }

        }





        // collect all ingredients

        for (let i = 1; i < 21; i++) {

            if (meal[`strIngredient${i}`]) {
                recipes += `<div class=" rounded-5 bg-info me-2 my-2 d-flex justify-content-center align-items-center p-2 ">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</div>`
            }

        }





        //build html code 
            foodItemsDiv.innerHTML = `<div class="col-md-4 col-sm-12 text-white text-center " >
            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}  ">
            <h2>   ${meal.strMeal}            </h2>

        </div>
        <div class="col-md-8 col-sm-12 text-white" >
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
             <p><span class="fw-bold" >Area : </span>${meal.strArea}</p>  
             <p><span class="fw-bold" >Category : </span>${meal.strCategory}</p>
             <p class="fw-bold" >Recipes : </p>
             <div class="recipes d-flex flex-wrap">
             ${recipes}
            </div>
            <p class="fw-bold" >Tags : </p>
            <div class="Tag d-flex flex-wrap">
            ${tags}
             
            </div>
            <div class="buttons mt-5">
                <a class="btn btn-danger" href="${meal.strYoutube}"> Youtube</a>
                <a class="btn btn-success ${(meal.strSource !== null) ? `"href=" ${meal.strSource}"` : `disabled" href="#"`} > Source</a>

            </div>



        </div>`
    }

}


// function to display cards of food

function displayFoods(arrJasonApi) {

    let collection = "";


    for (const meal of arrJasonApi.meals) {
        const foodDiv = `
        <div class="col-lg-3 col-md-4 col-sm-6 ">
        <figure onclick="getMeal(${meal.idMeal})" class="figure position-relative  overflow-hidden    ">
            <img src="${meal.strMealThumb}" class="figure-img img-fluid rounded m-0" alt="${meal.strMeal}">
            <figcaption class="figure-caption text-black bg-white bg-opacity-50 fa-2x  d-flex align-items-center  "><h4>${meal.strMeal}</h4></figcaption>
          </figure>
          </div>    
        `;
        collection += foodDiv;
    };
    foodItemsDiv.innerHTML = collection;


}
function displayCatagories(arrJasonApi) {

    let collection = "";


    for (const Category of arrJasonApi.categories) {
        const foodDiv = `
        <div class="col-lg-3 col-md-4 col-sm-6 ">
        <figure onclick="getCategory('${Category.strCategory}')" class="figure position-relative  overflow-hidden    ">
            <img src="${Category.strCategoryThumb}" class="figure-img img-fluid rounded m-0" alt="${Category.strCategory}">

            <figcaption class="figure-caption text-black bg-white bg-opacity-50  text-center fa-1x  ">
            <h4>${Category.strCategory}</h4>
            <p class="w-100">${Category.strCategoryDescription}</p>
            
            </figcaption>

            
            
        </figure>
        </div>  

            
        `;
        collection += foodDiv;
    };
    foodItemsDiv.innerHTML = collection;


}
function displayIngredient(arrJasonApi) {

    let collection = "";


    for (const meal of arrJasonApi.meals) {
        const foodDiv = `
            
        <div class="col-sm-6  overflow-hidden text-center col-lg-3 my-3 ">
        <div style="height:300px "  onclick="getByIngredient('${meal.strIngredient}')" class="movie shadow rounded-2 border border-2 border-white  position-relative">
            <div class="post ">
                <i class="fa-solid text-warning  fa-utensils mt-2 fa-3x"></i>
                <h2 class="text-white">${meal.strIngredient}</h2>
                <p class="text-white">${(meal.strDescription) ? `${meal.strDescription}` : ""} </p>
            </div>
        </div>
    </div>   
            `;
        collection += foodDiv;
    };
    foodItemsDiv.innerHTML = collection;


}

function displayArea(arrJasonApi) {

    let collection = "";


    for (const meal of arrJasonApi.meals) {
        const foodDiv = `
            
        <div   class="col-sm-6 text-center col-lg-3 my-3">
            <div  style="height:250px " onclick="getByArea('${meal.strArea}')"  class=" rounded-2 d-flex justify-content-center align-items-center border-3 border border-white py-3 ">
                <div  class="post ">
                    <i class=" fa-solid fa-earth-africa text-info mb-2  fa-3x"></i>
                    <h2 class="text-white">${meal.strArea}</h2>
                </div>
            </div>
        </div>  
            `;
        collection += foodDiv;
    };
    foodItemsDiv.innerHTML = collection;


}
// this function hide the navbar when you click in the X icon bexuse i use it in different places i put it here
function disappearNav() {
    disappearNavBar.animate({ width: "0px", paddingTop: "100px" }, 500, function () {
        disappearNavBar.hide();


    })
    linksNavBar.animate({ fontSize: "0px", paddingTop: "100px" }, 500);

    endOfNavBar.hide(500);



    navXIcon.addClass("d-none");
    navOpenIcon.removeClass("d-none");

}

/* search function */

function searchByletter(searchValue) {
    linkApi = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`;
    getApiArr(linkApi, displayFoods);


}

function searchByName(searchValue) {
    linkApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    getApiArr(linkApi, displayFoods);


}
/* validation of contacts */
// Regax variable
let nameRegax = new RegExp('^[a-zA-Z]+\.[a-zA-Z]{4,10}^');
let emailRegax = new RegExp(`^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`);
let phoneRegax = new RegExp('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"');
let passwordRegax = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');
let ageRegax = new RegExp('^\S[0-9]{0,3}$');

let inputs = $(".contact .row input");
let paraError = $(".contact .row p");
inputs.keyup(function () {
    let flag = false;
    if (!$(inputs[0]).val() === "") {
        if (nameRegax.test($(inputs[0]).val())) {

            $(inputs[0]).replaceClass("border-danger", "border-success");
            if (!$(paraError[0]).hasClass(`d-none`)) {
                $(paraError[0]).addClass("d-none");
            }

        }
        else {
            $(inputs[0]).addClass("border-danger");
            $(paraError[0]).removeClass("d-none");
        }
    }
    if (!$(inputs[1]).val() === "") {
        if (emailRegax.test($(inputs[1]).val())) {

            $(inputs[1]).replaceClass("border-danger", "border-success");
            if (!$(paraError[1]).hasClass(`d-none`)) {
                $(paraError[1]).addClass("d-none");
            }

        }
        else {
            $(inputs[1]).addClass("border-danger");
            if ($(paraError[1]).hasClass(`d-none`)) {
                $(paraError[1]).removeClass("d-none");
            }
        }
    }


    if (!$(inputs[2]).val() === "") {

        if (phoneRegax.test($(inputs[2]).val())) {

            $(inputs[2]).replaceClass("border-danger", "border-success");
            if (!$(paraError[2]).hasClass(`d-none`)) {
                $(paraError[2]).addClass("d-none");
            }

        }
        else {
            $(inputs[2]).addClass("border-danger");
            if ($(paraError[2]).hasClass(`d-none`)) {
                $(paraError[2]).removeClass("d-none");
            }
        }
    }

    if (!$(inputs[3]).val() === "") {

        if (ageRegax.test($(inputs[3]).val())) {

            $(inputs[3]).replaceClass("border-danger", "border-success");
            if (!$(paraError[3]).hasClass(`d-none`)) {
                $(paraError[3]).addClass("d-none");
            }

        }
        else {
            $(inputs[3]).addClass("border-danger");
            if ($(paraError[3]).hasClass(`d-none`)) {
                $(paraError[3]).removeClass("d-none");
            }
        }
    }

    if (!$(inputs[4]).val() === "") {

        if (passwordRegax.test($(inputs[4]).val())) {

            $(inputs[4]).replaceClass("border-danger", "border-success");
            if (!$(paraError[4]).hasClass(`d-none`)) {
                $(paraError[4]).addClass("d-none");
            }

        }
        else {
            $(inputs[4]).addClass("border-danger");
            if ($(paraError[4]).hasClass(`d-none`)) {
                $(paraError[4]).removeClass("d-none");
            }
        }
    }
    if (!$(inputs[5]).val() === "") {

        if ($(inputs[4]).val() === $(inputs[5]).val()) {

            $(inputs[5]).replaceClass("border-danger", "border-success");
            if (!$(paraError[5]).hasClass(`d-none`)) {
                $(paraError[5]).addClass("d-none");
            }

        }

        else {
            $(inputs[5]).addClass("border-danger");
            if ($(paraError[5]).hasClass(`d-none`)) {
                $(paraError[5]).removeClass("d-none");
            }
        }


    }

})















