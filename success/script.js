
const userEmail = localStorage.getItem("email");

const userEmailNode = document.getElementById('userEmail');
userEmailNode.innerText = userEmail;

console.log(userEmail);