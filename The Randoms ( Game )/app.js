var mainDiv = document.getElementById("mainDiv");
var userName = prompt("Please! Enter Your Name First?...")
var userNameAdjusted = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
swal("Hey! " + userNameAdjusted, "Welcome To The Game!. <br /> <b>( The Randoms! )</b>", "info")

var header = document.createElement("div");
header.setAttribute("class", "header");

var logoFA = document.createElement("i");
logoFA.setAttribute("class", "fa fa-codepen");

var logo = document.createElement("h1");
logo.setAttribute("class", "logo");
logo.appendChild(logoFA);
var logoText = document.createTextNode("The Randoms");
logo.appendChild(logoText);
var subLogo = document.createElement("p");
subLogo.setAttribute("class", "subLogo");
var subLogoText = document.createTextNode("A Game Where Luck Matters Not Wisdom!");
subLogo.appendChild(subLogoText);


header.appendChild(logo);
header.appendChild(subLogo);
mainDiv.appendChild(header);

var gameheading = document.createElement("h1");
gameheading.setAttribute("class", "gameHeading");
var directionFa = document.createElement("i");
directionFa.setAttribute("class", "fa fa-angle-double-down");
gameheading.appendChild(directionFa);
var gameheadingText = document.createTextNode("Playing Area!");
gameheading.appendChild(gameheadingText);


mainDiv.appendChild(gameheading);

var playBox = document.createElement("table");
playBox.setAttribute("class", "playBox");


var tr1 = document.createElement("tr");


var tr2 = document.createElement("tr");


var tr3 = document.createElement("tr");


playBox.appendChild(tr1);
playBox.appendChild(tr2);
playBox.appendChild(tr3);

mainDiv.appendChild(playBox);

var box1 = document.createElement("td");
box1.setAttribute("id", "box1");
box1.setAttribute("class", "box");
box1.setAttribute("onClick", "printNum('box1')")
var box1Text = document.createElement("i");
box1Text.setAttribute("class", "fa fa-question-circle");
box1.appendChild(box1Text);

var box2 = document.createElement("td");
box2.setAttribute("id", "box2");
box2.setAttribute("class", "box");
box2.setAttribute("onClick", "printNum('box2')")
var box2Text = document.createElement("i");
box2Text.setAttribute("class", "fa fa-question-circle");
box2.appendChild(box2Text);

var box3 = document.createElement("td");
box3.setAttribute("id", "box3");
box3.setAttribute("class", "box");
box3.setAttribute("onClick", "printNum('box3')")
var box3Text = document.createElement("i");
box3Text.setAttribute("class", "fa fa-question-circle");
box3.appendChild(box3Text);

var box4 = document.createElement("td");
box4.setAttribute("id", "box4");
box4.setAttribute("class", "box");
box4.setAttribute("onClick", "printNum('box4')")
var box4Text = document.createElement("i");
box4Text.setAttribute("class", "fa fa-question-circle");
box4.appendChild(box4Text);

var box5 = document.createElement("td");
box5.setAttribute("id", "box5");
box5.setAttribute("class", "box");
box5.setAttribute("onClick", "printNum('box5')")
var box5Text = document.createElement("i");
box5Text.setAttribute("class", "fa fa-question-circle");
box5.appendChild(box5Text);

var box6 = document.createElement("td");
box6.setAttribute("id", "box6");
box6.setAttribute("class", "box");
box6.setAttribute("onClick", "printNum('box6')")
var box6Text = document.createElement("i");
box6Text.setAttribute("class", "fa fa-question-circle");
box6.appendChild(box6Text);

var box7 = document.createElement("td");
box7.setAttribute("id", "box7");
box7.setAttribute("class", "box");
box7.setAttribute("onClick", "printNum('box7')")
var box7Text = document.createElement("i");
box7Text.setAttribute("class", "fa fa-question-circle");
box7.appendChild(box7Text);

var box8 = document.createElement("td");
box8.setAttribute("id", "box8");
box8.setAttribute("class", "box");
box8.setAttribute("onClick", "printNum('box8')")
var box8Text = document.createElement("i");
box8Text.setAttribute("class", "fa fa-question-circle");
box8.appendChild(box8Text);

var box9 = document.createElement("td");
box9.setAttribute("id", "box9");
box9.setAttribute("class", "box");
box9.setAttribute("onClick", "printNum('box9')")
var box9Text = document.createElement("i");
box9Text.setAttribute("class", "fa fa-question-circle");
box9.appendChild(box9Text);

tr1.appendChild(box1);
tr1.appendChild(box2);
tr1.appendChild(box3);
tr2.appendChild(box4);
tr2.appendChild(box5);
tr2.appendChild(box6);
tr3.appendChild(box7);
tr3.appendChild(box8);
tr3.appendChild(box9);

var footer = document.createElement("p");
footer.setAttribute("class", "footer");
var footertext = document.createTextNode("Developed and Programmed By : Sammad Ali.");
footer.appendChild(footertext);
var facebook = document.createElement("i");
facebook.setAttribute("class", "fa fa-facebook-official");
footer.appendChild(facebook);
var twiter = document.createElement("i");
twiter.setAttribute("class", "fa fa-twitter-square");
footer.appendChild(twiter);
var google = document.createElement("i");
google.setAttribute("class", "fa fa-google-plus-square");
footer.appendChild(google);
mainDiv.appendChild(footer)

var numArray = [];
var increment = 0;

function printNum(id) {
    var a = document.getElementById(id);
    a.innerHTML = "";
    var value = Math.ceil(Math.random() * 9);
    var num = document.createTextNode(value);
    a.appendChild(num);
    document.getElementById(id).className += " after";
    numArray.push(a.innerText);
    a.removeAttribute('onClick');
    increment++;

    for (var i = 0; i <= numArray.length; i++) {
        for (var j = i; j <= numArray.length; j++) {
            for (var x = 0; x <= numArray.length; x++) {
                if ((i != j && i != x && j != x) && (numArray[i] == numArray[j] && numArray[i] == numArray[x]) && numArray[j] == numArray[x]) {
                    var tdss = document.getElementsByTagName("td");
                    for(var v = 0; v<tdss.length; v++){
                        tdss[v].removeAttribute("onClick");
                    }
                    swal({
                        title: 'Congratulations!',
                        text: "You Won!",
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Play Again!',
                        cancelButtonText: "Exit",
                    }).then((result) => {
                        if (result.value) {
                            increment = 0;
                            numArray = [];
                            var tds = document.getElementsByTagName("td");
                            for (var z = 0; z < tds.length; z++) {
                                tds[z].innerHTML = "";
                                // tds[z].style.backgroundColor = "rgb(48, 164, 241)";
                                // tds[z].style.border = "2px solid rgb(230, 228, 228)";
                                tds[z].className = "box";
                            }

                            var questionCircle1 = document.createElement("i");
                            questionCircle1.setAttribute("class", "fa fa-question-circle");
                            var questionCircle2 = document.createElement("i");
                            questionCircle2.setAttribute("class", "fa fa-question-circle");
                            var questionCircle3 = document.createElement("i");
                            questionCircle3.setAttribute("class", "fa fa-question-circle");
                            var questionCircle4 = document.createElement("i");
                            questionCircle4.setAttribute("class", "fa fa-question-circle");
                            var questionCircle5 = document.createElement("i");
                            questionCircle5.setAttribute("class", "fa fa-question-circle");
                            var questionCircle6 = document.createElement("i");
                            questionCircle6.setAttribute("class", "fa fa-question-circle");
                            var questionCircle7 = document.createElement("i");
                            questionCircle7.setAttribute("class", "fa fa-question-circle");
                            var questionCircle8 = document.createElement("i");
                            questionCircle8.setAttribute("class", "fa fa-question-circle");
                            var questionCircle9 = document.createElement("i");
                            questionCircle9.setAttribute("class", "fa fa-question-circle");

                            tds[0].appendChild(questionCircle1);
                            tds[1].appendChild(questionCircle2);
                            tds[2].appendChild(questionCircle3);
                            tds[3].appendChild(questionCircle4);
                            tds[4].appendChild(questionCircle5);
                            tds[5].appendChild(questionCircle6);
                            tds[6].appendChild(questionCircle7);
                            tds[7].appendChild(questionCircle8);
                            tds[8].appendChild(questionCircle9);

                            tds[0].removeAttribute("onClick");
                            tds[1].removeAttribute("onClick");
                            tds[2].removeAttribute("onClick");
                            tds[3].removeAttribute("onClick");
                            tds[4].removeAttribute("onClick");
                            tds[5].removeAttribute("onClick");
                            tds[6].removeAttribute("onClick");
                            tds[7].removeAttribute("onClick");
                            tds[8].removeAttribute("onClick");

                            tds[0].setAttribute("onClick", "printNum('box1')");
                            tds[1].setAttribute("onClick", "printNum('box2')");
                            tds[2].setAttribute("onClick", "printNum('box3')");
                            tds[3].setAttribute("onClick", "printNum('box4')");
                            tds[4].setAttribute("onClick", "printNum('box5')");
                            tds[5].setAttribute("onClick", "printNum('box6')");
                            tds[6].setAttribute("onClick", "printNum('box7')");
                            tds[7].setAttribute("onClick", "printNum('box8')");
                            tds[8].setAttribute("onClick", "printNum('box9')");
                        }
                    })
                }
            }
        }
    }

    if (increment == 9) {
        swal({
            type: 'error',
            title: 'Try Again!',
            text: 'You Loss!',
        })
        increment = 0;
        numArray = [];
        var tds = document.getElementsByTagName("td");
        for (var z = 0; z < tds.length; z++) {
            tds[z].innerHTML = "";
            // tds[z].style.backgroundColor = "rgb(48, 164, 241)";
            // tds[z].style.border = "2px solid rgb(230, 228, 228)";
            tds[z].className = "box";
        }

        var questionCircle1 = document.createElement("i");
        questionCircle1.setAttribute("class", "fa fa-question-circle");
        var questionCircle2 = document.createElement("i");
        questionCircle2.setAttribute("class", "fa fa-question-circle");
        var questionCircle3 = document.createElement("i");
        questionCircle3.setAttribute("class", "fa fa-question-circle");
        var questionCircle4 = document.createElement("i");
        questionCircle4.setAttribute("class", "fa fa-question-circle");
        var questionCircle5 = document.createElement("i");
        questionCircle5.setAttribute("class", "fa fa-question-circle");
        var questionCircle6 = document.createElement("i");
        questionCircle6.setAttribute("class", "fa fa-question-circle");
        var questionCircle7 = document.createElement("i");
        questionCircle7.setAttribute("class", "fa fa-question-circle");
        var questionCircle8 = document.createElement("i");
        questionCircle8.setAttribute("class", "fa fa-question-circle");
        var questionCircle9 = document.createElement("i");
        questionCircle9.setAttribute("class", "fa fa-question-circle");

        tds[0].appendChild(questionCircle1);
        tds[1].appendChild(questionCircle2);
        tds[2].appendChild(questionCircle3);
        tds[3].appendChild(questionCircle4);
        tds[4].appendChild(questionCircle5);
        tds[5].appendChild(questionCircle6);
        tds[6].appendChild(questionCircle7);
        tds[7].appendChild(questionCircle8);
        tds[8].appendChild(questionCircle9);

        tds[0].removeAttribute("onClick");
        tds[1].removeAttribute("onClick");
        tds[2].removeAttribute("onClick");
        tds[3].removeAttribute("onClick");
        tds[4].removeAttribute("onClick");
        tds[5].removeAttribute("onClick");
        tds[6].removeAttribute("onClick");
        tds[7].removeAttribute("onClick");
        tds[8].removeAttribute("onClick");

        tds[0].setAttribute("onClick", "printNum('box1')");
        tds[1].setAttribute("onClick", "printNum('box2')");
        tds[2].setAttribute("onClick", "printNum('box3')");
        tds[3].setAttribute("onClick", "printNum('box4')");
        tds[4].setAttribute("onClick", "printNum('box5')");
        tds[5].setAttribute("onClick", "printNum('box6')");
        tds[6].setAttribute("onClick", "printNum('box7')");
        tds[7].setAttribute("onClick", "printNum('box8')");
        tds[8].setAttribute("onClick", "printNum('box9')");
    }
}
