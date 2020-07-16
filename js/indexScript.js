let activeDemos = [];
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

function externalDemoLoader(){
    fetch('/demo/activeDemos')
    .then(response => response.text())
    .then((data) => {
        parseAndUpdateDemos(data);
        floatDemoPopulate();
    })
}

function parseAndUpdateDemos(demos){
    let demoParse = demos;
    while(demoParse.length > 5){
        let demoStart = demoParse.indexOf(`["`);
        let demoEnd = demoParse.indexOf(`],`);
        let pendingDemoFull = demoParse.slice(demoStart+1, demoEnd);
        pendingDemoFull.replace(/^"(.+(?="$))"$/, '$1'); //regex to clean up double quotes.
        let demoNameEnd = pendingDemoFull.indexOf(`",`);
        let demoName = pendingDemoFull.slice(1, demoNameEnd);
        let demoTrimmed = pendingDemoFull.slice(demoNameEnd+3)
        let demoToolsEnd = demoTrimmed.indexOf(`",`);
        let demoTools = demoTrimmed.slice(1, demoToolsEnd);
        let demoDescriptorEnd = demoTrimmed.lastIndexOf(`"`);
        let demoDescriptor = demoTrimmed.slice(demoToolsEnd+4, demoDescriptorEnd);
        let demoArray = [demoName, demoTools, demoDescriptor]
        activeDemos.push(demoArray);
        demoParse = demoParse.slice(demoParse.indexOf(`],`)+3);
    };
}


externalDemoLoader();

window.onload = () => {
    floatTank(urlLoad());
};


