var mailExpansionTracker = 0;

function floatTank(float){
    mailExpansionTracker = 0;
    hideFloats();
    let variableFloat = document.getElementsByClassName(`float ${float}`);
    for(i=0; i<variableFloat.length; i++){
        variableFloat[i].style.display = "block";
    }
    if(float != "Contact"){
        let quickMail = document.getElementsByClassName("float QuickMail");
        quickMail[0].style.display = "block";
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

function quickMail(){
    const quickMail = document.getElementsByClassName("float QuickMail");
    if(mailExpansionTracker === 0){
        let div = document.createElement("div");
        div.setAttribute('class','float MailExpansion');
        div.innerHTML = `
            <form class="contactForm">
                <label for="email">Your Email (required)</label>
                <input type="text" id="email" name="email">
                <br>
                <input type="submit" value="Send">
                <br>
            </form>   
        `;
        quickMail[0].appendChild(div);
        mailExpansionTracker++;
    };
};

window.onload = () => {
    floatTank(urlLoad());
};