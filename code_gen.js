/*
/var/www/bookstack/public/uploads  <-- dans bookstack, uploader ici
*/

function maxLengthCheck(input) {
    if (input.value.length > input.maxLength) {
        input.value = input.value.slice(0, input.maxLength);
    }
}

function generateStrings() {
    var seed = document.getElementById('bkmrk-seed').value;

    // Vérifier si le seed est vide ou pas un chiffre
    if (!seed || isNaN(seed)) {
        alert('SVP Entrer un no de client valide.');
        return;
    }

    // S'assure que c'est maximum 5 chiffres
    seed = seed.slice(0, 5);

    // Génère les différent codes, via id dans un tag html
    var string1 = generate4NumericString(seed, 4);
    var string2 = generateString(seed, 8);
    var string3 = generateMixedString(seed, 16);
    var string4 = generate8NumericString(seed, 8);
    var string5 = generate6NumericString(seed, 6);

    // Affiche les différents codes
    document.getElementById('bkmrk-string1').innerText = string1;
    document.getElementById('bkmrk-string2').innerText = string2;
    document.getElementById('bkmrk-string3').innerText = string3;
    document.getElementById('bkmrk-string4').innerText = string4;
    document.getElementById('bkmrk-string5').innerText = string5;
}

function generate4NumericString(seed, length) {
    seed = (seed * 31 + 17) % 9973;   // Algorithme pseudo-random

    return Math.abs(seed).toString().padStart(length, '0').slice(0, length);
}

function generate6NumericString(seed, length) {
    seed = (seed * 31 + 175975) / 20 ;   // Algorithme pseudo-random
	seed = Math.round(seed);
    return Math.abs(seed).toString().padStart(length, '0').slice(0, length);
}

function generate8NumericString(seed, length) {
    seed = (seed * 315560 + 17) / 20;   // Algorithme pseudo-random
    seed = Math.round(seed);
    return Math.abs(seed).toString().padStart(length, '0').slice(0, length);
}

function generateString(seed, length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(seed % chars.length));
        seed = (seed * 17 + 5) % 9973; // Algorithme pseudo-random
    }
    return result;
}



function generateMixedString(seed, length) {
    var chars_small = 'abcdefghijklmnopqrstuvwxyz';
    var chars_caps = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var chars_num = '0123456789';
    var chars_spec = '!@#$%^&*()_+[]{}|;:,.<>?';
    var result = '';
    for (var i = 0; i < length/4; i++) {
        result += chars_small.charAt(Math.floor(seed % chars_small.length));
        result += chars_caps.charAt(Math.floor(seed % chars_caps.length));
        result += chars_num.charAt(Math.floor(seed % chars_num.length));
        result += chars_spec.charAt(Math.floor(seed % chars_spec.length));
        seed = (seed * 17 + 5) % 9973; // Algorithme pseudo-random
    }
    return result;
}

window.addEventListener("DOMContentLoaded", (event) => {
    const gen_button = document.getElementById("bkmrk-button");
    if (gen_button) {
        gen_button.addEventListener("click", generateStrings) ;
    }
});