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

window.addEventListener("load", async function bodyLoading() {
    await load();
})
function editProfile() {
    const userUid = firebase.auth().currentUser.uid;
    var editedName = document.getElementById("editedName").value;
    var editedBio = document.getElementById("editedBio").value;
    // var editedGender = document.getElementById("editedGender").value;
    // editedGender = editedGender.slice(0, 1).toUpperCase() + editedGender.slice(1).toLowerCase();
    if (document.getElementById('radio1').checked) {
        var editedGender = "Male";
    }
    else if (document.getElementById("radio2").checked) {
        var editedGender = "Female";
    }
    firebase.database().ref("users/" + userUid).once("value").then((data) => {
        let userData = data.val();
        var editedObj = {
            adjustedName: editedName,
            comment: editedBio,
            email: userData.email,
            gender: editedGender,
            password: userData.password,
            type: userData.type,
        }
        firebase.database().ref("users/" + userUid).set(editedObj).then(() => {
            swal({
                type: 'success',
                title: 'Edited Successfully!',
                text: "Your Account has been updated successfully!"
            })
                .then((result) => {
                    if (result.value) {
                        location.reload();
                    }
                    else {
                        location.reload();
                    }
                })
        }).catch((error) => {
            swal({
                type: 'error',
                title: 'Something Went Wrong here!',
                text: error.message,
            })
        })
    })
}
function deleteProfile() {
    swal({
        title: 'Are you Sure?',
        text: "Once you delete your account you will no longer can access here!",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete it!',
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.value) {
            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref("users/" + userId).remove().then(() => {
                swal({
                    type: 'success',
                    title: 'Your account has been deleted!',
                    text: "Thanks for being part of us!"
                })
                    .then((result) => {
                        if (result.value) {
                            firebase.auth().signOut().then(() => {
                                location = './index.html'
                            })
                        }
                        else {
                            firebase.auth().signOut().then(() => {
                                location = './index.html'
                            })
                        }
                    })
            }).catch((error) => {
                swal({
                    type: 'error',
                    title: 'Could not delete your account!',
                    text: error.message,
                })
            })
        }
    })
}
async function load() {
    await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let userId = firebase.auth().currentUser.uid;
            firebase.database().ref("users/" + userId).once("value", (data) => {
                document.getElementById("loaderLoad").style.display = 'none';
                var dataObj = data.val();
                console.log(dataObj)
                var target = document.getElementById("account");
                var target2 = document.getElementById("profileContent");
                var imgTag = document.createElement("img");
                imgTag.setAttribute("src", './boy.png');
                imgTag.setAttribute("class", 'account');
                imgTag.setAttribute("id", "gProfile")
                imgTag.setAttribute("title", "Profile Pic")
                var p = document.createElement("p");
                p.setAttribute('id', 'userName');
                var pType = document.createElement("p");
                pType.setAttribute('id', 'usertype');
                pType.setAttribute("title", "Type")
                target.appendChild(imgTag)
                target.appendChild(p);
                target.appendChild(pType);
                var img2 = document.createElement("p");
                img2.setAttribute('class', "img2");
                var img2Tag = document.createElement("img");
                img2Tag.setAttribute("src", './boy.png');
                img2Tag.setAttribute("id", "gProfile2")
                img2Tag.setAttribute("title", "Profile Pic")
                img2.appendChild(img2Tag);
                target2.appendChild(img2);
                var userNameOnOverView = document.createElement("p");
                userNameOnOverView.setAttribute("id", 'userNameOnOverView');
                userNameOnOverView.setAttribute("title", 'User Name');
                target2.appendChild(userNameOnOverView);
                var userBioOverView = document.createElement("p");
                userBioOverView.setAttribute("id", 'userBioOverView');
                userBioOverView.setAttribute("title", 'Bio');
                target2.appendChild(userBioOverView);
                var userDetailsBtn = document.createElement("p");
                userDetailsBtn.setAttribute("id", 'userDetailsBtn');
                userDetailsBtn.setAttribute("title", 'More Details!');
                target2.appendChild(userDetailsBtn);
                var tDiv = document.createElement("div");
                tDiv.setAttribute("class", 'collapse');
                tDiv.setAttribute("id", "detailsShow")
                var table = document.createElement("table");
                table.setAttribute("class", "table");
                var tr1 = document.createElement("tr");
                tr1.setAttribute("class", "table-primary");
                var tr1td2 = document.createElement("td");
                tr1td2.setAttribute("id", "type");
                tr1td2.setAttribute("title", "Type");
                tr1.appendChild(tr1td2);
                var tr2 = document.createElement("tr");
                tr2.setAttribute("class", "table-danger");
                var tr2td2 = document.createElement("td");
                tr2td2.setAttribute("id", "gender");
                tr2td2.setAttribute("title", "Gender");
                tr2.appendChild(tr2td2);
                var tr3 = document.createElement("tr");
                tr3.setAttribute("class", "table-info");
                var tr3td2 = document.createElement("td");
                tr3td2.setAttribute("id", "email");
                tr3td2.setAttribute("title", "Email");
                tr3.appendChild(tr3td2);
                table.appendChild(tr1);
                table.appendChild(tr2);
                table.appendChild(tr3);
                tDiv.appendChild(table);
                target2.appendChild(tDiv);
                var rDiv = document.createElement("div");
                rDiv.setAttribute("id", "rDiv");
                tDiv.appendChild(rDiv)
                document.getElementById("userName").innerHTML = dataObj.adjustedName;
                document.getElementById("usertype").innerHTML = "( " + dataObj.type + " )";
                document.getElementById("userNameOnOverView").innerHTML = dataObj.adjustedName;
                document.getElementById("userBioOverView").innerHTML = `
                        <i class="fa fa-quote-left"></i>
                        <br />
                        ${dataObj.comment}
                        <br />
                        <i class="fa fa-quote-right"></i>
                        `
                document.getElementById("userDetailsBtn").innerHTML = `<button class='btn btn-info' data-toggle="collapse" data-target="#detailsShow" title='More Details'><i class='fa fa-arrow-down'></i> More Details!</button>
                        <button class='btn btn-success' title='Edit Profile' data-toggle="modal" data-target="#editForm"><i class='fa fa-edit'></i> Edit Profile!</button>
                        <button class='btn btn-danger' title='Delete Account' onclick='deleteProfile()'><i class='fa fa-trash'></i> Delete Account!</button>`;
                document.getElementById("type").innerHTML = dataObj.type;
                document.getElementById("gender").innerHTML = dataObj.gender;
                document.getElementById("email").innerHTML = dataObj.email;
                document.getElementById("editedName").value = dataObj.adjustedName;
                document.getElementById("editedBio").value = dataObj.comment;
                if (dataObj.gender === "Male") {
                    document.getElementById("radio1").checked = true;
                    console.log("Yes M")
                }
                else if (dataObj.gender === "Female") {
                    document.getElementById("radio2").checked = true;
                    console.log("No F")
                }
                document.getElementById("rDiv").innerHTML = `
                            <p>Data Representatives <i class='fa fa-arrow-down'></i></p>
                            <p style="text-align:center;"><button class="fsBtn"><i class="fa fa-file" aria-hidden="true" style='color:white'></i> Type</button><button class="csBtn"><i class="fa fa-venus" style='color:white; font-weight:bold'></i> Gender</button><button class="wsBtn"><i class="fa fa-envelope" style='color:white' aria-hidden="true"></i> Email</button></p>
                            `
                console.log(dataObj)
                if (dataObj.gender === "Female") {
                    document.getElementById("gProfile").removeAttribute("src");
                    document.getElementById("gProfile").setAttribute("src", './girl.png');
                    document.getElementById("gProfile2").removeAttribute("src");
                    document.getElementById("gProfile2").setAttribute("src", './girl.png');
                }
            })
        }
        else {
            document.getElementById("mainBox").style.display = 'none';
            document.getElementById("error").style.display = 'block';
            document.getElementById("error").innerHTML = `<p class='alert alert-danger'>You are not logged in. <a href='./index.html'>Log in here!</a> </p>`
        }
    })
}
function logout() {
    document.getElementById("loaderlogout").style.display = 'block';
    document.getElementById("loaderlogoutR").style.display = 'block';
    firebase.auth().signOut().then(() => {
        location = './index.html'
    });
}
