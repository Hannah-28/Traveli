async function updateUI(data) {
    console.log("data in update UI: " + JSON.stringify(data));


    const modal = document.getElementById('myModal');
    modal.style.display = "none";

    const rowDiv = document.getElementsByClassName('row')[0];

    const div = document.createElement('div');
    div.classList.add('afterRow', 'col-lg', 'col-md-12', 'col-lg-6');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const img = document.createElement('img');
    img.setAttribute('src', data.imageUrl);
    img.setAttribute('alt', "City photo");

    const cardTitle = document.createElement('h3');
    cardTitle.innerHTML = '<stong>Trip to: </stong>' + data.city;

    const modalP0 = document.createElement('p');
    modalP0.setAttribute('class', 'card-text');
    modalP0.innerHTML = 'Your trip to <strong><em> ' + data.city + ', ' + data.country + '</em></strong> is ' + data.diff + ' days away';

    const modalP1 = document.createElement('p');
    modalP1.setAttribute('class', 'card-text');
    modalP1.innerHTML = '<strong>Departure Date: </strong>' + data.date;

    const modalP2 = document.createElement('p');
    modalP2.setAttribute('class', 'card-text');
    modalP2.innerHTML = '<strong>Low Temp: </strong>' + data.lowTemp + ' °C';

    const modalP3 = document.createElement('p');
    modalP3.setAttribute('class', 'card-text');
    modalP3.innerHTML = '<strong>High Temp: </strong>' + data.maxTemp + ' °C';

    const modalP4 = document.createElement('p');
    modalP4.setAttribute('class', 'card-text');
    modalP4.innerHTML = '<strong>Weather Description: </strong>' + data.weatherDescription;


    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete_trip_btn');
    deleteBtn.innerText = 'Delete Trip';

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(modalP0);
    cardDiv.appendChild(modalP1);
    cardDiv.appendChild(modalP2);
    cardDiv.appendChild(modalP3);
    cardDiv.appendChild(modalP4);
    cardDiv.appendChild(deleteBtn);

    div.appendChild(cardDiv);
    rowDiv.appendChild(div);

}


export { updateUI }