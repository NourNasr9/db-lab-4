function showRegistration() {
    document.getElementById("registrationFormContainer").style.display = "block";
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("welcomeMessageContainer").style.display = "none";
}

function showLogin() {
    document.getElementById("loginFormContainer").style.display = "block";
    document.getElementById("registrationFormContainer").style.display = "none";
    document.getElementById("welcomeMessageContainer").style.display = "none";
}

function showWelcomeMessage() {
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("registrationFormContainer").style.display = "none";
    document.getElementById("welcomeMessageContainer").style.display = "block";
}

function validateEmailInput(email) {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidation.test(email);
}

function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const registrationMessage = document.getElementById("registrationMessage");

    registrationMessage.textContent = "";
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    let n = true;

    if (!name && !email && !password && !confirmPass) {
        registrationMessage.textContent = "All fields are required.";
        return;
    }
    if (!name) {
        document.getElementById("nameError").textContent = "Name is required";
        n = false;
    }
    if (!email) {
        document.getElementById("emailError").textContent = "Email is required";
        n = false;
    }
    if (!validateEmailInput(email)) {
        document.getElementById("emailError").textContent = "You must enter a valid email";
        n = false;
    }
    if (!password) {
        document.getElementById("passwordError").textContent = "Password is required";
        n = false;
    }
    if (!confirmPass) {
        document.getElementById("confirmPasswordError").textContent = "You must confirm ur password";
        n = false;
    }
    if (password !== confirmPass) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        n = false;
    }

    if (n) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "registeration.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText.includes("Welcome")){
                    showWelcomeMessage();
                    document.getElementById("welcomeMessage").textContent = xhr.responseText;
                }else {
                    registrationMessage.textContent = xhr.responseText;
                }
            }
        };
        xhr.send(`name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    }
}

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const loginMessage = document.getElementById("loginMessage");

    loginMessage.textContent = "";
    document.getElementById("loginEmailError").textContent = "";
    document.getElementById("loginPasswordError").textContent = "";
    let n = true;
    
    if (!email && !password) {
        loginMessage.textContent = "Email and Password are required.";
        return;
    }
    if (!email) {
        document.getElementById("loginEmailError").textContent = "Email is required";
        n = false;
    }
    if (!validateEmailInput(email)) {
        document.getElementById("loginEmailError").textContent = "You must enter a valid gmail";
        n = false;
    }
    if (!password) {
        document.getElementById("loginPasswordError").textContent = "Password is required";
        n = false;
    }

    if (n){
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "login.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (xhr.responseText.includes("Welcome")){
                        showWelcomeMessage();
                        document.getElementById("welcomeMessage").textContent = xhr.responseText;
                    }else {
                        loginMessage.textContent = xhr.responseText;
                    }
                }
            }
        };
        xhr.send(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    }
}
