var uid;
firebase.auth().onAuthStateChanged( function(user) {
  if (user) {
    uid = firebase.auth().currentUser.uid;
    childAdded();
  }
});


function createRecipe(){
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const kcalInput = document.getElementById("kcal");
  const costInput = document.getElementById("costs");
  if(titleInput.value !== "" && descriptionInput.value !== "" && kcalInput.value !== "" && costInput.value !== ""){
    //Creates a database reference for the user
    const dataRef = firebase.database().ref().child(firebase.auth().currentUser.uid);
    dataRef.once('value', snap => {
      dataRef.push({
        title: titleInput.value,
        description: descriptionInput.value,
        kcal: kcalInput.value,
        costs: costInput.value
      });
      titleInput.value = "";
      descriptionInput.value = "";
      kcalInput.value = "";
      costs.value = "";
    })
  }else{
    $("#modalTitle").text("Error!")
    $("#modalText").text("Please fill in all the fields!")
    $('#myModal').modal('show');
  }
}

function childAdded(){
  const testRef = firebase.database().ref().child(uid);
  testRef.on('child_added', snap =>{
    var recipe = snap.val();
    const recipeList = document.getElementById("recipe-list");

    const colDiv = document.createElement("div");
    colDiv.className = "col-lg-2 mb-4";
    colDiv.id = "recipe-" + snap.key;

    const cardDiv = document.createElement("div");
    cardDiv.className = "card recipe-card h-100";

    const imageLink = document.createElement("a");
    imageLink.href = "#";

    const imageEl = document.createElement("img");
    imageEl.className = "card-img-top";
    imageEl.src = "http://placehold.it/700x400";

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
    cardDescription = recipeDescriptionParser(recipe.description, cardDescription);

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
}

function recipeDescriptionParser(text, el){
  if(text.length >= 80){
    el.innerText = text.substr(0,80) + "...";
    el.style.backgroundImage = "linear-gradient(180deg,#000000 0%,rgba(0,0,0,0))";
    el.style.webkitBackgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
    el.style.minHeight = "80px";
    el.style.maxHeight = "100px";
  }else{
    el.innerText = text;
  }
  return el
}
