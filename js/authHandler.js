// Firebase user's data
var firebaseConfig = {
    apiKey: "AIzaSyDXI-fDJxmYamydDW4cvupL2_-4vNKqar8",
    authDomain: "whats4dinner-1ec9e.firebaseapp.com",
    projectId: "whats4dinner-1ec9e",
    storageBucket: "whats4dinner-1ec9e.appspot.com",
    messagingSenderId: "978847517123",
    appId: "1:978847517123:web:a27ed7fa21e2f18d03d576",
    measurementId: "G-CQ17YSL92G"
  };
//whats4dinnerdb@gmail.com
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//Creates the firebase auth object for handling authorisation
const auth = firebase.auth();

// handles new user registration
function signUp(){
  //create references to all the input fields
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var repeatPassword = document.getElementById("passwordRepeat");
  // input validation
      if(password.value === repeatPassword.value){
        //Attempts to create a user with given data
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(function createInfo(){
          //if user created, create a object for the current user
          var user = firebase.auth().currentUser;
          //gets current users UID
          var usersId = user.uid;
          //Creates a database reference for the user
          const dataRef = firebase.database().ref().child(usersId);
          //Writes user's data to the database
          dataRef.once('value', snap => {
            dataRef.set({
              test: "test"
            })
            window.location = "main.html";
          })
        });
        promise.catch(e => {
          $("#modalTitle").text("Error!")
          $("#modalText").text(e)
          $('#myModal').modal('show');
        });
      }else{
        $("#modalTitle").text("Error!")
        $("#modalText").text("The passwords do not match!")
        $('#myModal').modal('show');
      }
}

// Handles signing in
function signIn(){
  // Creating reference to the input fields
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  // Sends a login request with given parameters
  const promise = auth.signInWithEmailAndPassword(email.value, password.value).then(function readData(){
  window.location = "html/main.html";
  });
  // Error handling
  promise.catch(e => alert(e.message));
}

function resetPassword(){
  var email = document.getElementById("email");
  auth.sendPasswordResetEmail(email.value).then(function() {
    $("#modalTitle").text("Success!")
    $("#modalText").text("Password reset email has been sent!")
    $('#myModal').modal('show');
  }).catch(function(error) {
    $("#modalTitle").text("Error!")
    $("#modalText").text(error)
    $('#myModal').modal('show');
  });
}

// Handles signing out
function signOut(){
  auth.signOut();
  window.location = "../index.html";
}
