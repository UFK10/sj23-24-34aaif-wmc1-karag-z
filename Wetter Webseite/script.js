const WetterForm =document.querySelector(".WetterForm");
const Stadt = document.querySelector(".Stadt");
const Karte = document.querySelector(".Karte")
const APIkey = "b172232fca29d03b638e6202a1e4501f";

WetterForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = Stadt.value;

    if(city){
        try{
            const WetterData = await getWetterData(city)
            displayWetterInfo(WetterData);

        }
        catch(error){
            console.error(error);
            displayError(error);

        }
    }
    else{
        displayError("Bitte Stadt eingeben");
    }


});

async function getWetterData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    
    const response = await fetch (apiUrl);

    if(!response.ok){
        throw new Error ("Die Wetterdaten konnten nicht abgerufen werden");
    }

    return await response.json();

}

function displayWetterInfo(Data){
    
    const {name: city,
        main:{temp, humidity }, weather:[{description, id}]} = Data

        Karte.textContent = "";
        Karte.style.display = "flex";

        const citydisplay = document.createElement("h1");
        const tempdisplay = document.createElement("p");
        const Feuchtigkeitdisplay = document.createElement("p");
        const WetterEmoji = document.createElement("p");

        citydisplay.textContent = city;
        tempdisplay.textContent = ` ${(temp - 273.15).toFixed(0)}°C `;
        Feuchtigkeitdisplay.textContent = ` humidity: ${humidity}`;
        WetterEmoji.textContent =  getWetterEmoji(id);

        Karte.appendChild(citydisplay);
        Karte.appendChild(tempdisplay);
        Karte.appendChild(Feuchtigkeitdisplay);
        Karte.appendChild(WetterEmoji)


       


        

}

function getWetterEmoji(WetterId){

    switch(true){
        case(WetterId >= 200 && WetterId < 300):
        return "☀️";

        case(WetterId >= 300 && WetterId < 400):
        return "⛈️";

        case(WetterId >= 500 && WetterId < 600):
        return "🌧️";

        case(WetterId >= 600 && WetterId < 700):
        return "❄️";

        case(WetterId >= 700 && WetterId < 800):
        return "🌫️";

        case(WetterId ===  800):
        return "🌥️";

        case(WetterId >= 801 && WetterId < 810):
        return "☁️";
                
    }




}

function displayError(message){

    const Errordisplay = document.createElement("p");
    Errordisplay.textContent = message;
    Errordisplay.classList.add("Errordisplay");

    Karte.textContent ="";
    Karte.style.display = "flex";
    Karte.appendChild(Errordisplay);

    Karte.textContent = "";
    Karte.style.display = "flex";
    Karte.appendChild(Errordisplay);

}