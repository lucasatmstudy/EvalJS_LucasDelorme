/***************
  MAP LEAFLET
***************/
const map = L.map('map').setView([0, 0], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
console.log(map);

/*******************
  SUIVI ISS
*******************/
const ISS_ICON = L.icon ({
  iconUrl : './assets/img/international-space-station-icon.png',
  iconSize : [50, 50],
  iconAnchor : [22, 94],
})

const marker = L.marker([0, 0], {icon: ISS_ICON}).addTo(map);
console.log(marker);

const issAPI =  async () => {
    try {
        const issData = await fetch('http://api.open-notify.org/iss-now.json');
        console.log(issData);
        
        // Vérification du statut de la réponse
        if (!issData.ok || issData.status !== 200) { // Vérification du statut 200
            console.error("Erreur lors de la récupération des données : ", issData.statusText);
            return; // Sortir de la fonction si la réponse n'est pas OK
        }

        const positionISS = await issData.json();
        console.log(positionISS);
        const latitude = positionISS.iss_position.latitude;
        console.log(latitude);
        const longitude = positionISS.iss_position.longitude;
        console.log(longitude);
        map.innerHTML = positionISS.longitude;
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API : ", error);
    }
}
issAPI();

/***************
  METEO LOCALE
***************/

// création et placement de la div p

const laMeteo = document.createElement('p');
laMeteo.id = 'meteoActuel';
laMeteo.style.height = '300px';
laMeteo.style.width = '200px'; 
laMeteo.style.margin = '16px';
laMeteo.style.border = '3px solid gray';
laMeteo.style.padding = '16px 12px 24px 12px';
laMeteo.innerHTML = 'Ceci est le contenu de la div'; 
const container = document.querySelector('.cardMeteo');
const btn = document.querySelector('button');
container.insertBefore(laMeteo, btn);

function addInfo(leHtml, leText) {
  const laSuperMeteo =  async () => {
    try {
        const meteoActuel = await fetch('https://prevision-meteo.ch/services/json/toulouse');        
        // Vérification du statut de la réponse
        if (!meteoActuel.ok || meteoActuel.status !== 200) { // Vérification du statut 200
            console.error("Erreur lors de la récupération des données : ", meteoActuel.statusText);
            return; // Sortir de la fonction si la réponse n'est pas OK
        }

        const conditionActuel = await meteoActuel.json();
        console.log(condisitonActuel);

    } catch (error) {
        console.error("Erreur lors de l'appel à l'API : ", error);
    }
}
};

btn.addEventListener('click', () => {
    addInfo('#meteoActuel', 'laMeteo.innerHTML');
});