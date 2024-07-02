let urlServer = "https://diegopirovano.pythonanywhere.com"
urlServer = "http://127.0.0.1:8013"

function startLoading(){
    document.getElementById('loadingDiv').style.display = 'flex'; // Show the loading div
}
function stopLoading(){
    document.getElementById('loadingDiv').style.display = 'none'; // don't show the loading div
}



document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if passwords match
    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
        alert("attenzione: le due password non corrispondono");
        return;
    }

    //capire se ha acconsentito a pubblicare il messaggio
    const radios = document.getElementsByName('inlineRadioOptions');
    let selectedValue;
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    alert(`Selected value: ${selectedValue == "option1"}`);

    const formData = new FormData();
    formData.append('formFile', document.getElementById('formFile').files[0]);
    formData.append('username', document.getElementById('username').value.trim());
    formData.append('password', document.getElementById('password').value.trim());
    formData.append('titolo', document.getElementById('titolo').value.trim());  
    formData.append('messaggio', document.getElementById('messaggio').value);
    formData.append('star1', document.getElementById('star1').value);
    formData.append('star2', document.getElementById('star2').value);
    formData.append('star3', document.getElementById('star3').value);
    formData.append('star4', document.getElementById('star4').value);
    formData.append('star5', document.getElementById('star5').value);
    formData.append('nome', document.getElementById('nome').value.trim());
    formData.append('pubblicaCommenti', selectedValue == "option1");
    formData.append('providedPassword', document.getElementById('providedPassword').value.trim());
    
    for (const value of formData.values()) {
        console.log(value);
    }

    startLoading()
    fetch(urlServer + "/create_account", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        if(data["status"] != "success"){
            stopLoading()
            alert("attenzione-->"+data["message"])
            return
        }
        // Open the account confirmation page
        window.open("https://cubettocubetto.github.io/Libro_dell_ospite/account_creato/account_creato.html?username=" + data['username'], "_self");
    })
    .catch(error => {
        stopLoading()
        console.error('Error:', error);
    });
});
