var mailExpansionTracker = 0;

function floatTank(float){
    mailExpansionTracker = 0;
    hideFloats();
    let variableFloat = document.getElementsByClassName(`float ${float}`);
    for(i=0; i<variableFloat.length; i++){
        variableFloat[i].style.display = "block";
    }
    if(float === "Demos"){
        let demoIFrame = document.querySelector('iframe');
        demoIFrame.style.display = "none";
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

function floatQuickMail(){
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

function floatDemoLaunch(demo){
    let demoIFrame = document.querySelector('iframe');
    if(demoIFrame.style.display === "none"){
        demoIFrame.style.display = "block";
    }
    document.querySelector('iframe').src = `demo/${demo}.html`;
};

function externalDemoLaunch(demo){
    window.open(`demo/${demo}.html`, `${demo}`);
};

window.onload = () => {
    floatTank(urlLoad());
};