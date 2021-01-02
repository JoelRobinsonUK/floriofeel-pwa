//render flower options on home screen
function renderFlowerOption(data, id) {

    const html = `
        <div class="col s4 l4" data-id="${id}">
            <div class="card" style="border-radius: 10px;">
                <a onclick="showName('${id}','${data.name}','${data.description}','${data.emotion}','${data.clicks}','${data.latin}','${data.image}','${data.info}');">
                    <div class="card-content"><img style="opacity: 100%;" class="responsive-img" src="${data.image}" alt=""></div>
                </a>
            </div>
        </div>
    `;

    document.querySelector('.flowers').innerHTML += html;

}

function showName(id, name, desc, emotion, clicks, latin, image, info) {

    document.querySelector('.highlight').innerHTML = null;

    const html = `
        <h5>${name}</h5>
        <p>${desc}</p>
        <div class="col s8 l8 offset-l2 offset-s2">
            <br>
            <a id="proceed" href="./nudges.html" class="btn"
                style="border-radius: 100px; width: 100%; background-color: #403038;">
                <span style="font-size: x-small;">Proceed</span>
            </a>
        </div>
    `;

    sessionStorage.setItem("id", id)
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("emotion", emotion);
    sessionStorage.setItem("clicks", clicks);
    sessionStorage.setItem("latin", latin);
    sessionStorage.setItem("image", image);
    sessionStorage.setItem("info", info);

    document.querySelector('.highlight').innerHTML += html;
}


function populateNudges() {

    db.collection('flowers').doc(sessionStorage.getItem("id")).collection('nudges').onSnapshot((snapshot) => {
        //console.log(snapshot.docChanges());
        var nudgeNum = 1;
        snapshot.docChanges().forEach(change => {
            sessionStorage.setItem(nudgeNum, change.doc.id);
            nudgeNum++;
            console.log(change.doc.id); //this works
        });
    });

    var html = `
        <h5>You are not alone...</h5>
        <h1>${sessionStorage.getItem("clicks")}</h1>
        <h5>... other Floriofeel ${sessionStorage.getItem("clicks") == "1" ? "user" : "users"} chose the ${sessionStorage.getItem("name")} today.</h5>

        <br>

        <div class="row">
            <div class="col s12 l12">
                <div class="card" style="border-radius: 10px;">
                    <div class="card-content">
                        <h5>If you're feeling ${sessionStorage.getItem("emotion")}, consider...</h5>

                        <ul class="list">
                            <li>${sessionStorage.getItem("1")}</li>
                            <li>${sessionStorage.getItem("2")}</li>
                            <li>${sessionStorage.getItem("3")}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col s8 l8 offset-l2 offset-s2">
                <br>
                <a href="./info.html" class="btn"
                    style="border-radius: 100px; width: 100%; background-color: #403038;"><span
                        style="font-size: x-small;">About the ${sessionStorage.getItem("name")}</span></a>
            </div>

            <div class="col s8 l8 offset-l2 offset-s2">
                <br>
                <a href="./history.html" class="btn"
                    style="border-radius: 100px; width: 100%; background-color: #403038;"><span
                        style="font-size: x-small;">conclude</span></a>
            </div>
        </div>
    `;

    document.querySelector('.nudges').innerHTML += html;


    var clicks = Math.floor(sessionStorage.getItem("clicks"));
    clicks += 1;

    db.collection('flowers').doc(sessionStorage.getItem("id")).update({
        clicks: clicks
    });

}

function populateInfo() {

    const html = `
        <div class="row">
            <div class="col s4 l4">
                <img class="responsive-img" src="${sessionStorage.getItem("image")}" alt="">
            </div>
            <div class="col s8 l8 center">
                <h4>${sessionStorage.getItem("name")}</h4>
                <h6><i>${sessionStorage.getItem("latin")}</i></h6>
            </div>
        </div>
        <div class="row">
                <div class="col s12 l12">
                    <div class="card" style="border-radius: 10px;">
                        <div class="card-content info-body">
                            <p>${sessionStorage.getItem("info")}</p>
                        </div>
                    </div>
                </div>
            </div>
        
    `;

    document.querySelector('.info').innerHTML += html
}

function populateHistory(data, id) {

    var html = `
        <div class="col s12 l12">
            <a href="#${id}" class="modal-trigger black-text" style="background-color: #403038;">
                <div class="card" id="${id}" style="border-radius: 10px;">
                    <div class="card-content">
                        <div class="row">
                            <div class="col s4 l4">
                                <img class="responsive-img" src="${data.image}" alt="">
                            </div>
                            <div class="col s8 l8 right-align">
                                <span style="font-size: x-large;">${data.name} </span><br>
                                <span style="font-size: large;">(${data.emotion})</span>
                            </div>
                        </div>
                        
                        <p style="font-size: small;" class="right">${data.time} - ${data.day} ${data.month} ${data.year}</p>
                    </div>   
                    
                </div>
                
            </a>

        </div>
    `;

    document.querySelector('.history').innerHTML += html;

    html = `
        <div class="modal" id="${id}" style="border-radius: 10px;">
            <div class="container">
                <br>
                <div class="row">
                    <div class="col s3 l3">
                        <img class="responsive-img" src="${data.image}" alt="">
                    </div>
                    <div class="col s9 l9">
                        <span style="font-size: x-large;">${data.name}</span>
                        <span style="font-size: large;"> (${data.emotion})</span><br>
                        <span style="font-size: small;"><i>${data.day} ${data.month} ${data.year}</i></span>
                    </div>
                </div>
                <br>
                <div class="row ${id}-note">
    `;

    if(data.note){
        html += `
            <div class="col s12 l12">
                <p>${data.note}</p>
                <br>
            </div>
            <div>
                <a style="background-color: #403038;" class="btn-floating" onclick="" id="${id}-edit">
                    <i class="material-icons">create</i>
                </a>
        `;

        // document.getElementById(id + "-edit").style.display = block;
        // document.getElementById(id + "-save").style.display = none;

    } else {
        html += `
        <div class="col s12 l12">
            <form id="form-${id}">
                <div class="input-field">
                    <textarea class="materialize-textarea" id="${id}-textarea" type="text" data-length="250" onKeyPress="if(this.value.length==250) return false;"></textarea>
                    <label for="${id}-textarea">Add a note...</label>
                </div>
            </form>
        </div>
        <div>
                <a style="background-color: #403038;" class="btn-floating" onclick="SaveNote('${id}')" id="${id}-save">
                    <i class="material-icons">save</i>
                </a>
        `;

        // document.getElementById(id + "-edit").style.display = none;
        // document.getElementById(id + "-save").style.display = block;
    }

    html+= `
            
                <a class="btn-floating red darken-4 white-text" id="${id}-delete">
                <i class="material-icons">delete</i>
                </a>
                
            </div>
        </div>
    `;

    document.querySelector('.modals').innerHTML += html;
}