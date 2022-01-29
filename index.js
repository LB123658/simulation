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

var country_name = document.getElementById("name");
var government = document.getElementById("government");

var kilo = document.getElementById("kilo");
var country_year = document.getElementById("year");
var population = document.getElementById("population");
var gdp = document.getElementById("gdp");
var capita = document.getElementById("capita");
var life = document.getElementById("life");

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
var money = +area.value + (400 * (+area.value * (+water.value / 100))) + (10 * (+area.value * (+desert.value / 100))) + (800 * (+area.value * (+cropland.value / 100))) + (600 * (+area.value * (+forest.value / 100))) + (200 * (+area.value * (+mountains.value / 100))) + (50 * (+area.value * (+tundra.value / 100)));
gdp.innerHTML = "GDP: $" + money;
kilo.innerHTML = "Area: " + area.value + " sq km";
life.innerHTML = "Life expectance: 70 years";
setInterval(time, 10000);
}

var y = 2022;
function time() {
y++;
country_year.innerHTML = "Year: " + y;
population.innerHTML = "Population: " + Math.floor(+population.innerHTML.split(" ")[1] * 1.05);
gdp.innerHTML = "GDP: $" + Math.floor((+gdp.innerHTML.split("$")[1] * ((Math.random() * 4) + 0)));
capita.innerHTML = "GDP per capita: $" + Math.floor((+gdp.innerHTML.split("$")[1] / +population.innerHTML.split(" ")[1]));
}
