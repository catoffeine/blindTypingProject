
let typingLan;
if (localStorage.getItem('typingLan') == null) typingLan = 'QWERTY/RU'; //byDefault
else typingLan = localStorage.getItem('typingLan');
changeTypingLan(typingLan);
setTheme();
// applySettings();