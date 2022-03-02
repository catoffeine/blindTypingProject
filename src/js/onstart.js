//Temporary
if (localStorage.getItem('nativeLan') != null) {
    document.querySelector(".language_absolute").style.display = 'none';
    document.querySelector(".language_absolute").classList.toggle("language_absolute_hide");
}
//Temporary

let typingLan;
if (localStorage.getItem('typingLan') == null) typingLan = 'QWERTY/RU'; //byDefault
else typingLan = localStorage.getItem('typingLan');
changeTypingLan(typingLan);
