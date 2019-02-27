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

window.addEventListener("load", () => {
    ads();
    // fetch('http://ip-api.com/json')
    //     .then(function (response) {
    //         return response.json();
    //     })
    // .then(function (location) {
    //     localStorage.setItem("location",JSON.stringify(location));
    //     document.getElementById("location").innerHTML = `<i class='fa fa-map-marker'></i> ${location.country}`;
    //     document.getElementById("location2").innerHTML = `<i class='fa fa-map-marker'></i> ${location.country}`
    // }).catch(()=>{
    //     var lo = JSON.parse(localStorage.getItem("location"));
    //     document.getElementById("location").innerHTML = `<i class='fa fa-map-marker'></i> ${lo.country}`;
    //     document.getElementById("location2").innerHTML = `<i class='fa fa-map-marker'></i> ${lo.country}`
    // });
    if ('serviceWorker' in navigator) {
        
        navigator.serviceWorker.register('../ohsw.js').then(function(registration) {

            firebase.messaging().useServiceWorker(registration);

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {

                    function saveMessagingDeviceToken() {

                        firebase.messaging().getToken().then(function(currentToken) {
                            if (currentToken) {
                                console.log('Token:', currentToken);
                                
                                firebase.database().ref('/fcmTokens').child(currentToken)
                                    .set(firebase.auth().currentUser.uid);
                            } else {

                                requestforpermision()
                            }
                        })
                    } 

                    function requestforpermision() {
                        firebase.messaging().requestPermission().then(function() {
                      
                            saveMessagingDeviceToken();
                        })

                    } 
                    requestforpermision()
                }
            });
            console.log('ServiceWorker has been Registered');
        });


    }
})

firebase.messaging().onMessage(function(payload) {
    console.log(payload)
});


function openNav() {
    document.getElementById("rNav").style.overflow = 'auto';
    document.getElementById("rNav").style.width = "60%";
}
function closeNav() {
    document.getElementById("rNav").style.overflow = 'hidden';
    document.getElementById("rNav").style.width = "0";
}
function ads() {
    document.getElementById("cateBar").innerHTML = `<span><i class="fa fa-angle-down"></i> Our Ads <br /><span style='font-size:60%; color:black; font-family:"Poppins"'> ( buy our most popular products ) </span></span>`
    firebase.database().ref("ads/").on("value", (data) => {
        const ads = data.val();
        localStorage.setItem("ads",JSON.stringify(ads));
        document.getElementById("ads").innerHTML = "";
        for (var key in ads) {
            for (var key2 in ads[key]) {
                for (var key3 in ads[key][key2]) {
                    document.getElementById("ads").innerHTML += `
                        <div class='productBox' id='${key3}' class='${ads[key][key2][key3].name}' onclick='details(this)'>
                            <p class='line' style='margin-bottom:6px;'></p>
                            <div class='pPic'>
                                <img src='${ads[key][key2][key3].pic}'>
                            </div>
                            <p class='pPrice'>${"Rs." + ads[key][key2][key3].price}</p>
                            <p class='pName'>${ads[key][key2][key3].name}</p>
                        </div>
                    `
                }
            }
        }
       
    })
    
}



function search() {
    var userInput = document.getElementById("userInput").value;
    var flag = false;
    if (userInput !== "" && userInput !== undefined) {
        userInput = userInput.toLowerCase();
        userInput = userInput.replace(/\s/g, '');
        firebase.database().ref("ads/").once("value", (data) => {
            var d = data.val();
            for (var key in d) {
                for (var key2 in d[key]) {
                    for (var key3 in d[key][key2]) {
                        var p = d[key][key2][key3].name;
                        p = p.toLowerCase();
                        p = p.replace(/\s/g, '');
                        if (p === userInput) {
                            if (flag != true) {
                                document.getElementById("ads").innerHTML = '';
                            }
                            flag = true;
                            document.getElementById("cateBar").innerHTML = `<span><i class="fa fa-angle-down"></i> ${d[key][key2][key3].name.toUpperCase()} </span>`
                            document.getElementById("ads").innerHTML += `
                            <div class='productBox' id='${key3}' class='${d[key][key2][key3].name}' onclick='details(this)'>
                                <p class='pLine'></p>
                                <div class='pPic'>
                                    <img src='${d[key][key2][key3].pic}' width='180px'; height='180px''>
                                </div>
                                <p class='pPrice'>${"Rs." + d[key][key2][key3].price}</p>
                                <p class='pName'>${d[key][key2][key3].name}</p>
                            </div>
                        `
                        }

                    }
                }
            }
        })
    }
    if (flag != true) {
        swal({
            type: 'error',
            title: 'No Results Found!',
            text: 'We do not have this product',
            confirmButtonText: "Ok",
            confirmButtonColor: "#fa7c6e"
        })
    }
}
function details(id) {
    var favs = JSON.parse(localStorage.getItem("favAds"));
    console.log(favs)
    var k = undefined;
    firebase.database().ref("ads/").once("value").then((data) => {
        const d = data.val();
        for (var key in d) {
            for (var key2 in d[key]) {
                for (var key3 in d[key][key2]) {
                    if (id.id === key3) {
                        k  = key3;
                        var pro = d[key][key2][key3];
                        pro.adId = key3;
                        document.getElementById("ads").innerHTML = "";
                        document.getElementById("cateBar").innerHTML = `<span><i class="fa fa-angle-down"></i> ${d[key][key2][key3].name.toUpperCase()} <br /><span style='font-size:60%; color:black; font-family:"Poppins"'> ( you can chat with seller of ${d[key][key2][key3].name} ) </span>`
                        document.getElementById("ads").innerHTML = `
                            <div class='pDetails'>
                                <div class='userDetails'>
                                    <div>
                                    <p id="infoPanel">            
                                    <span id="name" style="font-family:'Oswald'; color:#15a4fa;"><span id='pic'><img src='${d[key][key2][key3].userpic}' height='40px' width='40px'></span> - ${d[key][key2][key3].username.toUpperCase()}</span>
                                    <span id='type'>
                                        <button class='btn btn-danger' data-toggle='modal' data-target='#myModal' class='sendMessageBtn' ><i class="fa fa-send-o"></i> Message</button>
                                    </span>
                                    </p>
                                    </div>
                                </div>
                                <div class='productDetails'>
                                    <div class='pPi'><p><img src='${d[key][key2][key3].pic}' height='250px' width='250px;'></p></div>
                                    <div class='pDe'>
                                    <div>
                                        <p class='n'>${d[key][key2][key3].name.toUpperCase()}</p>
                                        <p class='l'>
                                        <p class='ds'>${d[key][key2][key3].description}</p>
                                        <p class='pri'>Rs. ${d[key][key2][key3].price}</p>
                                        <p class='mod'>${d[key][key2][key3].modal}</p>
                                        <p class='loca'><i class='fa fa-map-marker' style='color:#e45c75'></i> ${d[key][key2][key3].address}</p>
                                    </div>                                    
                                    </div>
                                </div> 
                                <div class='userDetails' id='abc'>
                                    <button class='btn btn-info' onclick='fav(${JSON.stringify(pro)}), removeAtr(this)' style='width:100%;'><i class='fa fa-star'></i> Insert in Favourites</button>
                                </div>
                            </div>
                        `
                        var element = document.getElementsByClassName("fMessage");
                        element[0].setAttribute("id", `${d[key][key2][key3].useruid}`)
                        
                        
                    }
                }
            }
        }
        for(var i = 0; i<favs.length; i++){
            if(favs[i].adId===k){
                document.getElementById("abc").innerHTML = `  <button class='btn btn-info' style='width:100%;'><i class='fa fa-check'></i> Added in Favourites</button>`;
            }
        }
    })
}

function detailsOfFav(id){
    var ad = id.id;
    const favAds = JSON.parse(localStorage.getItem("favAds"));
    for(var i = 0; i<favAds.length; i++){
        if(favAds[i].adId===ad){
            document.getElementById("ads").innerHTML = "";
            document.getElementById("cateBar").innerHTML = `<span><i class="fa fa-angle-down"></i> ${favAds[i].name.toUpperCase()} <br /><span style='font-size:60%; color:black; font-family:"Poppins"'> ( you can chat with seller of ${favAds[i].name} ) </span>`
            document.getElementById("ads").innerHTML = `
                            <div class='pDetails'>
                                <div class='userDetails'>
                                    <div>
                                    <p id="infoPanel">            
                                    <span id="name" style="font-family:'Oswald'; color:#15a4fa;"><span id='pic'><img src='${favAds[i].userpic}' height='40px' width='40px'></span> - ${favAds[i].username.toUpperCase()}</span>
                                    <span id='type'>
                                        <button class='btn btn-danger' data-toggle='modal' data-target='#myModal' class='sendMessageBtn' ><i class="fa fa-send-o"></i> Message</button>
                                    </span>
                                    </p>
                                    </div>
                                </div>
                                <div class='productDetails'>
                                    <div class='pPi'><p><img src='${favAds[i].pic}' height='250px' width='250px;'></p></div>
                                    <div class='pDe'>
                                    <div>
                                        <p class='n'>${favAds[i].name.toUpperCase()}</p>
                                        <p class='l'>
                                        <p class='ds'>${favAds[i].description}</p>
                                        <p class='pri'>Rs. ${favAds[i].price}</p>
                                        <p class='mod'>${favAds[i].modal}</p>
                                        <p class='loca'><i class='fa fa-map-marker' style='color:#e45c75'></i> ${favAds[i].address}</p>
                                    </div>                                    
                                    </div>
                                </div> 
                            </div>
                        `
                        var element = document.getElementsByClassName("fMessage");
                        element[0].setAttribute("id", `${favAds[i].useruid}`)
        }
    }
}

function fav(ad){
    var favourites = JSON.parse(localStorage.getItem("favAds"));
    console.log(favourites)
    var array = [];
    if(favourites===null){
        array.push(ad);
        localStorage.setItem("favAds",JSON.stringify(array));
    }
    else if(favourites!==null){
        favourites.push(ad);
        localStorage.setItem("favAds",JSON.stringify(favourites));
        console.log("SUCCESS")
    }
}

function removeAtr(button){
    button.innerHTML = "<i class='fa fa-check'></i> Added in Favourites";
    button.removeAttribute("onclick");
}

function favs(){
    var favAds = JSON.parse(localStorage.getItem("favAds"));
    document.getElementById("cateBar").innerHTML = `<span><i class="fa fa-angle-down"></i> Favourites <br /><span style='font-size:60%; color:black; font-family:"Poppins"'> ( your favourite ads you marked ) </span>`
    document.getElementById("ads").innerHTML = "";
    if(favAds!==null){
        for(var i = 0; i<favAds.length; i++){
            document.getElementById("ads").innerHTML += `
                <div class='productBox' id='${favAds[i].adId}' class='${favAds[i].name}' onclick='detailsOfFav(this)'>
                        <p class='line' style='margin-bottom:6px;'></p>
                        <div class='pPic'>
                            <img src='${favAds[i].pic}'>
                        </div>
                        <p class='pPrice'>${"Rs." + favAds[i].price}</p>
                        <p class='pName'>${favAds[i].name}</p>
                        </div>
                    `
        }
    }
    else if(favAds==null){
        document.getElementById("ads").innerHTML = `
        <div class="alert alert-danger" style='width:100%; text-align:center'>
        <strong>Empty!</strong> No favourite ads available right now.
        </div>
        `
    }
}


function category(category) {
    firebase.database().ref("ads/").on("value", (data) => {
        var flag = false;
        const ads = data.val();
        console.log(ads)
        document.getElementById("ads").innerHTML = "";
        document.getElementById("cateBar").innerHTML = `<span><i class="fa fa-angle-down"></i> ${category.toUpperCase()} <br /><span style='font-size:60%; color:black; font-family:"Poppins"'> ( this are the products of ${category} we have. ) </span>`
        for (var key in ads) {
            if (category === key) {
                flag = true;
                for (var key2 in ads[key]) {
                    for (var key3 in ads[key][key2]) {
                        document.getElementById("ads").innerHTML += `
                    
                        <div class='productBox' id='${key3}' onclick='details(this)'>
                        <p class='line' style='margin-bottom:6px;'></p>
                            <div class='pPic'>
                                <img src='${ads[key][key2][key3].pic}'>
                            </div>
                            <p class='pPrice'>${"Rs." + ads[key][key2][key3].price}</p>
                            <p class='pName'>${ads[key][key2][key3].name}</p>
                        </div>
                    `
                    }
                }
            }
        }
        if (flag !== true) {
            document.getElementById("ads").innerHTML = `We don't have ${category, toUpperCase()} right now. `
        }
    })
}
function loginMessage(){
    var sellerId = document.getElementsByClassName("fMessage")[0].id;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    document.getElementById("loader").style.display = 'block';
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref("users/"+sellerId).once("value").then((data)=>{
            const d = data.val();
            document.getElementById("loader").style.display = 'none';
            Swal.fire({
                title: d.name.toUpperCase(),
                text: "Send your message to " + `${d.name}` ,
                animation: false,
                customClass: 'animated zoomInUp',
                input: 'text',
                confirmButtonColor: "#e45c75",
                confirmButtonText: "Send",
              }).then((result) => {
                if (result.value) {
                  const msg = result.value;
                  var obj = {
                    msg,
                    name : "sender",
                  }
                  firebase.database().ref("chats/"+sellerId+"/"+uid).push(obj).then(()=>{
                    var obj2 = {
                        msg,
                        name : "me",
                      }
                    firebase.database().ref("chats/"+uid+"/"+sellerId).push(obj2).then(()=>{
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                        swal({
                            type: 'success',
                            title: 'Message Sent!',
                            text: 'You can check your all chats and messages by logging in.',
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#fa7c6e"
                        })

                        firebase.database().ref("/fcmTokens").once("value", function(snapshot) {
                            snapshot.forEach(function(token) {
                                if (token.val() == sellerId) { //Getting the token of the reciever using  if condition..!   
                                    $.ajax({
                                        type: 'POST',
                                        url: "https://fcm.googleapis.com/fcm/send",
                                        headers: { Authorization: 'key=' + 'AIzaSyAZb36fWL_hMWrW0X79GEjArGirwEAdIaI' },
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        data: JSON.stringify({
                                            "to": token.key,
                                            "notification": {
                                                "title": `New Message Received`,
                                                "body": msg,
                                                "icon": `https://firebasestorage.googleapis.com/v0/b/olx-hackathon-19.appspot.com/o/profile%2Ficon.png?alt=media&token=f9a738f0-763b-4ea8-8581-e859240467bd`, 
                                                
                                            }
                                        }),
                                        success: function(response) {
                                            console.log(response);
                                            //Functions to run when notification is succesfully sent to reciever
                                        },
                                        error: function(xhr, status, error) {
                                            //Functions To Run When There was an error While Sending Notification
                                            console.log(xhr.error);
                                        }
                                    });
                                }
                            });
                        }).then(()=>{
                            firebase.auth().signOut().then(()=>{
                                console.log("Logged Out")
                            });
                        })
                        
                    }).catch((err)=>{
                        swal({
                            type: 'error',
                            title: 'Something went wrong!',
                            text: err.message,
                            confirmButtonColor: "#fa7c6e"
                        })
                    })
                  }).catch((err)=>{
                    swal({
                        type: 'error',
                        title: 'Something went wrong!',
                        text: err.message,
                        confirmButtonColor: "#fa7c6e"
                    })
                  })

                }
              })
        })
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
