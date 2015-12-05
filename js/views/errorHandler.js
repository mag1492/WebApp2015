function showError(errorCode){
    if(errorCode == "401"){
        showError401();
    }else if(errorCode == "400"){
        showError400();
    }else{
        swal({  title: "Error" + errorCode,
            text: "Could not retrieve the actor's movies. You will be redirected.",
            type: "error",
            timer: 1890});
    }
}

function showError400(){
    swal({  title: "Error",
        text: "Could not retrieve the content. You will be redirected to the home page.",
        type: "error",
        timer: 2500},
    function(){
        waitAndGoTohome(10);
    });

    waitAndGoTohome(2800);
}

function showError401(){
    swal({  title: "Error",
        text: "You are unauthenticated. Log in or sign up to have access !",
        type: "error",
        timer: 1890},
    function(){
        waitAndGoTohome(10);
    });

    waitAndGoToLogIn(4000);
}

function showError404(){

}

function showError4xx(){

}

function showError500(){

}

function showError5xx(){

}