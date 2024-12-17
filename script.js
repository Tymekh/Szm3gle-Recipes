 // import data from "./GPT_response.json" with {type: "json"};rr
// import data from './GPT_response.json';
let main = document.getElementsByTagName("main")[0];
let data;
let foodList;
let pastFun = [];
const pixelGames = ["Stardew_Valley", "Terraria", "Minecraft", "Stardew Valley"]
// let current;
 
async function Get_JSON(url)
{
    const response = await fetch(url);
    const json = await response.json();
    // var Httpreq = await fetch(yourUrl); // a new request
    // fetch(yourUrl).then(response => {console.log(response.response)});
    // Httpreq.open("GET",yourUrl,false);
    // Httpreq.send(null);
    return await json;
}
 
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
 
function displayGameList(){
    main.style.padding = "0";
    main.style.minHeight= "84vh";
    main.innerHTML =
    `
        <div class="gry-container">
           
        </div>
        <hr class="main-hr">
        <p class="opis">
            Witaj na stronie pełnej pysznych i łatwych przepisów z gier komputerowych! Znajdziesz tu różnorodne propozycje na dania, które możesz przygotować w zaciszu swojej bazy. Niezależnie od tego, czy szukasz inspiracji na szybki obiad, czy chcesz się szybko uleczyć - mamy coś dla Ciebie. Przeglądaj przepisy, poznawaj nowe schematy w kuchni i ciesz się bonusami!
        </p>
    `;
    updateTitle("Przepisy");
    document.getElementsByClassName("back")[0].style.visibility = "hidden";
    document.getElementsByClassName("filtry")[0].style.display = "block";
    document.body.style.overflow = "hidden";
    let gryContainer = document.getElementsByClassName("gry-container")[0];
   
    // console.log(data.games);
    data.games.forEach(i => {
        // console.log(i);
        gryContainer.innerHTML += `<div onclick=displayGame('${i}') class=gry style='background-image:url(${data[i].icon})'></div>`;
    });
    window.scrollTo(0, 0);
    pushFront(displayGameList.bind(null))
}
 
function displayGame(idGry){
    window.scrollTo(0, 0);
    main.style.padding = "3vh 0 3vh 0";
    main.style.minHeight= "84vh";
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
        // console.log(data[idGry].dania[i])
        let ele = foodList.findIndex(ele => ele === data[idGry].dania[i])
        console.log(idGry == 'Terraria')
        main.innerHTML += `<div class='item' onclick="displayDanie(${ele})"><img src="${danieObj.obraz}" style='${pixelGames.includes(idGry)  ? 'image-rendering: pixelated;' : ''}'></img><nav class='item-text-container'><h2>${danieObj.name}</h2><p>${opis}</p></nav></div>`
    }
    pushFront(displayGame.bind(null,idGry));
}
 
function displayDanie(danie){
    // console.log(`idGry: ${idGry}, idDanie: ${idDanie}`)
    danie = foodList[danie]
    window.scrollTo(0, 0);
    main.style.padding = "3vh 0 3vh 0";
    main.style.minHeight= "78vh";
    document.body.style.overflow = "hidden";
    main.innerHTML = '';
    document.getElementsByClassName("back")[0].style.visibility = "visible";
    // let danie = data[idGry].dania[idDanie];
    // console.log(danie);
    updateTitle(danie.name);
 
    // history.replaceState({}, '', 'placeholder');
    // console.log(danie.przygotowanie);
    main.innerHTML += `<div class='item-food'><img src="${danie.obraz}" class="obraz" style='${pixelGames.includes(danie.gra)  ? 'image-rendering: pixelated;' : ''}'></img><nav class='danie-text-container'><h2>${danie.name}</h2><p>${danie.opis}</p><hr><p><b>Składniki:</b> ${danie.skladniki}</p><hr><p><b>AGD: </b>${danie.AGD}</p><hr><b>Przygotowanie:</b> <br><p>${danie.przygotowanie}</p></nav></div>`
    // main.innerHTML += "<div class='item'>"+"<img src='"+danie.obraz+"''>"+danie.name+"</div>";
    pushFront(displayDanie.bind(null, danie));
}
 
function search(tag, game = []){
    let gameList = game.length == 0 ? data.games : game;
   
    const foodList = gameList.reduce((acc, ele) => {
        return acc.concat(data[ele].dania)
    }, [])
   
    const foodWithTags = foodList.reduce((acc, ele) => {
        return acc.concat(ele = tag.reduce((a, e) => {
            return a && ele.tags.includes(e);
        }, true) ? ele : [])
    }, []);
   
    // console.log(foodList);
    // console.log(foodWithTags)
    return foodWithTags;
}
 
function displayTags(){
    const games = Array.from(document.getElementById("wyszukiwanie").querySelectorAll("input")).reduce((acc, ele) => {
        return acc.concat(ele = data.games.includes(ele.id) && ele.checked ? ele.id : [])
    }, [])
    const tags = Array.from(document.getElementById("wyszukiwanie").querySelectorAll("input")).reduce((acc, ele) => {
        return acc.concat(ele = data.tags.includes(ele.id) && ele.checked ? ele.id : [])
    }, [])
    console.log(games)
    // let tags = ["bez laktozy", "przekąska"]
    // games = []
 
    window.scrollTo(0, 0);
    main.style.padding = "3vh 0 3vh 0";
    main.style.minHeight= "84vh";
    main.innerHTML = ``;
    document.getElementsByClassName("back")[0].style.visibility = "visible";
    document.getElementsByClassName("filtry")[0].style.display = "none";
    document.body.style.overflow = "auto";
    updateTitle("Wyszukiwanie");
 

    if(search(tags,games).length==0){
        main.innerHTML +=   `<div class='pusty-wynik'>
                                <p>Nie znaleziono żadnych wyników</p><img src="./obrazy/pusty.png" alt="pusty wynik">
                            </div>`;
        main.style.paddingTop ="2vh";
        main.style.paddingBottom ="0";
        main.style.minHeight="82vh"


       
    }else{
        search(tags, games).forEach(ele => {
            let opis = ele.opis;
            if(opis.length > 157){
                opis = opis.slice(0, 157);
                opis += "...";
            }
       
            let eleId = foodList.findIndex(e => e === ele)
            console.log(pixelGames.includes(ele.gra))
            main.innerHTML += `<div class='item' onclick="displayDanie('${eleId}')"><img src="${ele.obraz}" style='${pixelGames.includes(ele.gra)  ? 'image-rendering: pixelated;' : ''}'></img><nav class='item-text-container'><h2>${ele.name}</h2><p>${opis}</p></nav></div>`
        });
    }
    pushFront(displayTags.bind(null));
    console.log(search(tags,games));
}
 
 
function displayFiltry(){
    let wyszukiwanie = document.getElementById("wyszukiwanie")
    wyszukiwanie.innerHTML += "<h1>Gry:</h1>";
    data.games.forEach(element => {
        wyszukiwanie.innerHTML += "<label><input type='checkbox' style='border: 0; border-radius: 0;' id='"+element+"'>"+data[element].gra+"</label>";
    });
    wyszukiwanie.innerHTML += "<hr>";
    wyszukiwanie.innerHTML += "<h1>Tagi:</h1>";
    data.tags.forEach(element => {
        wyszukiwanie.innerHTML += "<label><input type='checkbox' style='border: 0; border-radius: 0;' id='"+element+"'>"+element+"</label>";
    });
    wyszukiwanie.innerHTML += "<hr>";
    wyszukiwanie.innerHTML += "<input type='button' value='Wyszukaj' onclick='displayTags()'>"
}
 
function pushFront(fun){
    // console.log(fun);
    pastFun.unshift(fun);
}
 
function last(){
    // console.log(pastFun.at(-1))
    pastFun.at(1)();
    pastFun.shift()
    pastFun.shift()
}
 
Get_JSON('./GPT_response.json').then((res) => data = res).then(() => { // <--- ładuje json'a i przypisuje do zmiennej data
    displayGameList(); // <---- Startowanie strony
    displayFiltry();
    foodList = data.games.reduce((acc, ele) => {
        return acc.concat(data[ele].dania)
    }, [])
});
 
 
// document.body.addEventListener("click", () => {
//     data.games.forEach(element => {
//         data[element].dania.forEach(ele => {
//             ele.tags.forEach(e => {
//                 if (!(data.tags.includes(e))) console.log(ele);
//             });
//         });
//     });
// });