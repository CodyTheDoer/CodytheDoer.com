let activeDemos = [];
let activeFloats = [];
let mailExpansionTracker = 0;

function floatTank(float){
    mailExpansionTracker = 0;
    floatHideAll();
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

function floatHideAll(){
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

function floatInjector(floatRoot, floatClass, float){
    const root = document.getElementsByClassName(floatRoot);
    if(mailExpansionTracker === 0){
        let div = document.createElement(`div`);
        div.setAttribute(`class`,`float ${floatClass}`);
        div.innerHTML = float;
        root[0].appendChild(div);
    };
};

function activeFloatCheck(){
    fetch(`/floats/activeFloats`)
    .then(response => response.text())
    .then((data) => {
        parseAndUpdateFloats(data);
    });
};

function parseAndUpdateFloats(floats){
    let floatParse = floats;
    while(floatParse.length > 0){
        let commaSeperator = floatParse.indexOf(",");
        let float = floatParse.slice(0, commaSeperator);
        floatParse = floatParse.slice(commaSeperator+2);
        activeFloats.push(float)
    };
}

function floatLoader(float, extension){
    fetch(`/floats/${float}.${extension}`)
    .then(response => response.text())
    .then((data) => {
        if(float === "quick-mail"){
            floatInjector("float QuickMail", "MailExpansion", data)
        }else{
            floatInjector("floatTank", float, data);
        };
    });
};

function fileExists(path) {
    if(path){
        var req = new XMLHttpRequest();
        req.open('GET', path, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}

function floatHandler(){
    activeFloatCheck();
    for(i=0; i<activeFloats.length; i++){
        if(fileExists(`/floats/${activeFloats[i]}.header`)){
            floatLoader(activeFloats[i], "header");
        };
        if(fileExists(`/floats/${activeFloats[i]}.body`)){
            floatLoader(activeFloats[i], "body");
        };
        if(fileExists(`/floats/${activeFloats[i]}.form`)){
            floatLoader(activeFloats[i], "form");
        };
    }
    floatTank(urlLoad());
}

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

function externalDemoLaunch(demo){
    window.open(`demo/${demo}.html`, `${demo}`);
};

function floatDemoLaunch(demo){
    let demoIFrame = document.querySelector('iframe');
    if(demoIFrame.style.display === "none"){
        demoIFrame.style.display = "block";
    }
    document.querySelector('iframe').src = `demo/${demo}.html`;
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
    floatHandler()
};


