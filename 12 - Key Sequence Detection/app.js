const secret = 'qwerty';
const pressedKeys = [];


window.addEventListener('keyup', function (e) {

    console.log(e.key)
    pressedKeys.push(e.key)

    pressedKeys.splice(0, pressedKeys.length - secret.length);

    if (pressedKeys.join('') === secret) {
        cornify_add();
        console.log('---------------- UNICORN ADDED ----------------')
    }

    console.log(pressedKeys)
})