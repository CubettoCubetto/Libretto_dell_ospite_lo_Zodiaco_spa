let urlServer = "https://diegopirovano.pythonanywhere.com"
//urlServer = "http://127.0.0.1:8013"

var global_choice = false

//caricare il username della pagina
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')

url_to_send_message = "https://diegopirovano.pythonanywhere.com/sh/"+encodeURIComponent(username);

// aggiungere il logo alla pagina
// Create a new image element 
var img = document.createElement('img'); 
 
// Set the source (src) attribute of the image 
img.src = urlServer+"/get_image/"+encodeURIComponent(username);; 

// Set any additional attributes like alt text, width, height, etc. 
img.alt = 'Logo';  

// Get a reference to the container where you want to insert the image 
var container = document.getElementById('imageLogoContainer'); 

// Append the image element to the container 
container.appendChild(img); 

// cambiare il nome del titolo
document.getElementById("titolo").innerHTML="Ciao " + username + ", il tuo account è pronto!"
document.getElementById("url-invia-commento").innerHTML= '<a target="_blank" href='+ url_to_send_message+'> Puoi inviare un commento a questo link </a>'
document.getElementById("linkVisualizzaCommenti").innerHTML="Se lo hai acconsentito nella pagina 'Scarica i tuoi commenti', chiunque può consultare i commenti " + 
    " che hai ricevuto <a target='_blank' href='https://cubettocubetto.github.io/Libro_dell_ospite/visualizza_commenti/visualizza_commenti?username="+username+"'>a questo link</a>"
const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: url_to_send_message,
    width: 256,
    height: 256
});

document.getElementById('downloadQR').addEventListener('click', function() {
    const qrCanvas = document.querySelector('#qrcode canvas');
    const qrDataUrl = qrCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    link.click();
});