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
function dltUser(userId) {
    swal({
        title: 'Are you Sure?',
        text: "Once you delete this account this user will no longer can access here!",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete it!',
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.value) {
            firebase.database().ref("users/" + userId).remove().then(() => {
                swal({
                    type: 'success',
                    title: 'This account has been deleted!',
                    text: "Now this user can;t access here!"
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
            firebase.database().ref("users/" + userId).once("value").then((data) => {
                document.getElementById("loaderLoad").style.display = 'none';
                const adminData = data.val();
                document.getElementById("userName").innerHTML = adminData.adjustedName;
                document.getElementById("usertype").innerHTML = "( " + adminData.type + " )";
                document.getElementById("aN").innerHTML = adminData.adjustedName;
                document.getElementById("aB").innerHTML = `<i class="fa fa-quote-left"></i><br />${adminData.comment}<br /><i class="fa fa-quote-right"></i>`
                document.getElementById("aT").innerHTML = adminData.type;
                document.getElementById("aG").innerHTML = adminData.gender;
                document.getElementById("aE").innerHTML = adminData.email;
                firebase.database().ref("users/").once("value").then((data) => {
                    const allData = data.val();
                    var count = 0;
                    var uC = 0;
                    var mC = 0;
                    var fC = 0;
                    for (var key in allData) {
                        if (allData[key].type !== "Admin") {
                            uC++;
                            if (allData[key].gender === "Male") {
                                mC++;
                            }
                            else {
                                fC++;
                            }
                        }
                    }
                    document.getElementById("users").innerHTML = `
                <div class='contentNav'><i class='fa fa-filter' style='color:rgba(133, 41, 41, 0.781)'></i> Users Filter!</div>
                <div class='userDivP'>
                <div class='usersDiv' title='${"Total Users " + uC}'>
                    <p>( Total Users )</p>
                    <p style='color:rgba(8, 8, 8, 0.747)' font-family:Georgia>${uC}</p>
                </div>
                <div class='usersDiv' title='${"Male Users " + mC}'>
                    <p>( Male )</p>
                    <p style='color:rgba(8, 8, 8, 0.747)' font-family:Georgia>${mC}</p>
                </div>
                <div class='usersDiv' title='${"Female Users " + fC}'>
                    <p>( Female )</p>
                    <p style='color:rgba(8, 8, 8, 0.747)' font-family:Georgia>${fC}</p>
                </div>
                </div>
                `
                    console.log(uC, mC, fC)
                    for (var key in allData) {
                        if (allData[key].type !== "Admin") {
                            count++;
                            if (allData[key].gender === "Male") {
                                document.getElementById("render").innerHTML += `
                        <div class='profileContent'>
                        <p class='img2'><img src='./boy.png' class='account' title='${allData[key].adjustedName}'></p>
                        <p class='userNameOverView' title='${allData[key].adjustedName}'>${allData[key].adjustedName}</p>
                        <p class='userBioOverView' title='Bio'><i class='fa fa-quote-left'></i> <br />${allData[key].comment}<br /><i class='fa fa-quote-right'></i></p>
                        <p class='userDetailsBtn'>
                            <button class='btn btn-info' data-toggle="collapse" data-target=${"#detailsShow" + count} title='${"More details about " + allData[key].adjustedName}'><i class='fa fa-arrow-down'></i> More Details!</button>
                            <button class='btn btn-danger' id=${key} onclick='dltUser(id)' title='${"Delete " + allData[key].adjustedName}'><i class='fa fa-trash'></i> Delete User!</button>
                        </p>
                        <div class='collapse' id=${"detailsShow" + count}>
                            <table class='table'>
                                <tr class='table-primary'>
                                    <td title='Type'>${allData[key].type}</td>
                                </tr>
                                <tr class='table-danger' title='Gender'><td>${allData[key].gender}</td></tr>
                                <tr class='table-info' title='Email'><td>${allData[key].email}</td></tr>
                            </table>
                            <div id='rDiv'>
                        <p>Data Representatives <i class='fa fa-arrow-down'></i></p>
                        <p style="text-align:center;"><button class="fsBtn"><i class="fa fa-file" aria-hidden="true" style='color:white'></i> Type</button><button class="csBtn"><i class="fa fa-venus" style='color:white; font-weight:bold'></i> Gender</button><button class="wsBtn"><i class="fa fa-envelope" style='color:white' aria-hidden="true"></i> Email</button></p>
                        </div>
                        </div>
                        </div>
                    `
                            }
                            else if (allData[key].gender === "Female") {
                                document.getElementById("render").innerHTML += `
                                <div class='profileContent'>
                                <p class='img2'><img src='./girl.png' class='account' title='${allData[key].adjustedName}'></p>
                                <p class='userNameOverView' title='${allData[key].adjustedName}'>${allData[key].adjustedName}</p>
                                <p class='userBioOverView' title='Bio'><i class='fa fa-quote-left'></i> <br />${allData[key].comment}<br /><i class='fa fa-quote-right'></i></p>
                                <p class='userDetailsBtn'>
                                    <button class='btn btn-info' data-toggle="collapse" data-target=${"#detailsShow" + count} title='${"More details about " + allData[key].adjustedName}'><i class='fa fa-arrow-down'></i> More Details!</button>
                                    <button class='btn btn-danger' id=${key} onclick='dltUser(id)' title='${"Delete " + allData[key].adjustedName}'><i class='fa fa-trash'></i> Delete User!</button>
                                </p>
                                <div class='collapse' id=${"detailsShow" + count}>
                                    <table class='table'>
                                        <tr class='table-primary'>
                                            <td title='Type'>${allData[key].type}</td>
                                        </tr>
                                        <tr class='table-danger' title='Gender'><td>${allData[key].gender}</td></tr>
                                        <tr class='table-info' title='Email'><td>${allData[key].email}</td></tr>
                                    </table>
                                    <div id='rDiv'>
                                <p>Data Representatives <i class='fa fa-arrow-down'></i></p>
                                <p style="text-align:center;"><button class="fsBtn"><i class="fa fa-file" aria-hidden="true" style='color:white'></i> Type</button><button class="csBtn"><i class="fa fa-venus" style='color:white; font-weight:bold'></i> Gender</button><button class="wsBtn"><i class="fa fa-envelope" style='color:white' aria-hidden="true"></i> Email</button></p>
                                </div>
                                </div>
                                </div>
                            `
                            }
                        }
                    }

                })
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
