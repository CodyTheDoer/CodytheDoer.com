function floatTank(float){
    const floatTankContainer = document.querySelector('div#floatTank');
    const floats = document.getElementsByClassName('float');

    if(float === home){
        hideFloats();
        floats[0].style.display = "block";
    };
    if(float === services){};
    if(float === resume){};
    if(float === contact){};
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