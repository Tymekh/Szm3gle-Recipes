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

    console.log("tak");
    for (const i in data){
        // let strona = data[i].gra.replace(" ", '').replace("'", '').toLowerCase();
        let url = new URL("gry.html", location.href);
        let params = new URLSearchParams(url);
        params.set("gra", i);
        let link = url + "?" +params.toString();
        
        main.innerHTML += `<div onclick=game('${i}') class=item>${i.replaceAll("_", " ")}</div>`;
        // main.innerHTML += "<div onclick='window.location="+"gry.html?gra="+"' class='item'></div>";
        // main.innerHTML += '<div onclick="window.location='+'"'+"gry.html?gra=Terraria"+'"'+' class="item"></div>';
        // main.innerHTML += "<div onclick=window.location='./gry"+".html"+"?gra="+i+" class='item''>"+data[i].gra+"</div>";
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
        // let url = new URL("item.html", location.href);
        // let params = new URLSearchParams(url);
        // params.set("gra", idGry);
        // params.set("danie", i);
    
        // let link = url+"?"+params.toString();
        // console.log(link);
        let link = '';
    
        let danieObj = data[idGry].dania[i];
    
        // let strona = data[0].gra.replace(" ", '').replace("'", '').toLowerCase();
        
        // main.innerHTML += `<div onclick='window.location="${link}" class='item'><p><img src='${data[idGry].dania[i].obraz}'>${data[idGry].dania[i].name}</p></div>`;
        main.innerHTML += `<div class='item' onclick="danie('${idGry}', '${i}')"><img src="${danieObj.obraz}"></img>${danieObj.name}</div>`
    }
}

function danie(idGry, idDanie){
    main.innerHTML = '';
    let danie = data[idGry].dania[idDanie];

    // history.replaceState({}, '', 'placeholder');
    main.innerHTML += "<div class='item'>"+"<img src='"+danie.obraz+"''>"+danie.name+"</div>";
}
