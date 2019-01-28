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

window.addEventListener("load", async function loader() {
    await load();
})
var Btype = "";
async function load() {
    await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref("donors/" + userId).once("value").then((data) => {
                document.getElementById("loader").style.display = 'none';
                let alert = data.val();
                document.getElementById("profilePic").setAttribute("src", alert.profilePic)
                document.getElementById("acceptorPost").value = alert.post;
                document.getElementById("userName").innerHTML = alert.name;
                document.getElementById("userType").innerHTML = "(" + alert.type + ")";
                document.getElementById("mainBox").style.display = 'block';
                document.getElementById("profile").innerHTML = `
                    <p class='typeBox' title='Type'><i class='fa fa-user-plus'></i> ${alert.type}</p>
                    <p class='dp' title='Profile'><img src='${alert.profilePic}'></p>
                    <p class='name' title='Name'>${alert.name}</p>
                    <p class='bGroup' title='Blood Group'>${alert.bloodGroup}</p>
                    <p><button class='btn btn-info' title='Change Account Type' onclick='changeAccType()'><i class='fa fa-user-plus'></i> Change Account Type</button></p>
                    <hr />
                    <div style='text-align:left'>
                        <p><span title='Age' style='font-weight:bold'><i class='fa fa-child' style='color:#e74c3c'></i> Age : </span> ${alert.age}</p>
                        <p><span title='Gender' style='font-weight:bold'><i class='fa fa-neuter' style='color:#e74c3c'></i> Gender : </span> ${alert.gender}</p>
                        <p><span title='Number' style='font-weight:bold'><i class='fa fa-phone' style='color:#e74c3c'></i> Phone : </span> ${alert.number}</p>
                        <p><span title='Email' style='font-weight:bold'><i class='fa fa-envelope' style='color:#e74c3c'></i> Email : </span> ${alert.email}</p>
                        <p><span title='Address' style='font-weight:bold'><i class='fa fa-map-marker' style='color:#e74c3c'></i> Address : </span> ${alert.address}</p>
                    </div>
                    <hr />
                `
                if (alert.bloodGroup === "O+") {
                    document.getElementById("guidance").innerHTML = `Your blood group is O+. Hence you can give blood to O+ , A+ , B+ , AB+ Only.`
                }
                else if (alert.bloodGroup === "A+") {
                    document.getElementById("guidance").innerHTML = `Your blood group is A+. Hence you can give blood to A+ , AB+ Only.`
                }
                else if (alert.bloodGroup === "B+") {
                    document.getElementById("guidance").innerHTML = `Your blood group is B+. Hence you can give blood to B+ , AB+ Only.`
                }
                else if (alert.bloodGroup === "AB+") {
                    document.getElementById("guidance").innerHTML = `Your blood group is AB+. Hence you can give blood to AB+ Only.`
                }
                else if (alert.bloodGroup === "O-") {
                    document.getElementById("guidance").innerHTML = `Your blood group is O-. Hence you can give blood to anyone.`
                }
                else if (alert.bloodGroup === "A-") {
                    document.getElementById("guidance").innerHTML = `Your blood group is A-. Hence you can give blood to A- , A+ , AB- , AB+ Only.`
                }
                else if (alert.bloodGroup === "B-") {
                    document.getElementById("guidance").innerHTML = `Your blood group is B-. Hence you can give blood to B- , B+ , AB- , AB+  Only.`
                }
                else if (alert.bloodGroup === "AB-") {
                    document.getElementById("guidance").innerHTML = `Your blood group is AB-. Hence you can give blood to AB-, AB+ Only.`
                }
            }).catch((error) => {
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
            firebase.database().ref("acceptors/").once("value").then((data) => {
                let acceptors = data.val();
                console.log(acceptors);
                var counter = 0;
                var aPositive = 0;
                var aNegative = 0;
                var bPositive = 0;
                var bNegative = 0;
                var oPositive = 0;
                var oNegative = 0;
                var abPositive = 0;
                var abNegative = 0;

                for (var key in acceptors) {
                    counter++;
                    document.getElementById("acceptors").innerHTML += `
                        <div class='donorBox' id='${key}'>
                            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${acceptors[key].type}</p>
                            <div class='paddBox'>
                            <p class='dp' title='Dp'><img src='${acceptors[key].profilePic}' height='100px' width='100px'></p>
                            <p class='name' title='Name'>${acceptors[key].name}</p>
                            <p><span class='bGroup' title='Blood Group'>${acceptors[key].bloodGroup}</span></p>
                            <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)'></i><br /> ${acceptors[key].post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
                            <p id='${key + counter}'><button style='width:100%;' onclick='donate()' class='btn btn-danger'><i class='fa fa-plus-square'></i> Donate Now</button></p>
                            <hr />
                            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#e74c3c'></i> Age : </span> ${acceptors[key].age}</p>
                            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#e74c3c'></i> Gender : </span> ${acceptors[key].gender}</p>
                            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#e74c3c'></i> Phone : </span> ${acceptors[key].number}</p>
                            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#e74c3c'></i> Email : </span> ${acceptors[key].email}</p>
                            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#e74c3c'></i> Address : </span> ${acceptors[key].address}</p>
                            <hr />
                            </div>
                            </div>  
                    `

                    if (acceptors[key].bloodGroup === "A+") {
                        aPositive++;
                    }
                    else if (acceptors[key].bloodGroup === "A-") {
                        aNegative++;
                    }

                    else if (acceptors[key].bloodGroup === "B+") {
                        bPositive++;
                    }
                    else if (acceptors[key].bloodGroup === "B-") {
                        bNegative++;
                    }

                    else if (acceptors[key].bloodGroup === "O+") {
                        oPositive++;
                    }
                    else if (acceptors[key].bloodGroup === "O-") {
                        oNegative++;
                    }

                    else if (acceptors[key].bloodGroup === "AB+") {
                        abPositive++;
                    }
                    else if (acceptors[key].bloodGroup === "AB-") {
                        abNegative++;
                    }
                }
                if (counter === 0) {
                    document.getElementById("acceptors").innerHTML = `<p class='null'>There is no acceptor available at the moment.</p>`
                    document.getElementById("filter").style.display = 'none';
                }
                document.getElementById("totals").innerHTML = `
                <table class="table table-hover" style='text-align:center; cursor:pointer; margin:10px auto; background-color:white'>
                <thead style='background-color:rgb(18, 165, 165); color:white; font-weight:normal'>
                  <tr>
                    <th><i class='fa fa-plus-square'></i> Group</th>
                    <th><i class='fa fa-heartbeat'></i> Acceptors</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                <td class='groupHead' title='A+'>A+</td>
                <td title='${aPositive}'>${aPositive}</td>
              </tr>
              <tr>
                <td class='groupHead' title='A-'>A-</td>
                <td title='${aNegative}'>${aNegative}</td>
              </tr>
              <tr>
                <td class='groupHead' title='B+'>B+</td>
                <td title='${bPositive}'>${bPositive}</td>
              </tr>
              <tr>
                <td class='groupHead' title='B-'>B-</td>
                <td title='${bNegative}'>${bNegative}</td>
              </tr>
              <tr>
                <td class='groupHead' title='O+'>O+</td>
                <td title='${oPositive}'>${oPositive}</td>
              </tr>
              <tr>
                <td class='groupHead' title='O-'>O-</td>
                <td title='${oNegative}'>${oNegative}</td>
              </tr>
              <tr>
                <td class='groupHead' title='AB+'>AB+</td>
                <td title='${abPositive}'>${abPositive}</td>
              </tr>
              <tr>
                <td class='groupHead' title='AB-'>AB-</td>
                <td title='${abNegative}'>${abNegative}</td>
              </tr>
              <tr>
              <td class='groupHead' style='color:rgb(18, 165, 165)' title='Total'>Total</td>
              <td style='color:#e74c3c' title='${counter}'>${counter}</td>
            </tr>
                </tbody>
              </table>
                `
            }).catch((error) => {
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
            firebase.database().ref("donors/" + userId).once("value").then((data) => {
                let post = data.val();
                console.log(post)
                document.getElementById("myPost").innerHTML = `
                        <div class='postBox' id='${userId}'>
                            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${post.type}</p>
                            <div class='paddBox'>
                            <p class='dp' title='Dp'><img src='${post.profilePic}' height='100px' width='100px'></p>
                            <p class='name' title='Name'>${post.name}</p>
                            <p><span class='bGroup' title='Blood Group'>${post.bloodGroup}</span></p>
                            <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)''></i><br /> ${post.post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
                            <hr />
                            <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#e74c3c'></i> Age : </span> ${post.age}</p>
                            <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#e74c3c'></i> Gender : </span> ${post.gender}</p>
                            <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#e74c3c'></i> Phone : </span> ${post.number}</p>
                            <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#e74c3c'></i> Email : </span> ${post.email}</p>
                            <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#e74c3c'></i> Address : </span> ${post.address}</p>
                            <hr />
                            <button class='btn btn-danger dltBtn' title='Edit' data-toggle="modal" data-target="#edit"><i class='fa fa-edit'></i> Edit</button>
                            </div>
                            </div>  
                    `
            }).catch((error) => {
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
        }
        else {

        }
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
var donors = "";
firebase.database().ref("acceptors/").once("value").then((data) => {
    let donorss = data.val();
    donors = donorss;
})

function filter(request) {
    console.log(donors)
    if (request !== "default") {
        var counter = 0;
        document.getElementById("acceptors").innerHTML = '';
        console.log("success")
        for (var key in donors) {
            if (donors[key].bloodGroup === request) {
                counter++;
                document.getElementById("acceptors").innerHTML += `
            <div class='donorBox' id='${key}'>
            <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${donors[key].type}</p>
            <div class='paddBox'>
            <p class='dp' title='Dp'><img src='${donors[key].profilePic}' height='100px' width='100px'></p>
            <p class='name' title='Name'>${donors[key].name}</p>
            <p><span class='bGroup' title='Blood Group'>${donors[key].bloodGroup}</span></p>
            <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)'></i><br /> ${donors[key].post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
            <p id='${key + counter}'><button style='width:100%;' onclick='donate()' class='btn btn-danger'><i class='fa fa-plus-square'></i> Donate Now</button></p>
            <hr />
                <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#e74c3c'></i> Age : </span> ${donors[key].age}</p>
                <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#e74c3c'></i> Gender : </span> ${donors[key].gender}</p>
                <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#e74c3c'></i> Phone : </span> ${donors[key].number}</p>
                <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#e74c3c'></i> Email : </span> ${donors[key].email}</p>
                <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#e74c3c'></i> Address : </span> ${donors[key].address}</p>
                <hr />
            </div>  
             `
            }
        }
        if (counter === 0) {
            document.getElementById("acceptors").innerHTML = `<p class='null'>There is no donor of ${request} Blood!</p>`
        }
    }
    else {
        document.getElementById("acceptors").innerHTML = '';
        var counter = 0;
        for (var key in donors) {
            counter++;
            document.getElementById("acceptors").innerHTML += `
                <div class='donorBox' id='${key}'>
                <p class='typeBox' title='Type'><i class='fa fa-plus-square'></i> ${donors[key].type}</p>
                <div class='paddBox'>
                <p class='dp' title='Dp'><img src='${donors[key].profilePic}' height='100px' width='100px'></p>
                <p class='name' title='Name'>${donors[key].name}</p>
                <p><span class='bGroup' title='Blood Group'>${donors[key].bloodGroup}</span></p>
                <p class='post' title='Post'><i class='fa fa-quote-left' style='font-size:60%; color:rgb(18, 165, 165)'></i><br /> ${donors[key].post} <br /><i class='fa fa-quote-right' style='font-size:60%; color:rgb(18, 165, 165)''></i></p>
                <p id='${key + counter}'><button style='width:100%;' onclick='donate()' class='btn btn-danger'><i class='fa fa-plus-square'></i> Donate Now</button></p>
                <hr />
                    <p class='oD' title='Age'><span style='font-weight:bold'><i class='fa fa-child' style='color:#e74c3c'></i> Age : </span> ${donors[key].age}</p>
                    <p class='oD' title='Gender'><span style='font-weight:bold'><i class='fa fa-neuter' style='color:#e74c3c'></i> Gender : </span> ${donors[key].gender}</p>
                    <p class='oD' title='Number'><span style='font-weight:bold'><i class='fa fa-phone' style='color:#e74c3c'></i> Phone : </span> ${donors[key].number}</p>
                    <p class='oD' title='Email'><span style='font-weight:bold'><i class='fa fa-envelope' style='color:#e74c3c'></i> Email : </span> ${donors[key].email}</p>
                    <p class='oD' title='Address'><span style='font-weight:bold'><i class='fa fa-map-marker' style='color:#e74c3c'></i> Address : </span> ${donors[key].address}</p>
                <hr />
                </div>  
                 `
        }

        if (counter === 0) {
            document.getElementById("acceptors").innerHTML = `<p class='null'>There is no donor available at the moment.</p>`
        }
    }
}
function editPost() {
    document.getElementById("loaderAcceptor").style.display = 'block';
    var post = document.getElementById("acceptorPost").value;
    let userUid = firebase.auth().currentUser.uid;
    firebase.database().ref("donors/" + userUid).once("value").then((data) => {
        let edit = data.val();
        edit.post = post;
        firebase.database().ref("donors/" + userUid).set(edit).then(() => {
            document.getElementById("loaderAcceptor").style.display = 'none';
            swal({
                type: 'success',
                title: 'Edited!',
                text: 'Successfully!',
                confirmButtonText: "Ok!",
                confirmButtonColor: "#fa7c6e"
            }).then((result) => {
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

}
function changeAccType() {
    swal({
        type: 'info',
        title: 'Are you sure?',
        text: 'Your type is donor right now. If you have to change your account type, We will convert you in User first then you will select your type anything you want. Again Donor or May be Acceptor or Just a User!',
        confirmButtonText: "Convert!",
        confirmButtonColor: "#fa7c6e",
        showCancelButton: true,
        cancelButtonText: "Cancel!",
        cancelButtonColor: "rgb(18, 165, 165)",
    }).then((result) => {
        if (result.value) {
            accPost();
        }

    })
}
function accPost() {
    document.getElementById("mainBox").style.display = 'none';
    document.getElementById("loader").style.display = 'block';
    let user = firebase.auth().currentUser.uid;
    firebase.database().ref("users/" + user).once("value").then((data) => {
        const dataObj = data.val();
        dataObj.type = "User";
        firebase.database().ref("users/" + user).set(dataObj).then(() => {
            firebase.database().ref("donors/" + user).remove().then(() => {
                location = './panel.html';
            }).catch((error) => {
                document.getElementById("mainBox").style.display = 'block';
                document.getElementById("loader").style.display = 'none';
                swal({
                    type: 'error',
                    title: 'Something went wrong!',
                    text: error.message,
                    confirmButtonColor: "#fa7c6e"
                })
            })
        }).catch((error) => {
            document.getElementById("mainBox").style.display = 'block';
            document.getElementById("loader").style.display = 'none';
            swal({
                type: 'error',
                title: 'Something went wrong!',
                text: error.message,
                confirmButtonColor: "#fa7c6e"
            })
        })
    }).catch((error) => {
        document.getElementById("mainBox").style.display = 'block';
        document.getElementById("loader").style.display = 'none';
        swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
        })
    })
}