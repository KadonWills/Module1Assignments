var mainDiv = document.getElementById("container");

var header = document.createElement("div");
header.setAttribute("class", "header");
var headerH1 = document.createElement("h1");
headerH1.setAttribute("class", "heading");
var headerH1FA = document.createElement("i");
headerH1FA.setAttribute("class", "fa fa-free-code-camp");
headerH1.appendChild(headerH1FA);
var headerH1Text = document.createTextNode("TIC TAC TOE");
headerH1.appendChild(headerH1Text);

header.appendChild(headerH1);
mainDiv.appendChild(header);


function player1Info() {
    swal({
        input: "text",
        text: "Please Select X or O for Player 1 to Start The Game.",
        confirmButtonText: "Next",
        confirmButtonColor: "rgb(233, 95, 95)"
    }).then((input) => {
        if (input.value === null || input.value === undefined || input.value === "") {
            player1Info();
        }
        else if (input.value === "x" || input.value === "X") {
            var player1 = "X";
            var player2 = "O"
            swal({
                text: "Player 1 is " + player1 + " and Player 2 is " + player2 + ".",
                confirmButtonText: "Next!",
                confirmButtonColor: "rgb(233, 95, 95)"
            }).then((result) => {
                swal({
                    text: player1 + "  has First Turn and " + player2 + " Has Second Turn.",
                    confirmButtonText: "Start Game!",
                    confirmButtonColor: "rgb(233, 95, 95)"
                }).then((result) => {
                    if (result.value) {
                        for (var i = 0; i < 5; i++) {
                            player1Array.push(player1);
                            player2Array.push("O")
                            array.push("O");
                            array.push(player1);
                        }
                    }
                    else {
                        alert("Please Click On Start Game button after Selecting Player!");
                        player1Info();
                    }
                })
            }

                )
        }
        else if (input.value === "o" || input.value === "O") {
            player1 = "O";
            player2 = "X"
            swal({
                text: "Player 1 is " + player1 + " and Player 2 is " + player2 + ".",
                confirmButtonText: "Next!",
                confirmButtonColor: "rgb(233, 95, 95)"
            }).then((result) => {
                swal({
                    text: player1 + "  has First Turn and " + player2 + " Has Second Turn.",
                    confirmButtonText: "Start Game!",
                    confirmButtonColor: "rgb(233, 95, 95)"
                }).then((result) => {
                    if (result.value) {
                        for (var i = 0; i < 5; i++) {
                            player1Array.push(player1);
                            player2Array.push("X")
                            array.push("X");
                            array.push(player1);
                        }
                    }
                    else {
                        alert("Please Click On Start Game button after Selecting Player!");
                        player1Info();
                    }
                })
            }

                )
        }
        else {
            player1Info();
        }
    })
}

player1Info();
var player1Array = [];
var player2Array = [];
var array = [];

var playBox = document.createElement("table");
playBox.setAttribute("id", "playBox");
playBox.setAttribute("class", "playBox");

var tr1 = document.createElement("tr");
tr1.setAttribute("class", "row1");
var tr2 = document.createElement("tr");
tr2.setAttribute("class", "row2");
var tr3 = document.createElement("tr");
tr3.setAttribute("class", "row3");

var box1 = document.createElement("td");
box1.setAttribute("class", "box");
box1.setAttribute("id", "box1");
box1.setAttribute("onClick", "print('box1')");

var box2 = document.createElement("td");
box2.setAttribute("class", "box");
box2.setAttribute("id", "box2");
box2.setAttribute("onClick", "print('box2')");

var box3 = document.createElement("td");
box3.setAttribute("class", "box");
box3.setAttribute("id", "box3");
box3.setAttribute("onClick", "print('box3')");

var box4 = document.createElement("td");
box4.setAttribute("class", "box");
box4.setAttribute("id", "box4");
box4.setAttribute("onClick", "print('box4')");

var box5 = document.createElement("td");
box5.setAttribute("class", "box");
box5.setAttribute("id", "box5");
box5.setAttribute("onClick", "print('box5')");

var box6 = document.createElement("td");
box6.setAttribute("class", "box");
box6.setAttribute("id", "box6");
box6.setAttribute("onClick", "print('box6')");

var box7 = document.createElement("td");
box7.setAttribute("class", "box");
box7.setAttribute("id", "box7");
box7.setAttribute("onClick", "print('box7')");

var box8 = document.createElement("td");
box8.setAttribute("class", "box");
box8.setAttribute("id", "box8");
box8.setAttribute("onClick", "print('box8')");

var box9 = document.createElement("td");
box9.setAttribute("class", "box");
box9.setAttribute("id", "box9");
box9.setAttribute("onClick", "print('box9')");

tr1.appendChild(box1);
tr1.appendChild(box2);
tr1.appendChild(box3);

tr2.appendChild(box4);
tr2.appendChild(box5);
tr2.appendChild(box6);

tr3.appendChild(box7);
tr3.appendChild(box8);
tr3.appendChild(box9);

playBox.appendChild(tr1);
playBox.appendChild(tr2);
playBox.appendChild(tr3);

mainDiv.appendChild(playBox);

var counter = 0;

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

var flag = false;

function print(id) {
    var a = document.getElementById(id);
    a.innerText = array[array.length - 1];
    var c = array[array.length - 1];
    array.pop();
    a.removeAttribute("onClick");
    counter++;
    if ((document.getElementById("box1").innerHTML != "") && (document.getElementById("box1").innerHTML == document.getElementById("box2").innerHTML) && (document.getElementById("box3").innerHTML == document.getElementById("box1").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box1').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box1").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);

        document.getElementById("box1").style.color = "rgb(233, 95, 95)";
        document.getElementById("box2").style.color = "rgb(233, 95, 95)";
        document.getElementById("box3").style.color = "rgb(233, 95, 95)";

        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box4").innerHTML != "") && (document.getElementById("box4").innerHTML == document.getElementById("box5").innerHTML) && (document.getElementById("box6").innerHTML == document.getElementById("box4").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box4').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box4").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box4").style.color = "rgb(233, 95, 95)";
        document.getElementById("box5").style.color = "rgb(233, 95, 95)";
        document.getElementById("box6").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box7").innerHTML != "") && (document.getElementById("box7").innerHTML == document.getElementById("box8").innerHTML) && (document.getElementById("box9").innerHTML == document.getElementById("box7").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box7').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box7").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box7").style.color = "rgb(233, 95, 95)";
        document.getElementById("box8").style.color = "rgb(233, 95, 95)";
        document.getElementById("box9").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box1").innerHTML != "") && (document.getElementById("box1").innerHTML == document.getElementById("box4").innerHTML) && (document.getElementById("box7").innerHTML == document.getElementById("box1").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box1').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box1").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box1").style.color = "rgb(233, 95, 95)";
        document.getElementById("box4").style.color = "rgb(233, 95, 95)";
        document.getElementById("box7").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box5").innerHTML != "") && (document.getElementById("box2").innerHTML == document.getElementById("box5").innerHTML) && (document.getElementById("box8").innerHTML == document.getElementById("box2").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box5').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box5").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box2").style.color = "rgb(233, 95, 95)";
        document.getElementById("box5").style.color = "rgb(233, 95, 95)";
        document.getElementById("box8").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box3").innerHTML != "") && (document.getElementById("box3").innerHTML == document.getElementById("box6").innerHTML) && (document.getElementById("box9").innerHTML == document.getElementById("box3").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box3').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box3").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box3").style.color = "rgb(233, 95, 95)";
        document.getElementById("box6").style.color = "rgb(233, 95, 95)";
        document.getElementById("box9").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box1").innerHTML != "") && (document.getElementById("box1").innerHTML == document.getElementById("box5").innerHTML) && (document.getElementById("box9").innerHTML == document.getElementById("box1").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box1').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box1").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box1").style.color = "rgb(233, 95, 95)";
        document.getElementById("box5").style.color = "rgb(233, 95, 95)";
        document.getElementById("box9").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

    else if ((document.getElementById("box3").innerHTML != "") && (document.getElementById("box3").innerHTML == document.getElementById("box5").innerHTML) && (document.getElementById("box7").innerHTML == document.getElementById("box3").innerHTML)) {
        swal({
            title: "Congratulations!",
            text: "Player " + document.getElementById('box3').innerText + " WON!",
            type: "success",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        flag = true;
        var object = document.getElementById("box3").innerText;
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-trophy");
        win.appendChild(winFa);
        var winText = document.createTextNode("-  Player " + object + " Has Won!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box3").style.color = "rgb(233, 95, 95)";
        document.getElementById("box5").style.color = "rgb(233, 95, 95)";
        document.getElementById("box7").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }
    if (counter == 9 && flag==false) {
        swal({
            title: "Oops!",
            text: "Match Draw!",
            type: "error",
            confirmButtonText: "Play Again!",
            showCancelButton: true,
            cancelButtonText: "OK",
            cancelButtonColor: "rgb(233, 95, 95)",
        }).then((result) => {
            if (result.value) {
                location.reload();
            }
        })
        var win = document.createElement("h1");
        win.setAttribute("class","win");
        var winFa = document.createElement("i");
        winFa.setAttribute("class","fa fa-frown-o");
        win.appendChild(winFa);
        var winText = document.createTextNode("- Match Drawn!");
        win.appendChild(winText);
        mainDiv.insertBefore(win,playBox);
        document.getElementById("box1").style.color = "rgb(233, 95, 95)";
        document.getElementById("box2").style.color = "rgb(233, 95, 95)";
        document.getElementById("box3").style.color = "rgb(233, 95, 95)";
        document.getElementById("box4").style.color = "rgb(233, 95, 95)";
        document.getElementById("box5").style.color = "rgb(233, 95, 95)";
        document.getElementById("box6").style.color = "rgb(233, 95, 95)";
        document.getElementById("box7").style.color = "rgb(233, 95, 95)";
        document.getElementById("box8").style.color = "rgb(233, 95, 95)";
        document.getElementById("box9").style.color = "rgb(233, 95, 95)";
        var b = document.getElementsByTagName("td");
        for (var j = 0; j < b.length; j++) {
            b[j].removeAttribute("onClick");
        }
    }

}