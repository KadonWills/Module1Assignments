function glossary(id, numid) {
    document.getElementById("list1").style.display = "none";
    document.getElementById("list2").style.display = "none";
    document.getElementById("list3").style.display = "none";
    document.getElementById("list4").style.display = "none";
    document.getElementById("list5").style.display = "none";

    document.getElementById(id).style.display = 'block';

    document.getElementById("l1").style.color = 'rgba(5, 180, 180, 0.877)';
    document.getElementById("l2").style.color = 'rgba(5, 180, 180, 0.877)';
    document.getElementById("l3").style.color = 'rgba(5, 180, 180, 0.877)';
    document.getElementById("l4").style.color = 'rgba(5, 180, 180, 0.877)';
    document.getElementById("l5").style.color = 'rgba(5, 180, 180, 0.877)';

    document.getElementById(numid).style.color = "orange";
}

var movies = {
    hollywood: {
        avengers: {
            name: "Avengers Age of Ultron!",
            Category: "Hollywood",
            type: "Action , Thriller",
            releasedDate: "Apr 27 2017",
            runTime: "2h 29mins",
            IDMBRating: "8.9"
        },
        blackpanther: {
            name: "Black Panther!",
            Category: "Hollywood",
            type: "Action , Adventure , Sci-Fi",
            releasedDate: "Feb 16 2018",
            runTime: "2h 14mins",
            IDMBRating: "7.4"
        },
        spiderman: {
            name: "Spiderman Home Coming!",
            Category: "Hollywood",
            type: "Action , Adventure",
            releasedDate: "July 07 2017",
            runTime: "2h 13mins",
            IDMBRating: "7.8"
        },
        thepredator: {
            name: "The Predator!",
            Category: "Hollywood",
            type: "Horror , Thriller",
            releasedDate: "Sep 14 2018",
            runTime: "1h 47mins",
            IDMBRating: "4.3"
        },
        wonderwomen: {
            name: "Wonder Women!",
            Category: "Hollywood",
            type: "Fantasy , War",
            releasedDate: "May 30 2017",
            runTime: "2h 21mins",
            IDMBRating: "8.7"
        },
    },
    bollywood: {
        sanju: {
            name: "Sanju!",
            Category: "Bollywood",
            type: "Biography , Drama",
            releasedDate: "July 29 2018",
            runTime: "2h 35mins",
            IDMBRating: "7.4"
        },
        gold: {
            name: "Gold!",
            Category: "Bollywood",
            type: "History , Drama",
            releasedDate: "Aug 15 2018",
            runTime: "2h 31mins",
            IDMBRating: "6.6"
        },
        sultan: {
            name: "Sultan!",
            Category: "Bollywood",
            type: "Sport , Action",
            releasedDate: "July 06 2016",
            runTime: "2h 50mins",
            IDMBRating: "5.6"
        },
        dangal: {
            name: "Dangal!",
            Category: "Bollywood",
            type: "Biography , Action",
            releasedDate: "Dec 23 2016",
            runTime: "2h 41mins",
            IDMBRating: "7.6"
        },
        pk: {
            name: "PK!",
            Category: "Bollywood",
            type: "Comedy , Family",
            releasedDate: "Mar 18 2016",
            runTime: "2h 25mins",
            IDMBRating: "8.6"
        },
    },
    tollywood: {
        bahubali: {
            name: "Bahubali!",
            Category: "Tollywood",
            type: "Drama , History",
            releasedDate: "Feb 08 2016",
            runTime: "2h 13mins",
            IDMBRating: "7.3"
        },
        superkhiladi: {
            name: "Super Khiladi!",
            Category: "Tollywood",
            type: "Action , Comedy",
            releasedDate: "Mar 23 2017",
            runTime: "2h 43mins",
            IDMBRating: "6.1"
        },
        rakshak: {
            name: "Rakshak!",
            Category: "Tollywood",
            type: "Action , Romance",
            releasedDate: "July 14 2016",
            runTime: "2h 08mins",
            IDMBRating: "7.3"
        },
        kanchana: {
            name: "Kanchana!",
            Category: "Tollywood",
            type: "Horror , Crime",
            releasedDate: "Sep 22 2015",
            runTime: "2h 32mins",
            IDMBRating: "4.3"
        },
        khatarnakkhiladi: {
            name: "Khatarnak Khiladi!",
            Category: "Tollywood",
            type: "Action , Drama",
            releasedDate: "Nov 12 2018",
            runTime: "2h 01mins",
            IDMBRating: "3.3"
        },
    },
    lollywood: {
        namaloomafrad: {
            name: "Na Maloom Afrad!",
            Category: "Lollywood",
            type: "Comedy , Thriller",
            releasedDate: "Oct 06 2014",
            runTime: "2h 17mins",
            IDMBRating: "6.4"
        },
        waar: {
            name: "Waar!",
            Category: "Lollywood",
            type: "Action , Thriller",
            releasedDate: "Oct 16 2013",
            runTime: "2h 10mins",
            IDMBRating: "5.4"
        },
        veerna: {
            name: "Veerna!",
            Category: "Lollywood",
            type: "Romance , Drama",
            releasedDate: "Nov 17 2017",
            runTime: "2h 03mins",
            IDMBRating: "6.9"
        },
        parchi: {
            name: "Parchi!",
            Category: "Lollywood",
            type: "Comedy , Crime",
            releasedDate: "Jan 05 2018",
            runTime: "2h 17mins",
            IDMBRating: "5.4"
        },
        mainhoonshahidafridi: {
            name: "Main Hoon Shahid Afridi!",
            Category: "Lollywood",
            type: "Musical , Sport",
            releasedDate: "Aug 23 2013",
            runTime: "2h 10mins",
            IDMBRating: "6.1"
        },
    },
    cartoons: {
        incredibles: {
            name: "Incredibles!",
            Category: "Hollywood",
            type: "Animation , Fantasy",
            releasedDate: "Jun 15 2018",
            runTime: "1h 58mins",
            IDMBRating: "5.5"
        },
        moana: {
            name: "Moana!",
            Category: "Hollywood",
            type: "Animation , Comedy",
            releasedDate: "Nov 25 2016",
            runTime: "1h 47mins",
            IDMBRating: "7.5"
        },
        frozen: {
            name: "Frozen!",
            Category: "Hollywood",
            type: "Animation , Adventure",
            releasedDate: "Nov 27 2013",
            runTime: "1h 48mins",
            IDMBRating: "5.8"
        },
        coco: {
            name: "Coco!",
            Category: "Hollywood",
            type: "Animation , Music",
            releasedDate: "Nov 21 2017",
            runTime: "1h 45mins",
            IDMBRating: "6.5"
        },
        zootopia: {
            name: "Zootopia!",
            Category: "Hollywood",
            type: "Animation , Crime",
            releasedDate: "Mar 04 2016",
            runTime: "1h 48mins",
            IDMBRating: "7.1"
        },
    },
}

function displayMovie(srcc, id) {
    var src = srcc;
    var name = id;
    for (var key in movies) {
        for (var key2 in movies[key]) {
            if (name === key2) {
                swal({
                    title: "Name : " + movies[key][key2].name,
                    text: "Category : " + "( " + movies[key][key2].Category + " )  "
                        + " --- Type : ( " + movies[key][key2].type + " ) "
                        + " --- Release Date  : ( " + movies[key][key2].releasedDate + " ) "
                        + " --- Run Time : ( " + movies[key][key2].runTime + " ) "
                        + " --- IDMB Rating : ( " + movies[key][key2].IDMBRating + " ) ",
                    textColor: "red",
                    imageUrl: src,
                    imageWidth: 200,
                    imageHeight: 250,
                    imageAlt: 'Custom image',
                    animation: false,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Download!'
                }).then((result) => {
                    if (result.value) {
                        swal(
                            'Downloaded',
                            'Your movie has been downloaded.',
                            'success'
                        )
                    }
                })
            }
        }
    }
}

function search() {
    var data = document.getElementById("userInput").value;
    var flag = false;
    if (data != "" || data != undefined) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] === " ") {
                data = data.slice(0, i) + data.slice(i + 1);
            }
        }
    }
    data = data.toLowerCase();
    var flag = false;
    if (data != "" && data != undefined && data != " " && data != null) {
        for (var key in movies) {
            for (var key2 in movies[key]) {
                if (data === key2) {
                    flag = true;
                    document.getElementById("movies").style.display = 'none';
                    document.getElementById("display").style.display = 'block';
                    document.getElementById("error").style.display = 'none';
                    document.getElementById("display").innerHTML = document.getElementById(data).innerHTML;
                    document.getElementById("userInput").value = "";
                    document.getElementById("homeBtn").style.display = 'block';
                }
                if (flag != true) {
                    document.getElementById("movies").style.display = 'none';
                    document.getElementById("error").style.display = 'block';
                    document.getElementById("display").style.display = "none";
                    document.getElementById("error").innerHTML = "No Results Found!"
                    document.getElementById("homeBtn").style.display = 'block';
                }
            }
        }
    }
}