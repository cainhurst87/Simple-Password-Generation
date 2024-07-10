document.addEventListener("DOMContentLoaded", function() {

    // Restart slider value
    document.getElementById('slider-char').value = 12;
    document.getElementById('slider-char-count').textContent = 12;

    // Pre-generate the password on site startup
    updatePassword();

    // Update char count when length is changed
    document.getElementById('slider-char').addEventListener('input', function() {
        document.getElementById('slider-char-count').textContent = this.value;
        updatePassword();
    });

    // Start password generation on "regenerate" input
    document.getElementById('button-regen').addEventListener('click', updatePassword);

    // Copy password text on "copy" input
    document.getElementById('button-copy').addEventListener('click', function() {
        const password = document.getElementById('text-box-password').value;
        navigator.clipboard.writeText(password);
    });

    // Avoid no parameters being selected
    const checkboxList = document.querySelectorAll('.checkbox input[type="checkbox"]');
    checkboxList.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = Array.from(checkboxList).filter(cb => cb.checked).length;
            if (checkedCount === 0) {
                checkbox.checked = true;
            }
        });
    });

});

// Fetch password parameters
function updatePassword() {
    const length = document.getElementById('slider-char').value;
    const useLetters = document.getElementById('checkbox-letter').checked;
    const useSymbols = document.getElementById('checkbox-symbols').checked;
    const useMixedCase = document.getElementById('checkbox-mixed').checked;
    const useNumbers = document.getElementById('checkbox-numbers').checked;

    const password = generatePassword(length, useLetters, useSymbols, useMixedCase, useNumbers);
    document.getElementById('text-box-password').value = password;
}

// Actually generating the password
function generatePassword(length, useLetters, useSymbols, useMixedCase, useNumbers) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const numbers = '0123456789';
    let characters = '';

    if (useLetters) {
        characters += letters;
        if (useMixedCase) {
            characters += letters.toUpperCase();
        }
    }

    if (useSymbols) {
        characters += symbols;
    }

    if (useNumbers) {
        characters += numbers;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randChar = Math.floor(Math.random() * characters.length);
        password += characters[randChar];
    }

    return password;
}
