//Language choose _BEGIN

let languages = ["EN", "RU"];
let languages_html = {
    "EN": "English",
    "RU": "Русский"
};

document.querySelector(".language_modal .language").value = 0;

let ul = document.querySelector(".languageList_modal ul");
let li_template = document.querySelector("#language_tmpli");
//localStorage.setItem("nativeLan", languages[0]); //setting it by default

async function li_onclick() {
    localStorage.setItem("nativeLan", languages[Number(this.value)]);
    // typingLan = layoutTypes[0] + '/' + languages[Number(this.value)];
    document.querySelector(".language_modal .language").innerHTML = this.innerHTML;
    document.querySelector(".language_modal .language").value = this.value;

    ul.style.display = "none";
    await setTimeout(() => {
        ul.style.display = "block";
    }, 600);
}

languages.forEach(function(el, i) {
    ul.append(li_template.content.cloneNode(true));
    document.querySelector(".languageList_modal ul li:last-of-type img").src = "images/lanChoosing/" + el + "Lan.svg";
    document.querySelector(".languageList_modal ul li:last-of-type h4").innerHTML = languages_html[el];
    document.querySelector(".languageList_modal ul li:last-of-type").value = i;

    document.querySelector(".languageList_modal ul li:last-of-type").addEventListener("click", li_onclick);
});

//Confirm button
document.querySelector(".language_modal a").addEventListener("click", function() {
    let newNative = languages[Number(document.querySelector(".language_modal .language").value)];
    mainSettings.nativeLan = newNative;
    mainSettingsLocalStorageUpdate();
    localStorage.setItem("nativeLan", newNative);
    let keyboardTypingLan = localStorage.getItem("typingLan").split("/");
    keyboardTypingLan[1] = localStorage.getItem("nativeLan");
    localStorage.setItem("typingLan", keyboardTypingLan.join("/"));
    document.querySelector(".language_absolute").classList.toggle("language_absolute_hide");
    changeTypingLan(localStorage.getItem("typingLan"));
    if (mainSettings.nativeLan == "EN") {
        location.href = document.querySelector(".page").innerText + '.html';
    } else {
        location.href = document.querySelector(".page").innerText + '_' + mainSettings.nativeLan.toLowerCase() + '.html';
    }
    // changeTypingLan(typingLan);
});

document.querySelector(".header__mainLanguage").addEventListener("click", function() {
    // if (document.querySelector(".language_absolute").classList.contains("language_absolute_hide")) document.querySelector(".language_absolute").style.display = "block";
    document.querySelector(".language_absolute").classList.toggle("language_absolute_hide");
})
//Language choose _END