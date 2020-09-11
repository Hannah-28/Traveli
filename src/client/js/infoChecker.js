let UIdata = {};

async function checkForInfo(data) {
    try {
        const postData = await fetch('/userInput', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const newData = await postData.json();
         console.log("DATA IN CHECKER: " + (newData));
        Client.openModal(newData);

    } catch (error) {
        console.log("HELLOOOOO THIS IS AN ERROR in infoChecker");
        console.log(error);
    }
}

export { checkForInfo } 