var mainDiv = document.getElementById("container");

var underDiv = document.createElement("div");
underDiv.setAttribute("class", "underDiv");

var header = document.createElement("div");
header.setAttribute("class", "header");

var heading = document.createElement("h1");
heading.setAttribute("class", "mainHeading");
heading.setAttribute("title", "Todo")
var todo = document.createElement("i");
todo.setAttribute("class", "fa fa-list");
todo.setAttribute("title", "Todo")
heading.appendChild(todo);
var headingText = document.createTextNode("TO-DO");
heading.appendChild(headingText);

var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("onFocus", "this.className += ' black'; ");
input.setAttribute("onBlur", "this.className = 'text' ")
input.setAttribute("class", "text");
input.setAttribute("id", "userInput");
input.setAttribute("placeholder", "Enter Your Data Here...");
input.setAttribute("title", "Enter Your Data");

var addButton = document.createElement("button");
addButton.setAttribute("class", "addButton");
addButton.setAttribute("onClick", "dataExecution();");
addButton.setAttribute("title", "Add Item");
var fontAwsome = document.createElement("i");
fontAwsome.setAttribute("class", "fa fa-plus");
addButton.appendChild(fontAwsome);
var addButtonText = document.createTextNode("ADD");
addButton.appendChild(addButtonText);

var removeButton = document.createElement("button");
removeButton.setAttribute("class", "removeButton");
removeButton.setAttribute("onClick", "dataRemovation();");
removeButton.setAttribute("title", "Remove List!");
var fonAwsomeClear = document.createElement("i");
fonAwsomeClear.setAttribute("class", "fa fa-remove");
removeButton.appendChild(fonAwsomeClear);
var removeButtonText = document.createTextNode("REMOVE");
removeButton.appendChild(removeButtonText);

var space = document.createElement("br");


var boxDisplay = document.createElement("div");
boxDisplay.setAttribute("class", "display");
var h1 = document.createElement("i");
h1.setAttribute("class", "fa fa-arrow-circle-down");
h1.setAttribute("title", "Your List")
boxDisplay.appendChild(h1);
var ul = document.createElement("ul");
ul.setAttribute("class", "ul")
ul.setAttribute("id", "list")
boxDisplay.appendChild(ul);



header.appendChild(heading);
mainDiv.appendChild(header);
underDiv.appendChild(input);
underDiv.appendChild(space);
underDiv.appendChild(addButton)
underDiv.appendChild(removeButton)




function dataExecution() {
    var data = document.getElementById("userInput").value;
    var firstLetter = data.charAt(0);
    var remaining = data.slice(1);
    remaining = remaining.toLowerCase();
    firstLetter = firstLetter.toUpperCase();
    var final = firstLetter + remaining;
    if (data != "") {
        var a = document.createElement("li");
        a.setAttribute("class", "li")
        a.setAttribute("id", "userDataEntered")
        var check = document.createElement("i");
        check.setAttribute("class", "fa fa-square");
        check.addEventListener("click", function () {
            this.parentNode.setAttribute("class", "checked");
            this.setAttribute("class", "fa fa-check-square-o")
            this.setAttribute("id", "checkedFont");
            this.parentNode.childNodes[2].remove();
        })
        a.appendChild(check);
        var b = document.createTextNode(final);
        a.appendChild(b);
        var edit = document.createElement("i");
        edit.setAttribute("class", "fa fa-edit");
        a.appendChild(edit);
        edit.addEventListener("click", function () {
            var editt = this.parentNode.innerText;
            var newData = prompt("Edit Data...", editt);
            this.parentNode.childNodes[1].nodeValue = newData;
        })
        var dlt = document.createElement("i");
        dlt.setAttribute("class", "fa fa-trash");
        dlt.setAttribute("id", "dlt");
        a.appendChild(dlt);
        ul.appendChild(a);
        document.getElementById("userInput").value = "";
        dlt.addEventListener("click", function () {
            dlt.parentNode.remove();
        })
    }
    else {
        alert("Input Field is Empty!")
    }
}

function dataRemovation() {
    document.getElementById("userInput").value = "";
    document.getElementById("list").innerHTML = "";
}

underDiv.appendChild(boxDisplay);
mainDiv.appendChild(underDiv);


