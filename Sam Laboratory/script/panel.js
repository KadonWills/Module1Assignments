var config = {
    apiKey: "AIzaSyC3TGCqkSYIgtxPhBD7_SopmTflQ2cxsDQ",
    authDomain: "blood-786.firebaseapp.com",
    databaseURL: "https://blood-786.firebaseio.com",
    projectId: "blood-786",
    storageBucket: "blood-786.appspot.com",
    messagingSenderId: "183850430417"
};

firebase.initializeApp(config);

window.addEventListener("load", async function loader() {
    await load();
})

async function load() {
    await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            console.log(userId)
            firebase.database().ref("users/").once("value").then((data) => {
                const filterData = data.val();
                var tUsers = 0;
                var tDonors = 0;
                var tAcceptors = 0;
                for (var key in filterData) {
                    if (filterData[key].type == "User") {
                        tUsers++;
                    }
                    else if (filterData[key].type === "Donor") {
                        tDonors++;
                    }
                    else if (filterData[key].type === "Acceptor") {
                        tAcceptors++;
                    }
                }
                console.log("Users", tUsers)
                console.log("Donors", tDonors)
                console.log("acceptors", tAcceptors)
                document.getElementById("tDonors").innerHTML = "Total <br /> " + tDonors;
                document.getElementById("tAcceptors").innerHTML = "Total <br /> " + tAcceptors;
                document.getElementById("tUsers").innerHTML = "Total <br /> " + tUsers;
            })
        }
        else {
            // Logout
        }
    })
}
function registerDonor() {
    document.getElementById("loaderDonor").style.display = 'block';
    let user = firebase.auth().currentUser.uid;
    firebase.database().ref("users/" + user).once("value").then((data) => {
        const userData = data.val();
        let post = document.getElementById("donorPost").value;
        let flag = "false";
        userData.type = "Donor";
        console.log(userData)
        firebase.database().ref("users/" + user).set(userData);
        userData.post = post;
        userData.flag = flag;
        console.log(userData)
        firebase.database().ref("donors/" + user).set(userData)
            .then(() => {
                location = './donor.html'
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
    }).catch((error) => {
        document.getElementById("loaderDonor").style.display = 'none';
        swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
        })
    })
}

function registerAcceptor() {
    let user = firebase.auth().currentUser.uid;
    document.getElementById("loaderAcceptor").style.display = 'block';
    firebase.database().ref("users/" + user).once("value").then((data) => {
        const userData = data.val();
        let post = document.getElementById("acceptorPost").value;
        let flag = "false";
        userData.type = "Acceptor";
        console.log(userData)
        firebase.database().ref("users/" + user).set(userData);
        userData.post = post;
        userData.flag = flag;
        firebase.database().ref("acceptors/" + user).set(userData)
            .then(() => {
                location = './acceptor.html'
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
    }).catch((error) => {
        document.getElementById("loaderAcceptor").style.display = 'none';
        swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
        })
    })
}
function logout() {
    firebase.auth().signOut().then(() => {
        location = './login.html';
    })
        .catch((error) => {
            swal({
                type: 'error',
                title: 'Something went wrong!',
                text: error.message,
                confirmButtonColor: "#fa7c6e"
            })
        })
}
