 // import data from "./GPT_response.json" with {type: "json"};rr
// import data from './GPT_response.json';
let last;
let main = document.getElementsByTagName("main")[0];
function Get_JSON(yourUrl)
{
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}
let data = Get_JSON(location.href+'/GPT_response.json')


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
    main.innerHTML = `
    <div class="gry-container">
    
    </div>
    <hr style="width: 90%;height: 2px; background-color: black;">
    <p class="opis">
        Witaj na stronie pełnej pysznych i łatwych przepisów z gier komputerowych! Znajdziesz tu różnorodne propozycje na dania, które możesz przygotować w zaciszu swojej bazy. Niezależnie od tego, czy szukasz inspiracji na szybki obiad, czy chcesz się szybko uleczyć – mamy coś dla Ciebie. Przeglądaj przepisy, poznawaj nowe schematy w kuchni i ciesz się bonusami!
    </p>`;
    updateTitle("Przepisy");
    document.getElementsByClassName("back")[0].style.visibility = "hidden";
    document.getElementsByClassName("filtry")[0].style.display = "block";
    document.body.style.overflow = "hidden";
    let gryContainer = document.getElementsByClassName("gry-container")[0];
    
    // console.log(data.games);
    data.games.forEach(i => {
        // console.log(i);
        gryContainer.innerHTML += `<div onclick=game('${i}') class=gry style='background-image:url(${data[i].icon})'></div>`;
    });
    window.scrollTo(0, 0);
}

function game(idGry){
    window.scrollTo(0, 0);
    main.innerHTML = ``;
    document.getElementsByClassName("back")[0].style.visibility = "visible";
    document.getElementsByClassName("filtry")[0].style.display = "none";
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
    last = gameList.bind(null);
}

function danie(idGry, idDanie){
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    main.innerHTML = '';
    document.getElementsByClassName("back")[0].style.visibility = "visible";
    let danie = data[idGry].dania[idDanie];
    updateTitle(danie.name);

    // history.replaceState({}, '', 'placeholder');
    // console.log(danie.przygotowanie);
    main.innerHTML += `<div class='item-food'><img src="${danie.obraz}" class="obraz"></img><nav class='danie-text-container'><h2>${danie.name}</h2><p>${danie.opis}</p><hr><p><b>Składniki:</b> ${danie.skladniki}</p><hr><p><b>AGD: </b>${danie.AGD}</p><hr><b>Przygotowanie:</b> <br><p>${danie.przygotowanie}</p></nav></div>`
    // main.innerHTML += "<div class='item'>"+"<img src='"+danie.obraz+"''>"+danie.name+"</div>";
    last = game.bind(null, idGry);
}


function back(){
    last()
}

gameList(); // <---- Startowanie strony