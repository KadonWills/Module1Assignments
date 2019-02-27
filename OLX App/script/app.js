 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD5JIYhq8f9vlcC45HhF1uQHF3rbiZZnXo",
    authDomain: "olx-hackathon-19.firebaseapp.com",
    databaseURL: "https://olx-hackathon-19.firebaseio.com",
    projectId: "olx-hackathon-19",
    storageBucket: "olx-hackathon-19.appspot.com",
    messagingSenderId: "275237670184"
  };
  firebase.initializeApp(config);
  
  function login() {
    document.getElementById("loader").style.display = 'block';
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        location = '../html/panel.html'
      })
      .catch((error) => {
        document.getElementById("loader").style.display = 'none';
        swal({
          type: 'error',
          title: 'Something went wrong!',
          text: error.message,
          confirmButtonColor: "#5cb85c"
        })
      })
  }

  function signup() {
    var pass = document.getElementById("password").value;
    if (pass.length < 8) {
      document.getElementById("error").style.display = 'block';
    }
    else {
      document.getElementById("error").style.display = 'none';
      signupCode()
    }
  }
  
  function signupCode() {
    document.getElementById("loader").style.display = 'block';

    var name = document.getElementById("name").value;
    name = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var profilePic = document.getElementById("profilePic").files[0];
    var userObj = {
      name,
      email,
    }
  
    console.log(userObj);
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        let userUid = firebase.auth().currentUser.uid;
        firebase.storage().ref().child(`profile/${profilePic.name}`).put(profilePic).then((url) => {
          url.ref.getDownloadURL().then((success) => {
            userObj.profilePic = success;
  
            firebase.database().ref("users/" + userUid).set(userObj)
              .then(() => {
                document.getElementById("loader").style.display = 'none';
                swal({
                  type: 'success',
                  title: 'Congratulations!',
                  text: 'Your Account Created Successfully!',
                  confirmButtonText: "Ok!",
                  confirmButtonColor: "#fa7c6e"
                }).then((result) => {
                  if (result.value) {
                    location = '../html/panel.html';
                  }
                  else {
                    location = '../html/panel.html';
                  }
                })
  
              })
              .catch((error) => {
                document.getElementById("loader").style.display = 'none';
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
        document.getElementById("loader").style.display = 'none';
        swal({
          type: 'error',
          title: 'Something went wrong!',
          text: error.message,
          confirmButtonColor: "#fa7c6e"
        })
      })
  }
  