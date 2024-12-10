// import data from "./GPT_response.json" with {type: "json"};
// // import data from './GPT_response.json';
let main = document.getElementsByTagName("main")[0];
function Get_JSON(yourUrl)
{
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}
let data = Get_JSON('https://tymekh.github.io/Szm3gle-Recipes/GPT_response.json')

gameList();

function updateTitle(text){
    if(Object.keys(data).includes(text)){
        text = data[text].gra;
    }
    let collection  = document.getElementsByClassName("title");
    for (let i = 0; i < collection.length; i++) {
        const ele = collection[i];
        ele.innerHTML = text;
    }
}

function gameList(){
    document.body.style.overflow = "hidden";
    let gryContainer = document.getElementsByClassName("gry-container")[0];

    for (const i in data){
        gryContainer.innerHTML += `<div onclick=game('${i}') class=gry style='background-image:url(${data[i].icon})'></div>`;
    }
}

function game(idGry){
    main.innerHTML = '';
    document.body.style.overflow = "auto";
    updateTitle(idGry);

    for (const i in data[idGry].dania){
        let danieObj = data[idGry].dania[i];

        let opis = danieObj.opis;
        if(opis.length > 157){
            opis = opis.slice(0, 157);
            opis += "...";
        }
    
        main.innerHTML += `<div class='item' onclick="danie('${idGry}', '${i}')"><img src="${danieObj.obraz}"></img><nav class='item-text-container'><h2>${danieObj.name}</h2><p>${opis}</p></nav></div>`
    }
}

function danie(idGry, idDanie){
    document.body.style.overflow = "hidden";
    main.innerHTML = '';
    let danie = data[idGry].dania[idDanie];
    updateTitle(danie.name);

    // history.replaceState({}, '', 'placeholder');
    main.innerHTML += "<div class='item'>"+"<img src='"+danie.obraz+"''>"+danie.name+"</div>";
}
