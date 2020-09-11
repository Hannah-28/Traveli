// const fetch = require("node-fetch");
global.fetch = require("node-fetch");

function handleSubmit(event) {
    event.preventDefault()

    // check what data was put into the form fields
    let formPlace = document.getElementById('trip_place').value
    let formDate = document.getElementById('trip_date').value

    
    if (typeof (formPlace) === null || undefined) {
        if (typeof (formDate) === null || undefined) {
            alert("all fields should be completed");
            return;
        }
    }

    var offset = new Date().getTimezoneOffset() ;

    const data = {
        city: formPlace,
        departDate: formDate,
        timeZoneOffset: offset,
    };

    Client.checkForInfo(data);

    console.log("::: Form Submitted :::");
}

async function TEST(input_text) {
    var response = await fetch("http://localhost:2304/text");
    console.log("response: ", response);
}

export {
    handleSubmit,
    TEST
}