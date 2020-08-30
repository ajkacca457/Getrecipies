const search=document.querySelector("#mealsearch");
const searchbtn=document.getElementById('submit');
const suggestion=document.getElementById('random');

const title=document.querySelector("#mealtitle");
const meals=document.querySelector("#allmeals");
const mealdes=document.querySelector("#mealdes");


function findmeal(e){
const mealsearch=search.value;
mealdes.style.display="none";
if(mealsearch.trim()) {
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealsearch}`)
.then(function(res) {
  return res.json();
})
.then(function(data){
title.innerHTML= `<h2>The results for ${mealsearch} are:</h2>`

if(data.meals===null) {
  title.innerHTML= `<h2>There are no results for ${mealsearch}</h2>`
  meals.innerHTML="";

}
else {
  meals.innerHTML=data.meals.map(function(meal) {
    return `<div id="mealresult" class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="mealinfo" data-mealID="${meal.idMeal}">
      <h3>${meal.strMeal}</h3>
       </div>
    </div>`
  })
  .join("");

  search.value="";
}

})
}
else {
  alert("please insert a food name");
}

e.preventDefault();
}

function getmealbyID(mealid){

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
  .then(res => res.json())
  .then(data=> {
      const meal=data.meals[0];
      addtoDom(meal);
      console.log(meal);
    });
    }

function addtoDom(meal){
mealdes.style.display="block";
mealdes.innerHTML= `
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>How to make</h3>
    <p>${meal.strInstructions}</p>
`
}

function randommeal() {
title.innerHTML="";
meals.innerHTML="";
mealdes.style.marginTop="10px";
fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data=> {
      const meal=data.meals[0];
      addtoDom(meal);
      console.log(meal);
    });

}


searchbtn.addEventListener("click",findmeal);
suggestion.addEventListener("click",randommeal);
meals.addEventListener("click",function(e){
  const mealinfo= e.path.find(item=>{
     if(item.classList){
      return item.classList.contains("meal");
    }
    else {
      return false;
    }
  });

if(mealinfo.children[1]) {
  const mealid=mealinfo.children[1].getAttribute("data-mealid");
  getmealbyID(mealid);
}
})
