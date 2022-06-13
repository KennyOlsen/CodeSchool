var buttonElement = document.querySelector("#submit-button");
var retryButton = document.querySelector("#retry-button");
var response = document.querySelector("#response");

function newProblem() {
    retryButton.style.display = "none";
    var a = (Math.floor(Math.random() * 10) + 1) * 2;
    var b = (Math.floor(Math.random() * 10) + 1) * 2;
    var spanA = document.querySelector("#a");
    var spanB = document.querySelector("#b");
    spanA.innerHTML = (a);
    spanB.innerHTML = (b);
    console.log(a + b);
    return a + b;
}

var correctAnswer = newProblem();

buttonElement.onclick = function () {
    //parantheses are parameters
    //code runs when the button is clicked
    //function activated by click event
    var answer1 = document.querySelector("#ans1");
    if (answer1.value == correctAnswer) {
        response.innerHTML = ("Correct!");
         response.style.backgroundColor = "#00CC00";
         //response.classList.add("Correct");
         retryButton.style.display = "inline-block";
    } else {
        response.innerHTML = ("Wrong!");
        response.style.backgroundColor = "red";
        retryButton.style.display = "none";
    }
    answer1.value = "";
}

retryButton.onclick = function () {
    correctAnswer = newProblem();
    response.innerHTML = ("");
}



//element.onclick :: event triggered by clicking the element
//var element = document.querySelector() :: links to the element in html and assigns it to the element variable
//element.value :: returns the value of the element
//element.innerHTML = () :: changes the value of the element in the html