//Language choose _BEGIN

let languages = ["RU", "EN"];
let languages_html = {
    "RU": "Русский",
    "EN": "English"
};

let ul = document.querySelector(".languageList_modal ul");
let li_template = document.querySelector("#language_tmpli");
//localStorage.setItem("nativeLan", languages[0]); //setting it by default

async function li_onclick() {
    localStorage.setItem("nativeLan", languages[Number(this.value)]);
    typingLan = layoutTypes[0] + '/' + languages[Number(this.value)];
    document.querySelector(".language_modal .language").innerHTML = this.innerHTML;

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
    document.querySelector(".language_absolute").classList.toggle("language_absolute_hide");
    changeTypingLan(typingLan);
});
//Language choose _END