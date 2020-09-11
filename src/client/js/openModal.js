async function openModal(data) {
    console.log("adfaGS");
    console.log(data);


    var cards = document.getElementsByClassName('card');
    for(let i = 0 ; i<cards.length; i++){
        cards[i].style.zIndex = "-1";
    }

    var h1 = document.getElementById('my_trips_title');
    h1.style.display = 'none';


    const modal = document.getElementById('myModal');
    modal.style.display = "block";

    const modalImg = document.getElementById('modal_img')
    if (!modalImg.src || !modalImg.src.length || modalImg.src.length === 0 || modalImg.src === null || modalImg.src === undefined ) {
        modalImg.setAttribute('src','https://cdn.pixabay.com/photo/2016/11/18/22/14/adventure-1837134_1280.jpg');
    } else {
        modalImg.setAttribute('src', data.imageUrl);
    }

    
    const modalTitle = document.getElementById('modal_title');
    modalTitle.innerHTML = '<stong>Trip to : </stong>' + data.city;


    const modalText = document.getElementById('modal_text');

    const modalP0 = document.createElement('p');
    modalP0.setAttribute('class', 'modal_p');
    modalP0.innerHTML = 'Your trip to <strong><em> ' + data.city + ', ' + data.country + '</em></strong> is ' + data.diff + ' days away';

    const modalP1 = document.createElement('p');
    modalP1.setAttribute('class', 'modal_p');
    modalP1.innerHTML = '<strong>Departure Date: </strong>' + data.date;

    const modalP2 = document.createElement('p');
    modalP2.setAttribute('class', 'modal_p');
    modalP2.innerHTML = '<strong>Low Temp: </strong>' + data.lowTemp + ' °C';

    const modalP3 = document.createElement('p');
    modalP3.setAttribute('class', 'modal_p');
    modalP3.innerHTML = '<strong>High Temp: </strong>' + data.maxTemp + ' °C';

    const modalP4 = document.createElement('p');
    modalP4.setAttribute('class', 'modal_p');
    modalP4.innerHTML = '<strong>Weather Description: </strong>' + data.weatherDescription;

    modalText.appendChild(modalP0);
    modalText.appendChild(modalP1);
    modalText.appendChild(modalP2);
    modalText.appendChild(modalP3);
    modalText.appendChild(modalP4);

    const submitBtn = document.getElementById('search_btn');
    submitBtn.setAttribute('value', 'Search');
    submitBtn.disabled = false;
}

export { openModal } 