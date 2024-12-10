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


window.test = function(){
    console.log("test");
    document.body.innerHTML += "test ";
}

function game_list(){
    let gryContainer = document.getElementsByClassName("gry-container")[0];

    console.log("tak");
    for (const i in data){
        // let strona = data[i].gra.replace(" ", '').replace("'", '').toLowerCase();
        let url = new URL("gry.html", location.href);
        let params = new URLSearchParams(url);
        params.set("gra", i);
        let link = url + "?" +params.toString();
        
        gryContainer.innerHTML += `<div onclick=game('${i}') class=gry>${i.replaceAll("_", " ")}</div>`;
    }
}

function game(idGry){
    main.innerHTML = '';
    let collection  = document.getElementsByClassName("title");
    for (let i = 0; i < collection.length; i++) {
        const ele = collection[i];
        ele.innerHTML = idGry.replaceAll("_", " ");
        
    }
    for (const i in data[idGry].dania){
        let danieObj = data[idGry].dania[i];
    
        main.innerHTML += `<div class='item' onclick="danie('${idGry}', '${i}')"><img src="${danieObj.obraz}"></img>${danieObj.name}</div>`
    }
}

function danie(idGry, idDanie){
    main.innerHTML = '';
    let danie = data[idGry].dania[idDanie];

    // history.replaceState({}, '', 'placeholder');
    main.innerHTML += "<div class='item'>"+"<img src='"+danie.obraz+"''>"+danie.name+"</div>";
}
