let qwertyLayouts = {
    EN: [
        '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[ {', '] }',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '; :', '\' "',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ', <', '. >', '/ ?',
    ],
    RU: [
        '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )',
        'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ',
        'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э',
        'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/ ?',
    ]
};
//'QWERTY/EN' //FORMAT: 'Layout/Langugage'
function changeTypingLan(newLan) {
    console.log(newLan);
    if (newLan.split('/').length != 2) {
        console.log('error occured in changeTypingLan, maybe data is corrupted');
        return;
    }
    let keysOnLayout = document.querySelectorAll('.keyboard__key-layout');
    localStorage.setItem('typingLan', newLan);
    if (newLan.split('/')[0] == 'QWERTY') {
        let lan = newLan.split('/')[1];
        switch(lan) {
            case 'EN': {
                keysOnLayout.forEach((element, i) => {
                    element.innerHTML = qwertyLayouts.EN[i];
                });
                break;
            }
            case 'RU': {
                console.log('RU input');
                keysOnLayout.forEach((element, i) => {
                    element.innerHTML = qwertyLayouts.RU[i];
                });
                break;
            }
            default: {
                break;
            }
        }
        
    } else {
        console.log("ERROR: Data is corrupted, maybe wrong format of changing language string");
    }
}