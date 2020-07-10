function floatTank(float){
    const floatTankContainer = document.querySelector('div#floatTank');
    const floats = document.getElementsByClassName('float');

    if(float === "home"){
        hideFloats();
        floats[0].style.display = "block";
        floats[1].style.display = "block";
    };
    if(float === "contact"){
        hideFloats();
        floats[2].style.display = "block";
    };
    if(float === "services"){
        hideFloats();
        floats[3].style.display = "block";
        floats[4].style.display = "block";
        floats[5].style.display = "block";
        floats[6].style.display = "block";
        floats[7].style.display = "block";
    };
    if(float === "resume"){
        hideFloats();
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
    hideFloats();
};