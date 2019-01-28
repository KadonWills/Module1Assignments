var api = "https://newsapi.org/v1/articles?source=techcrunch&apikey=118f1cdfd8f841cfba90b30e34c52651";
var key = "118f1cdfd8f841cfba90b30e34c52651";
var mainDiv = document.getElementById("a");
var nav = document.getElementById("nav");
var nav2 = document.getElementById("nav2");
var homeNews = "bbc-news";
var newsCo = document.getElementById("khabar");
var dateToday = document.getElementById("date");
var counter = 0;

async function news(src = homeNews) {
    var Skey = await fetch(`https://newsapi.org/v1/articles?source=${src}&apikey=${key}`);
    var keyJ = await Skey.json();
    var name = src;
    name = name.toUpperCase();
    for (var i = 0; i < name.length; i++) {
        if (name[i] === "-") {
            name = name.slice(0, i) + " " + name.slice(i + 1);
        }
    }
    var exact = new Date();
    var month = exact.getMonth();
    month = parseInt(month) + 1
    dateToday.innerHTML = exact.getDate() + "/" + month + "/" + exact.getFullYear();
    newsCo.innerHTML = "<i class='fa fa-newspaper-o' style='color:rgb(247, 119, 119)'></i> " + "  " + name;
    mainDiv.innerHTML = keyJ.articles.map(htmlOfArticles).join('\n');
    console.log(keyJ)
}

function htmlOfArticles(article) {
    return `
    <div class="box">
    <h2 class="alert alert-info title"><strong>Breaking News! : </strong>${article.title}.</h2>
    <img class="img" src="${article.urlToImage}"/>
    <p class='descH' title='Look Down'><i class='fa fa-angle-double-down' style='color:#1595AA'></i> Description</p>
    <p class='comas'><i class='fa fa-quote-left'></i></p>
    <p class='description' title='Description'>" ${article.description} "</p>
    <p class='comas'><i class='fa fa-quote-right'></i></p>
    <p class='more' title='Read More!'> <a href='${article.url}' target='_blank'> Read More! </a> </p>
    </div>`
}

async function btns() {
    const a = await fetch(`https://newsapi.org/v1/sources`);
    const aJson = await a.json();
    nav.innerHTML = aJson.sources.map(src => `<a href='#top'><button id='${src.id}' title='${src.name}' class='btn btn-info btns' onclick='news(id)'>${src.name}</button></a>`).join('\n');
    nav2.innerHTML = aJson.sources.map(src => `<button id='${src.id}' title='${src.name}' class='btn btn-info btns' onclick='news(id);closeNav();'>${src.name}</button>`).join('\n');
    console.log(aJson)
}

window.addEventListener('load', () => {
    news();
    btns();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../serviceWorker.js')
            .then(() => {
                console.log('service worker')
            })
    }
})

function showNav() {
    document.getElementById("rNavSide").style.width = "70%";
    document.getElementById("rNavSide").style.overflow = "auto";
    document.getElementById("navBtn").removeAttribute('onclick');
    document.getElementById("navBtn").setAttribute("onclick", 'closeNav();');
}
function closeNav() {
    setTimeout(()=>{
        document.getElementById("rNavSide").style.overflow = "hidden";
        document.getElementById("rNavSide").style.width = "0";
        document.getElementById("navBtn").removeAttribute('onclick');
        document.getElementById("navBtn").setAttribute("onclick", 'showNav();');
    },600)
}
