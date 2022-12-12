import { User } from "./User.js";

const userForm = document.forms['userForm'];

// get all form elements
const userName = userForm['username'];
const userEmail = userForm['email'];
const userPassword = userForm['password'];
const userConfirmPassword = userForm['confirm-password'];

// add event listener to all form elements to check validity
userName.addEventListener('keyup', checkInputValidity);
userEmail.addEventListener('keyup', checkInputValidity);
userPassword.addEventListener('keyup', checkInputValidity);
userConfirmPassword.addEventListener('keyup', checkInputValidity);

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

// check if both passwords are the same
userConfirmPassword.addEventListener('keyup', checkPasswordMatch);

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

// prevent special characters in userName input field:
userName.addEventListener('keypress', preventSpecialChars);

// function to prevent special characters
function preventSpecialChars(e) {
    // console.log(e.key);
    const iChars = "_~!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    const ch = e.key;

    if (iChars.indexOf(ch) != -1) {

        e.preventDefault()
        return false
    } else {
        return e.key;
    }
}

// ============================================================


// on From Submit:
userForm.addEventListener('submit', SubmitUserData);


// function to run on Form Submit
function SubmitUserData(e) {

    e.preventDefault();

    // create instace of User Object (Using OOP)
    const newUser = new User(userName.value, userEmail.value, userPassword.value, userConfirmPassword.value);
    // console.log(newUser);

    const URL = 'https://goldblv.com/api/hiring/tasks/register'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newUser),
    };

    // the API call:
    fetch(URL, options) // returns a Promise
        .then(res => {
            // console.log(res);
            return res.json(); // returns a Promise
        }).then(jsonUserData => {
            if (jsonUserData.errors) {
                // console.log(jsonUserData);
                addErrorMessage(jsonUserData.errors);
            } else {
                // console.log(data);
                localStorage.setItem("email", jsonUserData.email);
                // console.log(localStorage.getItem("email"));
                window.location.href = '../success/success.html';
            }

        }).catch(e => {
            console.log(e);
        });
}


// ============================================================

// Function to show error messages from API
function addErrorMessage(errors) {

    for (const error in errors) { // error =[username, email, password]

        const elementError = document.getElementById(`${error}-error`);

        elementError.style.display = 'block';
        elementError.innerText = "";

        for (const errorMessage of errors[`${String(error)}`]) {

            const node = document.createElement("div");
            node.classList.add('left-align');

            const nodeText = document.createTextNode(errorMessage);
            node.appendChild(nodeText);

            elementError.appendChild(node);
        }
    }

}

