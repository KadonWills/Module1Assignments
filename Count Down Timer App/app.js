function check() {
    var a = document.getElementById("seconds");
    var b = document.getElementById("seconds").selectedIndex;
    document.getElementById("sec").innerHTML = a.selectedIndex + "s"
    if (a.selectedIndex != 0) {
        setInterval(function () {
            document.getElementById("contain").style.height = "0";
            document.getElementById("area").style.display = 'block';
            setInterval(function () {
                document.getElementById("contain").style.display = 'none';
                document.getElementById("abc").style.transition = a.selectedIndex + "s"
                document.getElementById("abc").style.height = "100vh"
            }, 300)
        }, 500)
    }
    setInterval(function () {
        if (b > 0) {
            document.getElementById("target").innerHTML = b;
        }
        b = b - 1;
        if (b < 0) {
            document.getElementById("target").style.fontSize = '250%';
            document.getElementById("target").innerHTML = "<span style='color:#8d4545; font-family:hobo std';>" + "<i class='fa fa-close'>" + "</i>" + "TIME UP!" + "</span> " + "<br />" + "<span style='font-size:60%;'>" + "<button class='restartBtn' onclick='location.reload();'>" + "<i class='fa fa-refresh' style='color:white;'>" + "</i>" + " RESTART" + "</button>" + "</span>";
            var z = 0;
        }
    }, 1000)
}
var count = 0;
setInterval(function () {
    count++;
    if (count === 1) {
        document.getElementById("d").style.backgroundColor = 'white';
        document.getElementById("a").style.backgroundColor = 'rgb(15, 179, 255)';
    }
    if (count === 2) {
        document.getElementById("a").style.backgroundColor = 'white';
        document.getElementById("b").style.backgroundColor = 'rgb(15, 179, 255)';
    }
    if (count == 3) {
        document.getElementById("b").style.backgroundColor = 'white';
        document.getElementById("c").style.backgroundColor = 'rgb(15, 179, 255)';
    }
    if (count === 4) {
        document.getElementById("c").style.backgroundColor = 'white';
        document.getElementById("d").style.backgroundColor = '#f37f7f';
    }
    if (count === 5) {
        document.getElementById("d").style.backgroundColor = 'white';
        document.getElementById("e").style.backgroundColor = 'rgb(15, 179, 255)';
    }
    if (count === 6) {
        document.getElementById("e").style.backgroundColor = 'white';
        document.getElementById("f").style.backgroundColor = 'rgb(15, 179, 255)';
    }
    if (count === 7) {
        document.getElementById("f").style.backgroundColor = 'white';
        document.getElementById("g").style.backgroundColor = 'rgb(15, 179, 255)';
    }
    if (count == 8) {
        document.getElementById("g").style.backgroundColor = 'white';
        document.getElementById("d").style.backgroundColor = '#f37f7f';
    }
    if (count === 9) {
        count = 0;
    }
}, 500)
