       function maxLengthCheck(input) {
            if (input.value.length > input.maxLength) {
                input.value = input.value.slice(0, input.maxLength);
            }
        }

        function generateStrings() {
            var seed = document.getElementById('seed').value;

            // Vérifier si le seed est vide ou pas un chiffre
            if (!seed || isNaN(seed)) {
                alert('Please enter a valid seed.');
                return;
            }

            // S'assure que c'est maximum 5 chiffres
            seed = seed.slice(0, 5);

            // Génèere les différent codes
            var string1 = generateNumericString(seed, 4);
            var string2 = generateMixedString(seed, 8);
            var string3 = generateMixedString(seed, 16);

            // Affiche les différents codes
            document.getElementById('string1').innerText = "1) " + string1;
            document.getElementById('string2').innerText = "2) " + string2;
            document.getElementById('string3').innerText = "3) " + string3;
        }

        function generateNumericString(seed, length) {
            seed = (seed * 31 + 17) % 9973;
            return Math.abs(seed).toString().padStart(length, '0').slice(0, length);
        }

        function generateMixedString(seed, length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?';
            var result = '';
            for (var i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(seed % chars.length));
                seed = (seed * 17 + 5) % 9973; // Algorythme pseud-random
            }
            return result;
