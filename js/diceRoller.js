var recipes = [];
firebase.auth().onAuthStateChanged( function(user) {
  if (user) {
    const testRef = firebase.database().ref().child(user.uid);
    testRef.on('child_added', snap =>{
      recipes.push(snap.key);
    })
    $("#rollBtn").prop('disabled', false);
  }
});

function rollTheDice(){
  const recipeLink = document.getElementById("recipeLink");
  const dataRef = firebase.database().ref().child(firebase.auth().currentUser.uid);
  dataRef.once('value', snap => {
    if(recipes.length > 0){
      var rand = Math.floor((Math.random() * recipes.length));
      var randId = recipes[rand];
      Scrambler({
        target: '#target',
        random: [1000, 2000],
        speed: 70,
        text: snap.val()[randId].title
      });
      recipeLink.href = "info.html?user=" + firebase.auth().currentUser.uid + "&recipeId=" + randId;
    }else{
      Scrambler({
        target: '#target',
        random: [1000, 2000],
        speed: 70,
        text: "You have no recipes added"
      });
    }
  })
}
