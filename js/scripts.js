function floatTank(float){
    const floats = document.getElementsByClassName('float');

    if(float === "home"){
        hideFloats();
        floats[0].style.display = "block";
        floats[8].style.display = "block";
    };
    if(float === "contact"){
        hideFloats();
        floats[1].style.display = "block";
    };
    if(float === "services"){
        hideFloats();
        floats[2].style.display = "block";
        floats[3].style.display = "block";
        floats[4].style.display = "block";
        floats[5].style.display = "block";
        floats[8].style.display = "block";
    };
    if(float === "resume"){
        hideFloats();
        floats[6].style.display = "block";
        floats[8].style.display = "block";
    };
    if(float === "projects"){
        hideFloats();
        floats[7].style.display = "block";
        floats[8].style.display = "block";
    };
}

function hideFloats(){
    const floats = document.getElementsByClassName('float');
    for(i=0; i < floats.length; i++){
        floats[i].style.display = "none";
    }
}

window.onload = () => {
    floatTank("home");
};