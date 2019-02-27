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
window.addEventListener("load",()=>{
    dashboard();
})
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + userId).once("value").then((userD) => {
            const userData = userD.val();
            document.getElementById("name").innerHTML = userData.name + ` - <span id='pic'><img src=${userData.profilePic} height='40px' width='40px'></span>`;
            document.getElementById("p").innerHTML = `<img src='${userData.profilePic}' height='100px' width='100px'>`
            document.getElementById("n").innerHTML = `${userData.name}`;
            document.getElementById("ema").innerHTML = `Email <br /> <span class='tp'> ( ${userData.email} ) </span>`;
            document.getElementById("add").innerHTML = `Address <br /> <span class='tp'> ( ${userData.address} ) </span>`
        })
        // .then(() => {
        //     fetch('http://ip-api.com/json')
        //         .then(function (response) {
        //             return response.json();
        //         })
        //         .then(function (location) {
        //             document.getElementById("location").innerHTML = `<i class='fa fa-map-marker'></i> ${location.country}`;
        //             document.getElementById("location2").innerHTML = `<i class='fa fa-map-marker'></i> ${location.country}`
        //         })
        //     }).catch((err)=>{
        //         console.log("ET LOST")
        //     })
       
        if ('serviceWorker' in navigator) {
        
            navigator.serviceWorker.register('../olxhsw.js').then(function(registration) {
    
                firebase.messaging().useServiceWorker(registration);
    
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
    
                        function saveMessagingDeviceToken() {
    
                            firebase.messaging().getToken().then(function(currentToken) {
                                if (currentToken) {
                                    console.log('Got FCM device token:', currentToken);
               
                                    firebase.database().ref('/fcmTokens').child(currentToken)
                                        .set(firebase.auth().currentUser.uid);
                                } else {

                                    requestforpermision()
                                }
                            }).catch(function(error) {
                                console.error('Unable to get messaging token.', error);
                            });
                        } 
    
                        function requestforpermision() {
                            firebase.messaging().requestPermission().then(function() {
                       
                                saveMessagingDeviceToken();
                            }).catch(function(error) {
                                console.error('Unable to get permission to notify.', error);
                                alert("Your Notifications Are Disabled")
                            });
    
                        } 
                        requestforpermision()
                    }
                });
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            });
    
        }

    }
    else {
        // user is not logged in
    }

})

firebase.messaging().onMessage(function(payload) {
    console.log(payload)
});


function logout() {
    firebase.auth().signOut().then(() => {
        location = '../html/signin.html'
    }).catch((error) => {
        swal({
            type: 'error',
            title: 'Something went wrong!',
            text: error.message,
            confirmButtonColor: "#fa7c6e"
        })
    })
}

function dashboard() {
    document.getElementById("info").innerHTML = `<i class="fa fa-star-o"></i> This is what you can do here.`
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").innerHTML = `
                      <div class='dashboard'>
                      <p class='line'></p>
                        <div class='dashboardBtns'>
                        <div class='row'>
                        <button class='resultsAll' title='Create Ad' onclick='creatingAd()'><i class='fa fa-plus'> </i> <br />Create Ad</button>
                        </div>
                        <div class='row'>
                        <button class='pA' title='Posted Ads' onclick='yourAds()'><i class='fa fa-shopping-cart'> </i> <br /> Posted Ads </button></div>
                        <div class='row'>
                        <button class='mC' title='My Chats' onclick='myChats()'><i class='fa fa-envelope'> </i> <br /> My Chats </button></div>
                        </div>
 
                        </div>
                      </div>
                  `
}

function yourAds() {
    const user = firebase.auth().currentUser.uid;
    var counter = 0;
    document.getElementById("info").innerHTML = `<i class="fa fa-star-o"></i> Your are seeing your ads and people who respond.`
    document.getElementById("content").innerHTML = "";
    document.getElementById("wait").style.display = 'block';
    firebase.database().ref("ads/").once("value").then((ads) => {
        document.getElementById("wait").style.display = 'none';
        var data = ads.val();

        var flag;
        for (var key in data) {
            for (var key2 in data[key]) {
                if (key2 === user) {
                    flag = true;
                    for (var key3 in data[key][key2]) {
                        counter++;
                        document.getElementById("content").innerHTML += `
                        <div class='dashboard'>
                            <p class='line'></p>
                            <div>
                                <p class='question' style="font-size:140%; text-align:center; font-family:'Oswald'">
                                    ${key.toUpperCase()}
                                    <button class='btn btn-danger' onclick='delMyAd("${key3}")'><i class='fa fa-trash'></i></button>
                                </p>
                                <div class='myAds'>
                                    <p class='adImg'><img src='${data[key][key2][key3].pic}'></p>
                                    <p class='adName'>${data[key][key2][key3].name}</p>
                                    <p class='adDescription'><i class='fa fa-quote-left'></i> <br /> ${data[key][key2][key3].description} <br /> <i class='fa fa-quote-left'></i></p>
                                    <p><button class='btn btn-info' data-toggle="collapse" data-target="${"#ad" + counter}" style='width:80%;'><i class='fa fa-angle-double-down'></i> More Info</button></p>
                                    <div class='collapse' id='${"ad" + counter}'>
                                        <p class='adMaY'>Modal <br /> <span class='tp'> ( ${data[key][key2][key3].modal} ) </span></p>
                                        <p class='adMaY'>Price <br /> <span class='tp'> ( ${data[key][key2][key3].price} ) </span></p>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    `
                    }
                }
            }
        }
        if(flag!==true){
            document.getElementById("content").innerHTML = `
                <div class='dashboard'>
                    <p class='line'></p>
                    <div class='chats'>
                        <p class='noChats'>No Ads Right Now!</p>
                    </div>
                </div>
            `
        }
    })
}

function creatingAd() {
    document.getElementById("info").innerHTML = `<i class="fa fa-star-o"></i> Your are creating an Ad.`
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").innerHTML = `
    <div class='dashboard'>
        <p class='line'></p>
        <div class='adForm'>
        <form action="JavaScript:void(0)" onsubmit="cA()">
        <div class="alert alert-info" style="text-align:center; width:100%;  cursor:pointer" title="Product Details">
        <span>
            <i class="fa fa-plus"></i>
        </span> Product Details
    </div>
        <input type="text" class="input" id="pName" placeholder="name" required title="Product Name">
    <br />
        <input type="text" class="input" id="pModal" placeholder="modal" required title="Modal">
    <br/>
    <input type="number" class="input" id="pP" placeholder="price" required title="Price">
        <small id="error" style="color:red; float:right; display:none;"></small>
    <br />
    <p style="color:#ff5722">product pic
        <span style="color:black; font-size:80%;"> ( 1 x 1 Prefered) </span>
    </p>
    <input type="file" id="pPic" required title="Upload Pic">
    <br />
    <div class="form-group" style="margin:20px 0px 10px; color:#ff5722">
        <label for="comment">Description :</label>
        <textarea class="form-control" rows="5" id="pDescription" required title="Description"></textarea>
    </div>
    <div class="form-group" style="margin:20px 0px 10px; color:#ff5722">
        <label for="comment">Address :</label>
        <textarea class="form-control" rows="5" id="pAddress" required title="Address"></textarea>
    </div>
    <div class="form-group">
      <label style='color:#ff5722'>Select Category (select one)</label>
      <select class="form-control" id="pCategory" >
        <option selected="selected" value='cars'>Cars</option>
        <option value='mobiles'>Mobiles</option>
        <option value='bikes'>Bikes</option>
        <option value='electronics'>Electronics</option>
        <option value='furniture'>Furniture</option>
        <option value='fashion'>Fashion</option>
      </select>
    </div>
    <div id="loader1">
        <i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i> Please Wait..</div>
        <button class="btn btn-info" style="width:100%; margin-top:5px;" type="submit" title="Add">
        <i class="fa fa-plus"></i> create ad</button>
    </form>
    </div>
    </div>
    `
}
function cA() {
    var name = document.getElementById("pName").value;
    var modal = document.getElementById("pModal").value;
    var price = document.getElementById("pP").value;
    var description = document.getElementById("pDescription").value;
    var address = document.getElementById("pAddress").value;
    var pic = document.getElementById("pPic").files[0];
    var e = document.getElementById("pCategory");
    var category = e.options[e.selectedIndex].value;

    if (Number(price) > 0) {

        document.getElementById("error").style.display = 'none';
        document.getElementById("error").innerHTML = ""
        document.getElementById("loader1").style.display = 'block';

        var pObj = {
            name,
            modal,
            price,
            description,
            address,
        }
        let userUid = firebase.auth().currentUser.uid;
        firebase.storage().ref().child(`products/${pic.name}`).put(pic).then((url) => {
            url.ref.getDownloadURL().then((success) => {
                pObj.pic = success;
                firebase.database().ref("users/" + userUid).once("value", (data) => {
                    const uData = data.val();
                    pObj.username = uData.name;
                    pObj.userpic = uData.profilePic;
                    pObj.useruid = userUid;
                    firebase.database().ref("ads/" + category + "/" + userUid).push(pObj)
                        .then(() => {
                            document.getElementById("loader1").style.display = 'none';
                            swal({
                                type: 'success',
                                title: 'Ad Created!',
                                text: 'Your given Ad Created Succesfully!',
                                confirmButtonText: "Ok",
                                confirmButtonColor: "#fa7c6e"
                            })
                        })
                        .catch((err) => {
                            document.getElementById("loader1").style.display = 'none';
                            swal({
                                type: 'error',
                                title: 'Something Went Wrong!',
                                text: err.message,
                                confirmButtonText: "Ok",
                                confirmButtonColor: "#fa7c6e"
                            })
                        })
                })

            })
        })

    }

    else {
        document.getElementById("error").style.display = 'block';
        document.getElementById("error").innerHTML = "year cant be in negative values."
    }
}

function myChats() {
    const uid = firebase.auth().currentUser.uid;
    document.getElementById("content").innerHTML = "";
    document.getElementById("info").innerHTML = `<i class="fa fa-star-o"></i> Your Chats.`
    firebase.database().ref("chats/"+uid).once("value",(data)=>{
        const d = data.val();
        if(d!==null){
            // document.getElementById("content").innerHTML = "";
            var array = [];
            for(var key in d){
                array.push(key);
                firebase.database().ref("users/"+key).on("value",(d)=>{
                    var u = d.val();
                     document.getElementById("content").innerHTML += `
                        <div class='dashboard'>
                            <p class='line'></p>
                            <div class='chats'>
                                <div class='chatHeader' style='background-color:white; cursor: pointer;' onclick='getChats("${array[0]}" , "${u.profilePic}" , "${u.name}")'>
                                <p class='backButton'><i class='fa fa-angle-right'></i></p>
                                <p class='Userdp'><img src='${u.profilePic}' height='40px' width='40px'></p>
                                <p class='cNameandImg'>${u.name}</p>
                                </div>
                            </div>
                            </div>
                        `
                        array.shift();
                })
                
            }
        }
        else if(d===null){
            document.getElementById("content").innerHTML = `
                <div class='dashboard'>
                    <p class='line'></p>
                    <div class='chats'>
                        <p class='noChats'>No Chats Right Now!</p>
                    </div>
                </div>
            `
        }
    })
}

function openNav() {
    document.getElementById("rNav").style.overflow = "auto";
    document.getElementById("rNav").style.width = "60%";
}
function closeNav() {
    document.getElementById("rNav").style.overflow = "hidden";
    document.getElementById("rNav").style.width = "0";
}

function getChats(id,pic,name){

    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref("chats/"+uid+"/"+id).on("value",(chats)=>{
        var c = chats.val();
        // document.getElementById("content").innerHTML = "";
        document.getElementById("content").innerHTML = `
            <div class='dashboard'>
            <p class='line'></p>
            <div class='chatBox'>
                <div class='chatHeader'>
                <p class='backButton' onclick='myChats()'><i class='fa fa-angle-left'></i></p>
                <p class='Userdp'><img src='${pic}' height='40px' width='40px'></p>
                <p class='cNameandImg'>${name}</p>
                </div>
                <div id='c'>
                </div>
                <div class='chatFooter'>
                <input id="msg" placeholder='Send Message'><button onclick='sendMsg("${id}")'><i class='fa fa-send-o'></i></button>
                </div>
                </div>
            </div>
        `
        for(var key in c){
            if(c[key].name==="sender"){
                document.getElementById("c").innerHTML +=`
                    <p class='senderMsg'>
                        ${c[key].msg}
                    </p>
                `
            }
            else if(c[key].name==="me"){
                document.getElementById("c").innerHTML +=`
                <p class='myMsg'>
                   ${c[key].msg}
                </p>
            `
         
            }
        }
    })
}
function sendMsg(id){
    const uid = firebase.auth().currentUser.uid;
    var msg = document.getElementById("msg").value;
    if(msg!=="" && msg!==" "&&msg!==undefined&&msg!==null){
        var obj = {
            msg,
            name : "me",
          }
        firebase.database().ref("chats/"+uid+"/"+id).push(obj).then(()=>{
            var obj2 = {
                msg,
                name : "sender",
              }
              firebase.database().ref("chats/"+id+"/"+uid).push(obj2).then(()=>{


                firebase.database().ref("/fcmTokens").once("value", function(snapshot) {
                    snapshot.forEach(function(token) {
                        if (token.val() == id) { //Getting the token of the reciever using  if condition..!   
                        
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
                });
            


              })
        })
    }
    console.log(id)
}