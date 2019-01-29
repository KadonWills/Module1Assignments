// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcoByj_EQjgL0UeZasvDdvXwAvr8qgXz8",
    authDomain: "ddrive-786.firebaseapp.com",
    databaseURL: "https://ddrive-786.firebaseio.com",
    projectId: "ddrive-786",
    storageBucket: "",
    messagingSenderId: "153505042014"
};
firebase.initializeApp(config);

var topSide = 0;
var bottomSide = 0;
var coSide = 0;
setInterval(function () {
    topSide++;
    bottomSide++;
    coSide++;
    if (topSide == 1) {
        document.getElementById("top").style.width = '60%';
        document.getElementById("topR").style.width = '50%';
    }
    if (bottomSide == 2) {
        document.getElementById("bottom").style.width = '60%';
        document.getElementById("bottomR").style.width = '50%';
    }
    if (coSide == 3) {
        document.getElementById("co").style.width = '50%';
        document.getElementById("coR").style.width = '50%';
    }
    if (topSide === 5) {
        document.getElementById("top").style.width = '0';
        document.getElementById("bottom").style.width = '0';
        document.getElementById("co").style.width = '0';
        document.getElementById("topR").style.width = '0';
        document.getElementById("bottomR").style.width = '0';
        document.getElementById("coR").style.width = '0';
        topSide = 0;
        bottomSide = 0;
        coSide = 0;
    }
}, "500")
// console.log(topSide)
function signup() {
    var pass = document.getElementById("password").value;
    if (Number(pass.length) > 7) {
        document.getElementById("loader").style.display = 'block'
        signupCode();
    }
    else {
        document.getElementById("passerror").style.display = 'block';
        document.getElementById("password").focus();
    }
}
function signupCode() {
    document.getElementById("passerror").style.display = 'none';
    var name = document.getElementById("fname").value;
    var adjustedName = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var comment = document.getElementById("comment").value;
    if (comment === "Your Bio (Optional)") {
        comment = "New Here!"
    }
    var type = "User"
    if (document.getElementById('radio1').checked) {
        var gender = "Male";
    }
    else if (document.getElementById("radio2").checked) {
        var gender = "Female";
    }
    var userInfo = {
        adjustedName,
        email,
        password,
        gender,
        comment,
        type,
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref("users/" + userId).set(userInfo).then(() => {
                swal({
                    type: 'success',
                    title: 'Congratulations!',
                    text: 'Your Account Created Successfully!'
                })
                document.getElementById("loader").style.display = 'none'
                document.getElementById("fname").value = '';
                document.getElementById("email").value = '';
                document.getElementById("password").value = '';
                document.getElementById('radio1').checked;
                document.getElementById("comment").value = 'Your Bio (Optional)'
                document.getElementById("signupToggle").click();
                document.getElementById("loginToggle").click();
            })
        })
        .catch((error) => {
            document.getElementById("loader").style.display = 'none'
            swal({
                type: 'error',
                title: 'Something Went Wrong!',
                text: error.message,
            })
        })
}
function login() {
    var email = document.getElementById("Lemail").value;
    var pass = document.getElementById("Lpass").value;
    document.getElementById("loaderlogin").style.display = 'block';
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(() => {
            let user = firebase.auth().currentUser.uid;
            console.log(user)
            firebase.database().ref("users/" + user).once("value").then((data) => {
                const userType = data.val();
                console.log(userType)
                if (userType.type === "User") {
                    location = './panel.html'
                    console.log(userType.type)
                }
                else if (userType.type == 'Admin') {
                    location = './admin.html'
                    console.log(userType.type)
                }
            }).catch((error) => {
                console.log(error.message);
                firebase.auth().currentUser.delete().then(() => {
                    document.getElementById("loaderlogin").style.display = 'none';
                    swal({
                        type: 'error',
                        title: 'Your Account has been deleted!',
                        text: "Make New Account to Access!",
                    })
                });
            })
        }).catch((error) => {
            document.getElementById("loaderlogin").style.display = 'none';
            swal({
                type: 'error',
                title: 'Something Went Wrong!',
                text: error.message,
            })
        })
}
