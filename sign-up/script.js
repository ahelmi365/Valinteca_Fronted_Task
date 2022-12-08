const userForm = document.forms['userForm'];

// get form elements
const userName = userForm['userName'];
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

// Get form data as an object


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

    // using constant Data:

    // const update = {
    //     username: "ahmed0saber",
    //     email: "ahmed0saber.com",
    //     password: "123456789",
    //     password_confirmation: "123456789"
    // }

    console.table(update);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(update),
    };

    console.log(options.body);

    fetch('https://goldblv.com/api/hiring/tasks/register', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }

            return data.json();
        }).then(update => {
            console.log(update);
        }).catch(e => {
            console.log(e);
        });
}

