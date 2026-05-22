// =========================
// MODAL
// =========================

const openConsultation =
document.getElementById("openConsultation");

const consultationModal =
document.getElementById("consultationModal");

const closeModal =
document.getElementById("closeModal");


// OPEN MODAL
openConsultation.addEventListener(
    "click",
    () => {

    consultationModal.classList.add("active");

});


// CLOSE MODAL
closeModal.addEventListener(
    "click",
    () => {

    consultationModal.classList.remove("active");

});


// CLOSE OUTSIDE
consultationModal.addEventListener(
    "click",
    (e) => {

    if(e.target === consultationModal){

        consultationModal.classList.remove("active");

    }

});


// =========================
// FORM SUBMIT
// =========================

// =========================
// DATE & TIME VALIDATION
// =========================

const dateInput =
document.getElementById("date");

const timeInput =
document.getElementById("time");


// SET MIN DATE = TODAY

const today =
new Date().toISOString().split("T")[0];

dateInput.min = today;


// VALIDATE TIME BASED ON DATE

dateInput.addEventListener(
    "change",
    validateTime
);

timeInput.addEventListener(
    "focus",
    validateTime
);


function validateTime(){

    const selectedDate =
    dateInput.value;

    const now =
    new Date();

    const currentDate =
    now.toISOString().split("T")[0];

    // IF TODAY SELECTED

    if(selectedDate === currentDate){

        const hours =
        String(now.getHours()).padStart(2,"0");

        const minutes =
        String(now.getMinutes()).padStart(2,"0");

        const currentTime =
        `${hours}:${minutes}`;

        timeInput.min = currentTime;

    }

    else{

        timeInput.min = "";

    }

}


const consultationForm =
document.getElementById("consultationForm");

const submitBtn =
document.getElementById("submitBtn");

const toast =
document.getElementById("toast");

consultationForm.addEventListener(
    "submit",
    function(e){

    e.preventDefault();

    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;

    // GET VALUES

    const name =
    document.getElementById("name").value;

    const phone =
    document.getElementById("phone").value;

    const email =
    document.getElementById("email").value;

    const rawDate =
    document.getElementById("date").value;

    const formattedDate =
    new Date(rawDate).toLocaleDateString(
        "en-IN",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

    const time =
    document.getElementById("time").value;

    const purpose =
    document.getElementById("purpose").value;


    // WHATSAPP MESSAGE

    const message =
`Hello Sandeep,

I submitted a consultation request.

Name: ${name}
Phone: ${phone}
Email: ${email}

Preferred Date: ${formattedDate}
Preferred Time: ${time}

Purpose:
${purpose}`;


    // WHATSAPP URL

    const whatsappURL =
`https://wa.me/919567958956?text=${encodeURIComponent(message)}`;


    // SEND DATA TO GOOGLE SHEET
// CREATE FORM DATA

const formData = new FormData();

formData.append("name", name);
formData.append("phone", phone);
formData.append("email", email);
formData.append("date", formattedDate);
formData.append("time", time);
formData.append("purpose", purpose);

// SEND TO GOOGLE SHEET

fetch(
"https://script.google.com/macros/s/AKfycbxFiPfyu0HHk83EacjrKk_uf5S9e3qWXuGLrxTveoEK6oZZjZoCXYl_7BC82rwDZfo/exec",
{


method:"POST",

body: formData


})

.then(response => response.text())

.then(data => {

submitBtn.innerText = "Submit Consultation";
submitBtn.disabled = false;    

toast.classList.add("show");

setTimeout(() => {

    toast.classList.remove("show");

}, 3000);

window.location.href = whatsappURL;

consultationModal.classList.remove("active");

consultationForm.reset();

})

.catch(error => {

submitBtn.innerText = "Submit Consultation";
submitBtn.disabled = false;

alert(
    "Something went wrong."
);

console.log(error);


});
});


// =========================
// QR MODAL
// =========================

const openQrModal =
document.getElementById("openQrModal");

const qrModal =
document.getElementById("qrModal");

const closeQr =
document.getElementById("closeQr");


// OPEN

openQrModal.addEventListener(
    "click",
    () => {

    qrModal.classList.add("active");

});


// CLOSE

closeQr.addEventListener(
    "click",
    () => {

    qrModal.classList.remove("active");

});


// CLOSE OUTSIDE

qrModal.addEventListener(
    "click",
    (e) => {

    if(e.target === qrModal){

        qrModal.classList.remove("active");

    }

});

// =========================
// SHARE PROFILE
// =========================

const shareProfileBtn =
document.getElementById("shareProfileBtn");


shareProfileBtn.addEventListener(
    "click",
    async () => {

    if(navigator.share){

        try{

            await navigator.share({

                title:
                "Sandeep Rajput",

                text:
                "Connect with Sandeep Rajput",

                url:
                "https://sandeep-digital-profile.netlify.app/"

            });

        }

        catch(error){

            console.log(error);

        }

    }

    else{

        window.open(

        "https://wa.me/?text=https://sandeep-digital-profile.netlify.app/",

        "_blank"

        );

    }

});

// =========================
// DOWNLOAD QR
// =========================

const downloadQrBtn =
document.getElementById("downloadQrBtn");


downloadQrBtn.addEventListener(
    "click",
    async () => {

    const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://sandeep-digital-profile.netlify.app/";

    const response =
    await fetch(qrUrl);

    const blob =
    await response.blob();

    const blobUrl =
    window.URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = blobUrl;

    a.download = "sandeep-qr.png";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(blobUrl);

});

// =========================
// TOP SHARE BUTTON
// =========================

const topShareBtn =
document.querySelector(".top-share-btn");


topShareBtn.addEventListener(
    "click",
    async () => {

    const shareData = {

        title:
        "Sandeep",

        text:
        "Connect with Sandeep",

        url:
        "https://sandeep-digital-profile.netlify.app/?v=2ho"

    };


    // MOBILE SHARE

    if(navigator.share){

        try{

            await navigator.share(
                shareData
            );

        }

        catch(error){

            console.log(error);

        }

    }


    // DESKTOP FALLBACK

    else{

        navigator.clipboard.writeText(
            shareData.url
        );

        alert(
            "Profile link copied!"
        );

    }

});
// =========================
// PWA SERVICE WORKER
// =========================

if("serviceWorker" in navigator){

    window.addEventListener(
        "load",
        () => {

        navigator.serviceWorker.register(
            "/sw.js"
        );

    });

}