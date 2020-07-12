function floatTank(float){
    const floatOptions = ["Home", "Demos", "About", "Service", "QuickMail", "Contact"];
    hideFloats();
    for(i=0; i<floatOptions.length; i++){
        if(float == floatOptions[i]){
            let variableFloat = document.getElementsByClassName(`float ${float}`);
            for(i=0; i<variableFloat.length; i++){
                variableFloat[i].style.display = "block";
            }
            if(float != "Contact"){
                let quickMail = document.getElementsByClassName("float QuickMail");
                quickMail[0].style.display = "block";
            }
        }
    }
}

function hideFloats(){
    const floats = document.getElementsByClassName('float');
    for(i=0; i < floats.length; i++){
        floats[i].style.display = "none";
    }
}

function urlLoad(){
    let url = document.URL;
    let urlRef = url.indexOf('#');
    if(urlRef === -1){
        return "Home";
    }
    let urlLoad = url.slice(urlRef+1);
    return urlLoad;
};

window.onload = () => {
    floatTank(urlLoad());
};