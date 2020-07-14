const activeDemos = [
    ["Sketchpad", "HTML CSS Javascript", "DOM Manipulation Deep Dive."], 
    ["PleasantClock", "HTML CSS Javascript", "Project to display times considered pleasant and reduce distraction."], 
    ["RetroCalculator", "HTML CSS Javascript", "Retro-style Calculator."],
];
let mailExpansionTracker = 0;

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

function floatDemoPopulate(){
    for(i=0; i<activeDemos.length; i++){
        const floatDemo = document.getElementsByClassName("float Demos Container");
        let div = document.createElement("div");
        div.setAttribute('class','float Demos');
        div.setAttribute('id',`${activeDemos[i][0]}`);
        div.innerHTML = `
            <div class="floatHeader">
                ${activeDemos[i][0]} - ${activeDemos[i][1]}
            </div>
            <br>
            ${activeDemos[i][2]}
            <br>
            <button onclick='floatDemoLaunch("${activeDemos[i][0]}")'>${activeDemos[i][0]} - Embeded</button>
            <button onclick='externalDemoLaunch("${activeDemos[i][0]}")'>${activeDemos[i][0]} - New Window</button>
            <br>
        `;
        floatDemo[0].appendChild(div);
    }
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
    floatDemoPopulate();
};