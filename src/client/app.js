import { checkForInfo } from './js/infoChecker'
import { handleSubmit } from './js/formHandler'
import { TEST } from './js/formHandler'
import { openModal } from './js/openModal'
import { updateUI } from './js/updateUI'

import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/modal.scss'

import plannerImg from './images/planner.jpg'
import cloudsImg from './images/clouds.jpeg'
import { stringify } from 'querystring'


async function performSearch() {
    const submitBtn = document.getElementById('search_btn');
    submitBtn.setAttribute('value', 'Searching...');
    submitBtn.disabled = true;

    Client.handleSubmit(event);
}

function performDelete(target) {
    let confirmation = confirm("Do you really want to delete this trip?")
    if (confirmation) {
        const deleteDiv = target.parentElement.parentElement;
        deleteDiv.remove();
    }
}

async function performSave() {
    try {
        const postData = await fetch('/getLastData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '',
        });

        const myData = await postData.json();
        Client.updateUI(myData);

        saveClose();

    } catch (error) {
        console.log("HELLOOOOO THIS IS AN ERROR in infoChecker");
        console.log(error);
    }

}

function performClose() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";

    saveClose();
}


function performActiveNavItem(target) {
    // console.log("IN ACTIVE NAV ITEM");

    const activeSecLi = document.querySelector('.active_nav');
    if (!(activeSecLi === null)) {
        activeSecLi.classList.remove('active_nav');
    }

    target.classList.add('active_nav');
}

function saveClose(){
    var allModalP = document.getElementsByClassName('modal_p');
    while (allModalP[0]) {
        allModalP[0].parentNode.removeChild(allModalP[0]);
    }

    var cards = document.getElementsByClassName('card');
    for(let i = 0 ; i<cards.length; i++){
        cards[i].style.zIndex = "2";
    }

    var h1 = document.getElementById('my_trips_title');
    h1.style.display = 'block';
}


document.addEventListener('click', function (e) {
    if (e.target.className === 'delete_trip_btn') {
        performDelete(e.target);
    } else if (e.target.className === 'nav-item' || e.target.className === 'nav-link') {
        if (e.target.className === 'nav-link') {
            performActiveNavItem(e.target.parentElement);
        }
        else {
            performActiveNavItem(e.target);
        }
    } else if (e.target.id === 'search_btn') {
        performSearch();
    } else if (e.target.id === 'save_trip_btn') {
        performSave();
    } else if (e.target.id === 'modal_close') {
        performClose();
    }
})


//need to be edited
window.addEventListener('scroll', function () {
    // let fromTop = window.scrollY;
    let position = window.pageYOffset;

    const allLinks = document.querySelectorAll('.nav-link');
    // console.log("allLinks: " + allLinks.length);


    allLinks.forEach((link) => {
        var sectionId = link.hash;
        sectionId = sectionId.substring(1);
        // console.log("sectionId: " + sectionId);

        const sections = document.getElementById(sectionId);
        // console.log("sctionss: "+ JSON.stringify(sections));


        // did not reach to any yet
        if (!sections) {
            return;
        }

        // Add active class
        if (sections.offsetTop <= position + 100) {
            performActiveNavItem(sections);
        }

    });
});




export {
    handleSubmit,
    TEST,
    checkForInfo,
    openModal,
    updateUI
}