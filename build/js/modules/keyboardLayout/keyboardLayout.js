export let qwertyLayouts = {
    EN: [
        '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )',
        'Q', 'W', 'E', 'R', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[ {', '] }',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '; :', '\' "',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ', <', '. >', '/ ?',
    ],
    RU: [
        '1 !', '2 @', '3 #', '4 $', '5 %', '6 ^', '7 &', '8 *', '9 (', '0 )',
        'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Y', 'U', 'I', 'O', 'P', '[ {', '] }',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '; :', '\' "',
        'Z', 'X', 'C', 'V', 'М', 'N', 'M', ', <', '. >', '/ ?',
    ]
};
//'QWERTY/EN' //FORMAT: 'Layout/Langugage'
export function changeTypingLan(newLan) {
    if (newLan.split('/').length != 2) {
        console.log('error occured in changeTypingLan, maybe data is corrupted');
        return;
    }
    let keysOnLayout = document.querySelectorAll('.keyboard__key-layout');
    if (localStorage.getItem('typingLan') == newLan) {
        return;
    } 
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