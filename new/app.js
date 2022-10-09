var countryName;
var capital;
var biome;
var area;
var population;
var populationDensity;
var lifeExpectancy;
var government;
var settings = document.getElementById("settings");
var app = document.getElementById("app");
var y = 1900;
var desertEconomicRating = [1,5]
const economicRating = [1,3,4,5,4,3,2,desertEconomicRating[Math.round(Math.random())]];
var biomeNames = ["Tundra","Taiga","Temperate forest","Tropical Rainforest","Grass Savanna","Mountainous","Steppe","Desert"];
var currentYear = 0;
var disasters = ["was hit by an asteroid that destroyed all multicellular life on Earth","and surrounding areas have been destroyed by a nuclear attack","was hit by a devastating earthquake","has erupted into civil war after a failed coup","has been burnt to the gound by raging wildfires","and surround areas' water supply was severly contaminated","is the epicenter of a deadly unknown virus outbreak","faces severe food shortages after crops failed nationwide","was hit by an unexpected flash flood","was attacked by terrorists"];
var speedType;

function show(elmnt) {
elmnt.style.visibility = "visible";
}
function hide(elmnt) {
elmnt.style.visibility = "hidden";
}
function launch(simType) {
if (confirm("Do you want to begin the simulation?") == true) {
begin();
    if (simType == "normal") {
        var speedSetting = 1000;
    } else if (simType == "instant") {
        var speedSetting = 0;
    }
}
}


function begin() {
var countryName = document.getElementById("countryName").value;
var capital = document.getElementById("capital").value;
var biome = biomeNames[document.getElementById("biome").value];
var area = document.getElementById("area").value;
var population = document.getElementById("population").value;
var lifeExpectancy = document.getElementById("lifeExpectancy").value;
var government = document.getElementById("government").value;
//history logs
var populationHistory = [population];
var lifeExpectancyHistory = [lifeExpectancy];
hide(settings);
show(app);

document.body.onkeyup = function(e){  
    if (e.code == "Space"){
      if (confirm("Do you want to end the simulation?") == true) {
        clearInterval(sim);
        }
    }
}

//interval
var sim = setInterval(function() {
//population
var growthRate;
if (lifeExpectancy > 50 && lifeExpectancy < 55) {
growthRate = 1.2;
} else if (lifeExpectancy > 55 && lifeExpectancy < 60) {
growthRate = 1.15;
} else if (lifeExpectancy > 60 && lifeExpectancy < 65) {
growthRate = 1.1;
} else if (lifeExpectancy > 65 && lifeExpectancy < 70) {
growthRate = 1.05;
} else if (lifeExpectancy > 80) {
growthRate = 0.995;
} else if (lifeExpectancy < 50) {
growthRate = 0.98;
} else {
growthRate = 1.005;
}
population = population * growthRate; 
document.getElementById("pop").innerHTML = "Population: " + Math.round(population);

//population density
var populationDensity = population / area;
document.getElementById("density").innerHTML = "Population density: ≈" + Math.round(populationDensity) + " people per km²";
//year
y = y + 1;
document.getElementById("year").innerHTML = "Year: " + y;
//life expectancy
if (lifeExpectancy < 45) {
lifeExpectancy = ((economicRating[document.getElementById("biome").value] * 6) + 50);
} else if (lifeExpectancy > 90) {
lifeExpectancy = 90;
}
lifeExpectancy = (lifeExpectancy - 5) + Math.round(Math.random() * 10);
document.getElementById("life").innerHTML = "Life expectancy: " + lifeExpectancy;

//EVENT DESCRIPTIONS - NEWS NOTIFICATIONS
currentYear = currentYear + 1;
populationHistory.push(Math.round(population));
lifeExpectancyHistory.push(lifeExpectancy);
if ((lifeExpectancyHistory[currentYear] - lifeExpectancyHistory[currentYear - 1]) > 3) {
document.getElementById("news").innerHTML = "<p style='color:green'>" + y + " - Major improvements in healthcare nationwide</p>" + document.getElementById("news").innerHTML;
} else if ((lifeExpectancyHistory[currentYear - 1] - lifeExpectancyHistory[currentYear]) > 3) {
document.getElementById("news").innerHTML = "<p style='color:red'>" + y + " - Major decline in healthcare nationwide</p>" + document.getElementById("news").innerHTML;
}
if (lifeExpectancy < 61) {
document.getElementById("news").innerHTML = "<p style='color:red'>" + y + " - Widespread poverty</p>" + document.getElementById("news").innerHTML;
} else if (lifeExpectancy > 78) {
document.getElementById("news").innerHTML = "<p style='color:green'>" + y + " - Very high quality of life</p>" + document.getElementById("news").innerHTML;
} else if (lifeExpectancy > 69 && lifeExpectancy < 79) {
document.getElementById("news").innerHTML = "<p>" + y + " - Good quality of life</p>" + document.getElementById("news").innerHTML;
} else if (lifeExpectancy > 60 && lifeExpectancy < 70) {
document.getElementById("news").innerHTML = "<p style='color:orange'>" + y + " - Moderate quality of life</p>" + document.getElementById("news").innerHTML;
}
if (populationDensity > 9000) {
document.getElementById("news").innerHTML = "<p>" + y + " - " + countryName + " is urbanized and densly populated</p>" + document.getElementById("news").innerHTML;
} else if (populationDensity < 100) {
document.getElementById("news").innerHTML = "<p>" + y + " - " + countryName + " is agricultural and sparsely populated</p>" + document.getElementById("news").innerHTML;
} else if (populationDensity > 25000) {
document.getElementById("news").innerHTML = "<p style='color:red'>" + y + " - " + countryName + " is too densly populated to be habitable</p>" + document.getElementById("news").innerHTML;
clearInterval(sim);
alert("Simulation has ended");
} 
if (population < 1) {
document.getElementById("news").innerHTML = "<p style='color:red'>" + y + " - " + countryName + " is unihabited</p>" + document.getElementById("news").innerHTML;
clearInterval(sim);
alert("Simulation has ended");
} else if (population > 3000000000) {
document.getElementById("news").innerHTML = "<p style='color:red'>" + y + " - " + countryName + " has overpopulated</p>" + document.getElementById("news").innerHTML;
clearInterval(sim);
alert("Simulation has ended");
}
//random disaster events
if (Math.random() < 0.025) {
var disasterCode = Math.round(Math.random() * disasters.length);
document.getElementById("news").innerHTML = "<p style='color:red'>" + y + " - " + capital + " " + disasters[disasterCode] + "</p>" + document.getElementById("news").innerHTML;
population = population * (disasterCode / 10);
}
},speedSetting);
//end of interval

app.innerHTML = `
<h2> ${countryName}</h2>
<hr>
<p style="color:rgb(18, 123, 227);cursor:pointer;" onclick="this.remove()" title="Click to close">*Click the spacebar to end the simulation</p>
<h2>Statistics</h2>
<p id="year">Year: ${y}</p>
<p id="pop">Population: ${population}</p>
<p id="life">Life expectancy: ${lifeExpectancy}</p>
<p id="density">Population density: ${populationDensity}</p>
<hr>
<h2>Notifications</h2>
<div id="news"></div>
<hr>
<h2>Download simulation data</h2>
<p style="color:rgb(18, 123, 227);cursor:pointer;" title="Click to download file" onclick="downloadResults()">Download results</p>
`;
}

//download function
function downloadResults() {
var a = document.body.appendChild(document.createElement("a"));
a.download = "Simulation results - " + document.getElementById("countryName").value;
a.href = "data:text/html," + "<title>Simulation results - " + document.getElementById("countryName").value + "</title><style>body{font-family:arial;}</style><body>" + document.getElementById("app").innerHTML.split("<h2>Download")[0] + "</body>";
a.click();
a.remove();
}
