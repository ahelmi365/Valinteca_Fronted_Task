import { User } from "./User.js";


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
export function preventSpecialChars(e) {
    const iChars = "_~!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    const ch = e.key;

    if (iChars.indexOf(ch) != -1) {
        return false
    } else {
        return e.key;
    }
}

window.preventSpecialChars = preventSpecialChars;

// ============================================================

// the API call:

export function SubmitUserData(e) {

    e.preventDefault();

    //  Creating object of user data to be posted:
    // const update = {
    //     username: userName.value,
    //     email: userEmail.value,
    //     password: userPassword.value,
    //     password_confirmation: userConfirmPassword.value
    // };


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

    fetch(URL, options)
        .then(res => {
            console.log(res);
            return res.json();
        }).then(data => {
            if (data.errors) {
                console.log(data);
                addErrorMessage(data.errors);
            } else {
                // console.log(data);
                localStorage.setItem("email", data.email);
                // console.log(localStorage.getItem("email"));
                window.location.href = '../success/success.html';
            }

        }).catch(e => {
            console.log(e);
        });
}

window.SubmitUserData = SubmitUserData;

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

