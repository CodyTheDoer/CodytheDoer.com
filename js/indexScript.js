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

function floatDemoReturn(){
    const demoList = [];
    const floatDemos = document.getElementsByClassName("float Demos");
    for(i=0; i<floatDemos.length; i++){
        demoList.push(floatDemos[i].id)
    }
    return demoList;
};

function floatDemoImport(){
    const demoList = floatDemoReturn();
    for(i=0; i<demoList.length; i++){
        let imported = document.createElement('script');
        imported.src = `demo/js/demo${demoList[i]}.js`;
        document.head.appendChild(imported);
    };
}

function floatDemoLaunch(demo){
    var doc = document.implementation.createHTMLDocument();
    doc.src = `demo/html/demo${demo}.html`
    var iframeDoc = document.querySelector('iframe').contentDocument;
    iframeDoc.replaceChild(doc.documentElement, iframeDoc.documentElement);
};

window.onload = () => {
    floatTank(urlLoad());
    floatDemoImport();
};