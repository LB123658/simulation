var title = document.getElementById("title");
var block = document.getElementById("block");
var prompt = document.getElementById("prompt");

var area = document.getElementById("area");
var water = document.getElementById("water");
var mountains = document.getElementById("mountains");
var cropland = document.getElementById("cropland");
var forest = document.getElementById("forest");
var desert = document.getElementById("desert");
var tundra = document.getElementById("tundra");

var resources = document.getElementById("resources");
var emissions = document.getElementById("emissions");

var country_name = document.getElementById("name");
var government = document.getElementById("government");

var kilo = document.getElementById("kilo");
var country_year = document.getElementById("year");
var population = document.getElementById("population");
var gdp = document.getElementById("gdp");
var capita = document.getElementById("capita");
var life = document.getElementById("life");

var red = document.getElementById("red");

function set() {
block.style.visibility = "hidden";
prompt.style.visibility = "hidden";
title.innerHTML = country_name.value;
//load percent color bar
document.getElementsByClassName("water")[0].style.width = water.value + "%";
document.getElementsByClassName("mountains")[0].style.width = mountains.value + "%";
document.getElementsByClassName("cropland")[0].style.width = cropland.value + "%";
document.getElementsByClassName("forest")[0].style.width = forest.value + "%";
document.getElementsByClassName("desert")[0].style.width = desert.value + "%";
document.getElementsByClassName("tundra")[0].style.width = tundra.value + "%";
document.getElementsByClassName("government")[0].innerHTML = "Government: " + government.value;

var pop = +area.value - (+area.value * (+water.value / 100)) - (+area.value * (+desert.value / 100)) + (80 * (+area.value * (+cropland.value / 100))) + (60 * (+area.value * (+forest.value / 100))) + (10 * (+area.value * (+mountains.value / 100))) + (5 * (+area.value * (+tundra.value / 100)));
population.innerHTML = "Population: " + pop;
var money = +area.value + (1000 * (+area.value * (+water.value / 100))) + (500 * (+area.value * (+desert.value / 100))) + (1500 * (+area.value * (+cropland.value / 100))) + (1000 * (+area.value * (+forest.value / 100))) + (500 * (+area.value * (+mountains.value / 100))) + (100 * (+area.value * (+tundra.value / 100)));
gdp.innerHTML = "GDP: $" + money;
kilo.innerHTML = "Area: " + area.value + " sq km";
life.innerHTML = "Life expectance: 70 years";
setInterval(time, 10000);
}

// check if you lost the game
function check() {
if (capita.innerHTML.split("$")[1] == "0") {
red.innerHTML = "Game over<br>" + name.value + " had a complete economic collapse in " + country_year.innerHTML.split(" ")[1] + ".<br><br><button class='button' onclick='location.reload();'>Play again</button>";
} else if (resources.style.split("%")[0] < 1) {
red.innerHTML = "Game over<br>" + name.value + " used all of its natural resources and its government collapsed in " + country_year.innerHTML.split(" ")[1] + ".<br><br><button class='button' onclick='location.reload();'>Play again</button>";
} else if (emissions.style.split("%")[0] < 99) {
red.innerHTML = "Game over<br>" + name.value + " had too high of carbon emissions and was destroyed by climate change in " + country_year.innerHTML.split(" ")[1] + ".<br><br><button class='button' onclick='location.reload();'>Play again</button>";
}
red.style.visibility = "visible";
}

// generate all values
var y = 2022;
var r = 100;
function time() {
y++;
country_year.innerHTML = "Year: " + y;
population.innerHTML = "Population: " + Math.floor(+population.innerHTML.split(" ")[1] * 1.015);
gdp.innerHTML = "GDP: $" + Math.floor((+gdp.innerHTML.split("$")[1] * ((Math.random() * 4) + 0)));
capita.innerHTML = "GDP per capita: $" + Math.floor((+gdp.innerHTML.split("$")[1] / +population.innerHTML.split(" ")[1]));

if (+capita.innerHTML.split("$")[1] < 1000) {
life.innerHTML = "Life expectancy: 50 years";
} else if (+capita.innerHTML.split("$")[1] > 1000 && +capita.innerHTML.split("$")[1] < 5000) {
life.innerHTML = "Life expectancy: 60 years";
} else if (+capita.innerHTML.split("$")[1] > 5000 && +capita.innerHTML.split("$")[1] < 10000) {
life.innerHTML = "Life expectancy: 70 years";
} else if (+capita.innerHTML.split("$")[1] > 10000 && +capita.innerHTML.split("$")[1] < 60000) {
life.innerHTML = "Life expectancy: 80 years";
} else {
life.innerHTML = "Life expectancy: 85 years";
}
r = r - 1;
resources.style.width = r + "%";
if (+capita.innerHTML.split("$")[1] < 300000) {
emissions.style.width = (+capita.innerHTML.split("$")[1] / 3000) + "%";
}
if (+emissions.style.width.split("%")[0] < 25) {
emissions.style.background = "green";
} else if (+emissions.style.width.split("%")[0] > 25 && +emissions.style.width.split("%")[0] < 50) {
emissions.style.background = "#57b55f";
} else if (+emissions.style.width.split("%")[0] > 50 && +emissions.style.width.split("%")[0] < 75) {
emissions.style.background = "#ffc000";
} else {
emissions.style.background = "red";
}
check();
}
