const userForm = document.forms['userForm'];

// get form elements
const userName = userForm['userName'];
const userEmail = userForm['email'];
const userPassword = userForm['password'];
const userConfirmPassword = userForm['confirm-password'];

// add event listener to all form elements
userName.addEventListener('keyup', checkValidity);

userEmail.addEventListener('keyup', checkValidity);
userPassword.addEventListener('keyup', checkValidity);
userConfirmPassword.addEventListener('keyup', checkValidity);
userConfirmPassword.addEventListener('keyup', checkPasswordMatch);

// fuction to check if the form element it valid
function checkValidity(e) {
    const thisErrorText = document.getElementById(`${this.id}-error`);

    if (!(this.validity.valid)) {
        thisErrorText.style.display = 'block'
    } else {
        thisErrorText.style.display = 'none'
    }
}

// function to check if both passwords are the same
function checkPasswordMatch(e) {
    const confirmPasswordError = document.getElementById('confirm-password-error-match');

    if (userPassword.value !== userConfirmPassword.value) {
        confirmPasswordError.style.display = 'block'

    } else {
        confirmPasswordError.style.display = 'none'
    }
}

// function to prevent special characters
function preventSpecialChars(e) {
    const iChars = "_~!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    const ch = e.key;

    if (iChars.indexOf(ch) != -1) {
        return false
    } else {
        return e.key;
    }
}