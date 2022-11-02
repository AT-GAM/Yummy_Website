/* list 
** Globel Variabels { linkApi , arrJasonAp i} 
** main code {hide waiting layer , navbar animation  }
**navBar links event { go home , go search , go ingredient  ,contact} 
** serch function and check the input value 
** functions switch from section to anothe 
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
    $("nav .appear img").click(goHome);
    $("#Search").click(goSearch);
    $("#Category").click(goCategories);
    $("#Area").click(goArea);
    $("#ingredients").click(goIngredient);
    $("#Contact").click(goContact);

    //search events
    let pSearchErr = $(".search p");

    $("div.row.search #searchByLetter").keyup(function () {
        this.maxLength = 1;
        if (this.value == "") {
            $(pSearchErr[1]).addClass("d-none");
            $(this).removeClass("is-invalid");
        }
        else {
            if (checkSeachInputValue(this.value)) {
                searchByletter($(this).val());
                $(pSearchErr[1]).addClass("d-none");
                $(this).removeClass("is-invalid");
            }
            else {
                $(pSearchErr[1]).removeClass("d-none");
                $(this).addClass("is-invalid");
            }
        }
    })

    $(" div.row.search #searchByName").keyup(function () {
        if (this.value == "") {
            $(pSearchErr[0]).addClass("d-none");
            $(this).removeClass("is-invalid");
        }
        else {
            if (checkSeachInputValue(this.value)) {
                searchByName($(this).val());
                $(pSearchErr[0]).addClass("d-none");
                $(this).removeClass("is-invalid");
            }
            else {
                $(pSearchErr[0]).removeClass("d-none");
                $(this).addClass("is-invalid");
            }
        }
    })





    // this function will be used to check the search input value
    function checkSeachInputValue(valueInput) {
        return /^[a-zA-Z| ]{1,}$/.test(valueInput);
    }










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
** get api by category
** get api by ingrediant
** get api by areaa
** get api by meal
** display food cards
** display ingrediants
** display Area
** display categries
** display meal  
** get meal by ingredents 
** nav bar function
** search function
** contact validation check and inputs events*/
// globel variabels for functions 
const foodItemsDiv = document.querySelector('section.container.mainPage .row.mainShow');
function getApiArr(linkApi, displayFunction) {
    $(".waitingLayerApi").show(0, function () {

        $(this).removeClass("d-none");

    })
    fetch(linkApi)
        .then((response) => response.json())
        .then((data) => arrJasonApi = data).then(displayFunction);
    $(".waitingLayerApi").fadeOut(1500, function () {

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
        foodItemsDiv.innerHTML =
         `<div style="color:${(flagButton)? "white;" : "black;"}" class="col-md-4 imagePart col-sm-12  text-center " >
            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}  ">
            <h2>   ${meal.strMeal}            </h2>

        </div>
        <div style="color:${(flagButton)? "white;" : "black;"} "class="col-md-8 desckPart col-sm-12 " >
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
             <p><span  class="fw-bold" >Area : </span>${meal.strArea}</p>  
             <p><span  class="fw-bold" >Category : </span>${meal.strCategory}</p>
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
        <div style="color:${(flagButton)? "white;" : "black;"}" class="col-lg-3  col-md-4 col-sm-6 ">
        <figure onclick="getMeal(${meal.idMeal})" class="figure position-relative shadow  overflow-hidden    ">
            <img src="${meal.strMealThumb}" class="figure-img img-fluid rounded-4  m-0" alt="${meal.strMeal}">
            <figcaption style=" color:${(flagButton)? "balck;" : "white;" } background-color: ${(flagButton)? "rgba(255, 255, 255,0.6);" : "rgba(0, 0, 0,0.6);" } " class="figure-caption rounded-4  bg-opacity-50 fa-2x  d-flex align-items-center  "><h4>${meal.strMeal}</h4></figcaption>
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
        <div style="color:${(flagButton)? "white;" : "black;"}" class="col-lg-3  col-md-4 col-sm-6 ">
        <figure onclick="getCategory('${Category.strCategory}')" class="figure position-relative shadow  overflow-hidden    ">
            <img src="${Category.strCategoryThumb}" class="figure-img img-fluid rounded rounded-4 m-0" alt="${Category.strCategory}">

            <figcaption style=" color:${(flagButton)? "balck;" : "white;" } background-color: ${(flagButton)? "rgba(255, 255, 255,0.6);" : "rgba(0, 0, 0,0.6);" } " class="figure-caption  bg-opacity-50 rounded-4  text-center fa-1x  ">
            <h4>${Category.strCategory}</h4>
            <p class="w-100">${Category.strCategoryDescription.split(" ").slice(0, 20).join(" ")}....</p>
            
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


    for (let i = 0; i < 21; i++) {
        const foodDiv = `
            
        <div style="color:${(flagButton)? "white;" : "black;"}" class="col-sm-6  overflow-hidden text-center col-lg-3  my-3 ">
        <div style="height:300px "  onclick="getByIngredient('${arrJasonApi.meals[i].strIngredient}')" class="  position-relative">
            <div class="post ">
            <div style="width:100px ; height:100px" class="rounded rounded-circle m-auto justify-content-center align-items-center d-flex border border-2 border-warning ">
                <i class="fa-solid text-warning  fa-utensils mt-2 fa-3x"></i></div>
                <h2 class="">${arrJasonApi.meals[i].strIngredient}</h2>
                <p class="">${(arrJasonApi.meals[i].strDescription) ? `${arrJasonApi.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}` : ""}.....  </p>
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
        // border: 3px solid ${(flagButton)? "white;" : "black;"}
        const foodDiv = `
            
    
    <div  style="color:${(flagButton)? "white;" : "black;"} "  class="col-sm-6 text-center col-lg-3  my-3">
            <div  style="height:250px;" onclick="getByArea('${meal.strArea}')"  class=" shadow rounded-4 d-flex justify-content-center align-items-center  cardArea   py-3 ">
                <div  class="post ">
            <div style="width:100px ; height:100px" class="rounded rounded-circle m-auto justify-content-center align-items-center d-flex border border-2 border-info ">
                    <i class=" fa-solid fa-earth-africa text-info   fa-3x"></i></div>
                    <h2 class="">${meal.strArea}</h2>
                </div>
            </div>
        </div>  
            `;
        collection += foodDiv;
    };
    foodItemsDiv.innerHTML = collection;


}
/* function for nav bar */

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
const nameRegax = /^[a-zA-Z ]{3,30}$/;
const emailRegax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegax = /^(01|201|\+201)[0125][0-9]{8}$/;
const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const ageRegax = /^([1-9]|[1-9][0-9]|100)$/;


let inputs = $(".contact .row input");
inputs[2].maxLength="11";
let paraError = $(".contact .row p");
$(".contact").keyup(function () {
    $(inputs[0]).focusout(
        function () {
            this.type = "text";
            if (!$(inputs[0]).val() == "") {
                checkNameInput();
            }
        })


    $(inputs[1]).focusout(function () {
        if (!$(inputs[1]).val() == "") {
            this.type = "email";
            checkEmailInput();
        }
    })

    $(inputs[2]).focusout(function () {        
        if (!$(inputs[2]).val() == "") {
            checkPhoneInput();
        }
    })

    $(inputs[3]).focusout(function () {
        this.type = "number";
        if (!$(inputs[3]).val() == "") {
            checkAgeInput();
        }
    })

    $(inputs[4]).keyup(function () {
        this.type = "password";


        if (!$(inputs[4]).val() == "") {
            checkPasswordInput();
        }
    })

    $(inputs[5]).keyup(function () {
        this.type = "password";

        if (!$(inputs[5]).val() == "") {
            checkRepasswordInput();
        }
    })




    let submitButton =
        $("button.btn.Submit.btn-outline-danger");


    if (submitButton.hasClass("disabled") && chechEmpty()) {
        if (checkSubmitButton()) {
            submitButton.removeClass("disabled");
        }

        else {
            submitButton.addClass("disabled")


        }
    }


})
function chechEmpty() {

    return (!$(inputs[0]).val() == "" && !$(inputs[1]).val() == "" && !$(inputs[2]).val() == "" && !$(inputs[3]).val() == "" && !$(inputs[4]).val() == "" && !$(inputs[5]).val() == "")
}
function checkSubmitButton() {
    return (checkAgeInput() && checkEmailInput() && checkNameInput() && checkPasswordInput() && checkPhoneInput() && checkRepasswordInput())
}



// validation check
function checkNameInput() {
    if (nameRegax.test($(inputs[0]).val())) {

        $(inputs[0]).removeClass("is-invalid");
        $(inputs[0]).addClass("is-valid");
        if (!$(paraError[0]).hasClass(`d-none`)) {
            $(paraError[0]).addClass("d-none");
        }
        return true;

    }
    else {
        $(inputs[0]).addClass("is-invalid");
        $(paraError[0]).removeClass("d-none");
    }
    return false;



}

function checkEmailInput() {
    if (emailRegax.test($(inputs[1]).val())) {
        $(inputs[1]).removeClass("is-invalid");
        $(inputs[1]).addClass("is-valid");
        if (!$(paraError[1]).hasClass(`d-none`)) {
            $(paraError[1]).addClass("d-none");
        }
        return true;

    }
    else {
        $(inputs[1]).addClass("is-invalid");
        if ($(paraError[1]).hasClass(`d-none`)) {
            $(paraError[1]).removeClass("d-none");
        }
        return false;
    }


}
function checkPhoneInput() {

    if (phoneRegax.test($(inputs[2]).val())) {

        $(inputs[2]).removeClass("is-invalid")
        $(inputs[2]).addClass("is-valid");
        if (!$(paraError[2]).hasClass(`d-none`)) {
            $(paraError[2]).addClass("d-none");
        }
        return true;

    }
    else {
        $(inputs[2]).addClass("is-invalid");
        if ($(paraError[2]).hasClass(`d-none`)) {
            $(paraError[2]).removeClass("d-none");
        }
        return false;
    }
}
function checkAgeInput() {
    if (ageRegax.test($(inputs[3]).val())) {

        $(inputs[3]).removeClass("is-invalid");
        $(inputs[3]).addClass("is-valid");
        if (!$(paraError[3]).hasClass(`d-none`)) {
            $(paraError[3]).addClass("d-none");
        }
        return true;

    }
    else {
        $(inputs[3]).addClass("is-invalid");
        if ($(paraError[3]).hasClass(`d-none`)) {
            $(paraError[3]).removeClass("d-none");
        }
        return false;
    }
}
function checkPasswordInput() {
    if (passwordRegax.test($(inputs[4]).val())) {

        $(inputs[4]).removeClass("is-invalid");
        $(inputs[4]).addClass("is-valid");
        if (!$(paraError[4]).hasClass(`d-none`)) {
            $(paraError[4]).addClass("d-none");
        }
        return true;

    }
    else {
        $(inputs[4]).addClass("is-invalid");
        if ($(paraError[4]).hasClass(`d-none`)) {
            $(paraError[4]).removeClass("d-none");
        }
        return false;
    }

}
function checkRepasswordInput() {
    if ($(inputs[4]).val() == $(inputs[5]).val()) {

        $(inputs[5]).removeClass("is-invalid")
        $(inputs[5]).addClass("is-valid");
        if (!$(paraError[5]).hasClass(`d-none`)) {
            $(paraError[5]).addClass("d-none");
        }
        return true;

    }

    else {
        $(inputs[5]).addClass("is-invalid");
        if ($(paraError[5]).hasClass(`d-none`)) {
            $(paraError[5]).removeClass("d-none");
        }
        return false;
    }

}




/* -----------------------------------------light mode and night mode-------------------------------------------------- */

let flagButton = true;

$("#flexSwitchCheckChecked").click(function(){


if(flagButton){
    $("nav i").css("color","white");
    $(" nav .disappear").css("backgroundColor","white");
    $("nav .appear").css("backgroundColor","black");
    $("nav .appear ").css("color","white");
    $("nav ul a ,nav label ,nav p").css("color","black");
    $("nav label").html("light mode");
    $("nav .SocialIcons div").css("backgroundColor","black");
    $(".bachGroundlayer").css("backgroundColor"," rgba(255, 255, 255, .7)");
    $(".search input ,.contact input").css("backgroundColor"," black");
    $(".search input ,.contact input").css("color"," white");
    $(".contact h2").css("color"," black");
    $(".mainShow h2").css("color"," black");
    // $(".mainShow .cardArea").css("borderColor"," black");
    $(".mainShow .post").css("color"," black");
    $(".mainShow figcaption").css("backgroundColor"," rgba(0, 0, 0,0.6) ");
    $(".mainShow figcaption").css("color"," white");
    $(".imagePart").css("color","black");
    $(".desckPart").css("color","black");
    $("body").css("backgroundImage"," url( Images/istockphoto-1220584431-612x612.jpg)")
    flagButton=false;


}
else {
    $("nav i").css("color","black");
    $(" nav .disappear").css("backgroundColor","black");
    $("nav .appear").css("backgroundColor","white");
    $("nav .appear").css("color","black");
    $("nav ul a ,nav label ,nav p").css("color","white");
    $("nav label").html("Dark mode");
    $("nav .SocialIcons div").css("backgroundColor","white");
    $(".bachGroundlayer").css("backgroundColor"," rgba(0, 0, 0,0.7)")
    $(".search input ,.contact input").css("backgroundColor"," white");
    $(".search input ,.contact input").css("color"," black");
    $(".contact h2").css("color"," white");
    $(".mainShow h2").css("color"," white");
    // $(".mainShow .cardArea").css("borderColor"," white");
    $(".mainShow .post").css("color"," white");
    $(".mainShow figcaption").css("backgroundColor","rgba(255, 255, 255,0.6)");
    $(".mainShow figcaption").css("color"," black");
    $(".imagePart").css("color","white")
    $(".desckPart").css("color","white")
    $("body").css("backgroundImage"," url( Images/54088672-healthy-food-background-studio-photo-of-different-fruits-and-vegetables-on-white-wooden-table-high-r.webp)")
    flagButton=true;



}






})
