// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3TGCqkSYIgtxPhBD7_SopmTflQ2cxsDQ",
  authDomain: "blood-786.firebaseapp.com",
  databaseURL: "https://blood-786.firebaseio.com",
  projectId: "blood-786",
  storageBucket: "blood-786.appspot.com",
  messagingSenderId: "183850430417"
};

firebase.initializeApp(config);

function img(id) {
  document.getElementById("img").setAttribute("src", id)
}

function signup() {
  var pass = document.getElementById("password").value;
  var number = document.getElementById("number").value;
  if (pass.length < 8) {
    document.getElementById("error").style.display = 'block';
  }
  else {
    document.getElementById("error").style.display = 'none';
    if (number.length != 11) {
      document.getElementById("error2").style.display = 'block';
    }
    else {
      document.getElementById("error2").style.display = 'none';
      signupCode();
    }
  }
}

function signupCode() {
  document.getElementById("p2").style.display = 'block';
  if (document.getElementById("o+").checked) {
    var bloodGroup = "O+";
  }
  else if (document.getElementById("o-").checked) {
    var bloodGroup = "O-";
  }
  else if (document.getElementById("a+").checked) {
    var bloodGroup = "A+";
  }
  else if (document.getElementById("a-").checked) {
    var bloodGroup = "A-";
  }
  else if (document.getElementById("b+").checked) {
    var bloodGroup = "B+";
  }
  else if (document.getElementById("a-").checked) {
    var bloodGroup = "B-";
  }
  else if (document.getElementById("ab+").checked) {
    var bloodGroup = "AB+";
  }
  else if (document.getElementById("ab-").checked) {
    var bloodGroup = "AB-";
  }
  var name = document.getElementById("name").value;
  name = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var number = document.getElementById("number").value;
  var e = document.getElementById("gender");
  var gender = e.options[e.selectedIndex].value;
  var type = 'User';
  var profilePic = document.getElementById("profilePic").files[0];
  var userObj = {
    name,
    email,
    password,
    age,
    number,
    bloodGroup,
    address,
    gender,
    type,
  }

  console.log(userObj);
  var counter = 0;
  setInterval(function () {
    if (counter == 0) {
      document.getElementById("p2").style.cssFloat = 'left';
      document.getElementById("p2").style.width = '40%';
      counter++;
    }
    else if (counter == 1) {
      document.getElementById("p2").style.width = '0';
      counter++;
    }
    else if (counter == 2) {
      document.getElementById("p2").style.cssFloat = 'right';
      document.getElementById("p2").style.width = '100%';
      counter++;
    }
    else if (counter == 3) {
      document.getElementById("p2").style.width = '0';
      counter++;
    }
    else if (counter == 4) {
      document.getElementById("p2").style.cssFloat = 'left';
      document.getElementById("p2").style.width = '100%';
      counter++;
    }
    else if (counter == 5) {
      document.getElementById("p2").style.width = '0';
      counter++;
    }
    else if (counter === 6) {
      document.getElementById("p2").style.cssFloat = 'right';
      document.getElementById("p2").style.width = '40%';
      counter++;
    }
    else if (counter === 7) {
      document.getElementById("p2").style.width = '0';
      counter = 0;
    }
  }, 400);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      let userUid = firebase.auth().currentUser.uid;
      firebase.storage().ref().child(`profile/${profilePic.name}`).put(profilePic).then((url) => {
        url.ref.getDownloadURL().then((success) => {
          userObj.profilePic = success;

          firebase.database().ref("users/" + userUid).set(userObj)
            .then(() => {
              document.getElementById("p2").style.display = 'none';
              swal({
                type: 'success',
                title: 'Congratulations!',
                text: 'Your Account Created Successfully!',
                confirmButtonText: "Go Login!",
                confirmButtonColor: "#fa7c6e"
              }).then((result) => {
                if (result.value) {
                  location = 'login.html';
                }
                else {
                  location = 'login.html';
                }
              })

            })
            .catch((error) => {
              document.getElementById("p2").style.display = 'none';
              swal({
                type: 'error',
                title: 'Something went wrong!',
                text: error.message,
                confirmButtonColor: "#fa7c6e"
              })
            })
        }).catch((error) => {
          swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
          })
        })
      }).catch((error) => {
        swal({
          type: 'error',
          title: 'Something went wrong!',
          text: error.message,
          confirmButtonColor: "#fa7c6e"
        })
      })
    })
    .catch((error) => {
      document.getElementById("p2").style.display = 'none';
      swal({
        type: 'error',
        title: 'Something went wrong!',
        text: error.message,
        confirmButtonColor: "#fa7c6e"
      })
    })
}

function login() {
  document.getElementById("p2").style.display = 'block';
  var counter = 0;
  setInterval(function () {
    if (counter == 0) {
      document.getElementById("p2").style.cssFloat = 'left';
      document.getElementById("p2").style.width = '40%';
      counter++;
    }
    else if (counter == 1) {
      document.getElementById("p2").style.width = '0';
      counter++;
    }
    else if (counter == 2) {
      document.getElementById("p2").style.cssFloat = 'right';
      document.getElementById("p2").style.width = '100%';
      counter++;
    }
    else if (counter == 3) {
      document.getElementById("p2").style.width = '0';
      counter++;
    }
    else if (counter == 4) {
      document.getElementById("p2").style.cssFloat = 'left';
      document.getElementById("p2").style.width = '100%';
      counter++;
    }
    else if (counter == 5) {
      document.getElementById("p2").style.width = '0';
      counter++;
    }
    else if (counter === 6) {
      document.getElementById("p2").style.cssFloat = 'right';
      document.getElementById("p2").style.width = '40%';
      counter++;
    }
    else if (counter === 7) {
      document.getElementById("p2").style.width = '0';
      counter = 0;
    }
  }, 400);
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      let user = firebase.auth().currentUser.uid;
      firebase.database().ref("users/" + user).once("value").then((data) => {
        const dataType = data.val();
        console.log(dataType)
        if (dataType.type === "User") {
          location = 'panel.html'
        }
        else if (dataType.type === "Donor") {
          location = 'donor.html'
        }
        else if (dataType.type === "Acceptor") {
          location = 'acceptor.html'
        }
      })
    })
    .catch((error) => {
      document.getElementById("p2").style.display = 'none';
      swal({
        type: 'error',
        title: 'Something went wrong!',
        text: error.message,
        confirmButtonColor: "#fa7c6e"
      })
    })
}
