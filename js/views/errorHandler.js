function showError(errorCode){
    var error = errorCode.toString();

    if(errorCode == "400"){
        showError400();
    }else if(errorCode == "401"){
        showError401();
    }else if(errorCode == "404"){
        showError404();
    }else if(error.substring(0,1) == "4"){
        showError4xx();
    }

    if(errorCode == "500"){
        showError500();
    }else if(error.substring(0,1) == "5"){
        showError5xx();
    }
}

function emptyUsername(){
    swal("Did you forget something?", "Your username is empty. Please enter something!", "warning");
}

function emptyPassword(){
    swal("Did you forget something?", "Your password is empty. This can't do, please write something!", "warning");
}

function invalidEmail(){
    swal("Oops...", "Your email is invalid. Try again.", "warning");
}

function emailPasswordInvalid(){
    swal("Error", "Incorrect username or password. Please try again.", "error");
}

function logError(){
    swal("Error", "Incorrect username or password. Please try again.", "error");
}

function signInError(){
    swal("Error", "We could not sign you up. Please try again.", "error");
}

function showError400(){
    swal({  title: "Error",
        text: "Could not retrieve the content. You will be redirected to the home page.",
        type: "error",
        timer: 2500},
    function(){
        waitAndGoToHome(10);
    });

    waitAndGoToHome(2800);
}

function showError401(){
    swal({  title: "Error",
        text: "You are unauthenticated. Log in or sign up to have access !",
        type: "error",
        timer: 1890},
    function(){
        waitAndGoToHome(10);
    });

    waitAndGoToLogIn(4000);
}

function showError404(){
    swal({  title: "Error",
            text: "Could not retrieve the content. Please try again.",
            type: "error",
            timer: 2500},
        function(){
            waitAndGoToHome(10);
        });

    waitAndGoToHome(2800);
}

function showError4xx(){
    swal({  title: "Error",
            text: "Oops, you did something wrong. We'll fix it for you. You will be redirected to the home page.",
            type: "error",
            timer: 2500},
        function(){
            waitAndGoToHome(10);
        });

    waitAndGoToHome(2800);
}

function showError500(){
    swal({  title: "Error",
            text: "Unexpected Internal Error. You will be redirected to the home page.",
            type: "error",
            timer: 2500},
        function(){
            waitAndGoToHome(10);
        });

    waitAndGoToHome(2800);
}

function showError5xx(){
    swal({  title: "Oops...",
            text: "Sorry, something went awry... You will be redirected to the home page.",
            type: "error",
            timer: 2500},
        function(){
            waitAndGoToHome(10);
        });

    waitAndGoToHome(2800);
}