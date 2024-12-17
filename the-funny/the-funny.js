function theFunny(){
    fun();
    fun();
    fun2();
    fun2();
    zabawa();
    zabawa()
    zabawa2();
    zabawa2();
}
// WAŻNE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\/\/\/\/\/\/\/\\/\/\/\/\/\/\/\/\/\//\/\/\/ NA PROJEKT
let obrazy = ["1.gif", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.gif", "10.gif", "11.png", "12.png", "13.jpg", "14.jpg", "15.png", "16.png", "17.jpg", "18.jpg", "19.jpg", "20.png", "21.png", "22.jpg", "23.png", "24.gif", "25.png", "26.png", "27.png", "28.jpg", "29.png", "30.png", "31.png", "32.png", "33.png", "34.png", "35.jpg", "36.png", "37.png", "38.jpg", "39.png", "40.png", "41.png", "42.jpg", "43.jpg", "44.jpg", "45.png", "46.jpg", "47.gif", "48.gif", "49.gif", "50.gif", "51.gif", "52.png"];

function fun(){
    // let ilosc = 0;
    //{x:Math.round(Math.random() * (window.innerWidth - 400)),y:Math.round(Math.random() * (window.innerHeight - 400))}
    let pozycje = [];
    let pozycja = {x:Math.round(Math.random() * (window.innerWidth - 400)),y:Math.round(Math.random() * (window.innerHeight - 400))}
    let do_dodania = {x:Math.random() * 50 + 50, y:Math.random() * 50 + 50}
    let divy = [];

    for (let i = 0; i < 5; i++){
        pozycje.push(pozycja);
        divy.push(document.createElement("div"));
        divy[i].style.position = "fixed";
        divy[i].style.backgroundImage = "url('./the-funny/"+obrazy[Math.floor(Math.random() * obrazy.length)]+"')"
        divy[i].style.backgroundSize = "100% 100%"
        divy[i].style.width = 400 + "px";
        divy[i].style.height = 400 + "px";
        divy[i].style.left = pozycja.x + "px";
        divy[i].style.top = pozycja.y + "px";
        divy[i].style.zIndex = 10 - i;
        divy[i].style.pointerEvents = "none";

        document.getElementsByTagName("body")[0].appendChild(divy[i]);
    }

    if (Math.random() > 0.5) do_dodania.x = -do_dodania.x;
    if (Math.random() > 0.5) do_dodania.y = -do_dodania.y;

    setInterval(() => {
        let a = pozycje[0].x + do_dodania.x;
        let b = pozycje[0].y + do_dodania.y;

        pozycje.unshift({x: a, y: b})
        pozycje.pop();

        for (const i in divy){
            divy[i].style.left = pozycje[i].x + "px";
            divy[i].style.top = pozycje[i].y + "px"; 
        }

        if (pozycje[0].x >= window.innerWidth - 400 || pozycje[0].x <= 0) do_dodania.x = -do_dodania.x
        if (pozycje[0].y >= window.innerHeight - 400 || pozycje[0].y <= 0) do_dodania.y = -do_dodania.y
    }, 100);
}

function fun2(){
    let pozycje = [];
    let do_dodania = [];
    if (Math.random() > 0.5) do_dodania.x = -do_dodania.x;
    if (Math.random() > 0.5) do_dodania.y = -do_dodania.y;
    let divy = [];
    let losowe = {x:Math.round(Math.random() * (window.innerWidth - 400)),y:Math.round(Math.random() * (window.innerHeight - 400))}

    for (let i = 0; i < 7; i++){
        do_dodania.push({x:30,y:30});
        pozycje.push(losowe);
        divy.push(document.createElement("div"));
        divy[i].style.position = "fixed";
        divy[i].style.backgroundImage = "url('./the-funny/"+obrazy[Math.floor(Math.random() * obrazy.length)]+"')"
        divy[i].style.backgroundSize = "100% 100%"
        divy[i].style.width = 400 + "px";
        divy[i].style.height = 400 + "px";
        divy[i].style.left = pozycje[i].x + "px";
        divy[i].style.top = pozycje[i].y + "px";
        divy[i].style.pointerEvents = "none";
        
        document.getElementsByTagName("body")[0].appendChild(divy[i]);
    }

    setInterval(() => {
        for (const i in divy){
            divy[i].style.top = pozycje[i].y + do_dodania[i].y + "px";
            divy[i].style.left = pozycje[i].x + do_dodania[i].x + "px";
            pozycje[i].x += do_dodania[i].x;
            pozycje[i].y += do_dodania[i].y;
            if (pozycje[i].y >= window.innerHeight - 400 || pozycje[i].y <= 0) do_dodania[i].y = -do_dodania[i].y
            if (pozycje[i].x >= window.innerWidth - 400 || pozycje[i].x <= 0) do_dodania[i].x = -do_dodania[i].x
        }
    }, 30);
}

function zabawa(){
    let losowa = Math.random() * 3500 + 500;

    let div = document.createElement("div");
    div.style.position = "fixed";
    div.style.backgroundImage = "url('./the-funny/"+obrazy[Math.floor(Math.random() * obrazy.length)]+"')"
    div.style.backgroundSize = "100% 100%"
    div.classList.add("znikanie");
    div.style.height = window.innerHeight + "px";
    div.style.width = window.innerWidth + "px";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.zIndex = 21;
    div.style.pointerEvents = "none";
    document.getElementsByTagName("body")[0].appendChild(div);

    setTimeout(() => {
        document.getElementsByTagName("body")[0].removeChild(div);
    }, 750);
    

    setTimeout(zabawa, losowa);
}

function zabawa2(){
    let losowa = Math.random() * 3500 + 500;

    let div = document.createElement("div");
    div.style.position = "fixed";
    div.style.backgroundImage = "url('./the-funny/"+obrazy[Math.floor(Math.random() * obrazy.length)]+"')"
    div.style.backgroundSize = "100% 100%"
    div.style.height = "100px";
    div.style.width = "100px";
    if (Math.random() > 0.5) div.classList.add("obracanie");
    else div.classList.add("skalowanie");
    div.style.left = Math.random() * window.innerWidth +"px";
    div.style.top = Math.random() * window.innerHeight + "px";
    div.style.zIndex = 20;
    div.style.pointerEvents = "none";

    document.getElementsByTagName("body")[0].appendChild(div);

    setTimeout(zabawa2, losowa);
}
