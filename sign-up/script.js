const userForm = document.forms['userForm'];

// get form elements
const userName = userForm['username'];
const userEmail = userForm['email'];
const userPassword = userForm['password'];
const userConfirmPassword = userForm['confirm-password'];

// add event listener to all form elements
userName.addEventListener('keyup', checkInputValidity);

userEmail.addEventListener('keyup', checkInputValidity);
userPassword.addEventListener('keyup', checkInputValidity);
userConfirmPassword.addEventListener('keyup', checkInputValidity);
userConfirmPassword.addEventListener('keyup', checkPasswordMatch);

// ============================================================

// fuction to check if the form element it valid
function checkInputValidity(e) {
    const thisErrorText = document.getElementById(`${this.id}-error`);

    if (!(this.validity.valid)) {
        thisErrorText.style.display = 'block'
    } else {
        thisErrorText.style.display = 'none'
    }
}

// ============================================================


// function to check if both passwords are the same
function checkPasswordMatch(e) {
    const confirmPasswordError = document.getElementById('confirm-password-error-match');

    if (userPassword.value !== userConfirmPassword.value) {
        confirmPasswordError.style.display = 'block'

    } else {
        confirmPasswordError.style.display = 'none'
    }
}

// ============================================================

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

// ============================================================

// the API call:

function SubmitUserData(e) {

    e.preventDefault();

    //  Creating object data to be posted:
    const update = {
        username: userName.value,
        email: userEmail.value,
        password: userPassword.value,
        password_confirmation: userConfirmPassword.value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(update),
    };

    fetch('https://goldblv.com/api/hiring/tasks/register', options)
        .then(data => {
            return data.json();
        }).then(update => {
            if (update.errors) {
                addErrorMessage(update.errors);
            } else {
                localStorage.setItem("email", update.email);
                window.location.href = '../success/success.html';
            }

        }).catch(e => {
            console.log(e);
        });
}

// Function to check show error messages from API
function addErrorMessage(errors) {

    for (const error in errors) { // error =username, email, password

        const elementError = document.getElementById(`${error}-error`);

        elementError.style.display = 'block';
        elementError.innerText = "";

        for (const errorElm of errors[`${String(error)}`]) {
            const node = document.createElement("div");
            node.classList.add('left-align');

            const nodeText = document.createTextNode(errorElm);
            node.appendChild(nodeText);
            elementError.appendChild(node);

        }

    }


}

