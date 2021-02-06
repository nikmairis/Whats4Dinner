$(document).ready(function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const testRef = firebase.database().ref().child(urlParams.get("user")).child(urlParams.get("recipeId"));
  console.log(urlParams.get("user"))
  console.log(urlParams.get("recipeId"))
  console.log("Hola bitches!")
  testRef.once('value', snap =>{
    var recipe = snap.val();
    const recipeList = document.getElementById("recipe-block");

    const colDiv = document.createElement("div");
    colDiv.className = "mt-4";
    colDiv.id = "recipe-" + snap.key;
    colDiv.style.display = "inline-block";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card recipe-card h-100";

    const imageLink = document.createElement("a");
    imageLink.href = "#";

    const imageEl = document.createElement("img");
    imageEl.className = "card-img-top";
    imageEl.src = recipe.imageUrl;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";

    const cardTitleLink = document.createElement("a");
    cardTitleLink.href = "#";
    cardTitleLink.innerText = recipe.title;

    const cardPriceTitle = document.createElement("h5");
    cardPriceTitle.innerText = recipe.costs;

    var cardDescription = document.createElement("p");
    cardDescription.className = "card-text";
    cardDescription.innerText = recipe.description;

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    const cardFooterText = document.createElement("small");
    cardFooterText.className = "text-muted";
    cardFooterText.innerText = snap.val().kcal + " Kcal";


    imageLink.append(imageEl);
    cardDiv.append(imageLink);
    cardTitle.append(cardTitleLink);
    cardBody.append(cardTitle);
    cardBody.append(cardPriceTitle);
    cardBody.append(cardDescription)
    cardDiv.append(cardBody);
    cardFooter.append(cardFooterText);
    cardDiv.append(cardFooter);
    colDiv.append(cardDiv);
    recipeList.append(colDiv);
  })
})
