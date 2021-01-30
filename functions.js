var time = [];
var textTime = 0;
var pantalla = 0;
var timer = 0;
var rango;
var actual;
var index;

// Keybindings
document.getElementsByTagName("html")[0].addEventListener("keypress", function(event) {
    if (event.key == " ") {
        if (document.getElementById("playButton")) {
            play();
        }
        else if (document.getElementById("stopButton")) {
            stop();
        };
    }
    else if (event.key === "Enter") {
        if (document.getElementById("finishButton")) {
            finish();
        }
        else if (document.getElementsByClassName("button").length == 2) {
            start();
        }
    };
});

function start() {

    document.getElementsByTagName("html")[0].style.background = "linear-gradient(to bottom right, #ff9933 0%, #ff0066 80%)";
    var center = [document.getElementById("centerPoint").offsetTop-10, document.getElementById("centerPoint").offsetLeft-10];
    var radius = 200;
    time = [25, 0];
    pantalla = 0;
    rango = Math.trunc((time[0]*60+time[1])/12);
    actual = (time[0]*60+time[1])-rango;
    index = 0;

    
    document.getElementsByClassName("counter")[0].innerHTML = "25:00"

    let cont = document.getElementById("buttonCont")
    cont.innerHTML = '';

    cont.style.width = "80px";

    let playb = document.createElement("img");
    playb.src = "img/PlayButton.png";
    playb.className = "button";
    playb.style.left = "0px";
    playb.id = "playButton";
    playb.onclick = play;
    cont.appendChild(playb);

    if (document.getElementsByClassName("leaf").length == 0) {

        for (let i=90;i>-270;i-=30) {
            point = document.createElement("img");
            point.className = "leaf";
            point.style.top = (center[0]+(-1*(Math.sin(i*(Math.PI/180))*radius))).toString() + "px";
            point.style.left = (center[1]+Math.cos(i*(Math.PI/180))*radius).toString() + "px";
            point.src = "img/Vector.png";
            point.style.transform = "rotate("+(-1*i).toString()+"deg)"
            document.getElementById("circulo").appendChild(point);
        };

        drops = document.getElementsByClassName("leaf");
        
    }
    else {
        drops = document.getElementsByClassName("leaf");
        for (let i=0; i<drops.length; i++) {
            drops[i].className = "leaf";
            drops[i].style.opacity = 0;
        }
    }
 
};

function positionCounter() {
    document.getElementsByClassName("counter")[0].style.top = document.getElementById("centerPoint").offsetTop-(document.getElementsByClassName("counter")[0].offsetHeight/2);
};

// Funcion para contar el tiempo
function countTime() {
    timer = setInterval(function() {
        // Update time
        if (pantalla == 0 || pantalla == 2) {
            if (time[0] == 0 && time[1] == 0) {
                if (pantalla == 2) {
                    document.getElementById("audio").play();
                    clearInterval(timer);
                    start();
                }
                else {
                    document.getElementsByTagName("html")[0].style.background = "linear-gradient(to bottom right, #051c92 0%, #000628 66%)";
                    pantalla = 1;
                    
                    cont = document.getElementById("buttonCont");
                    cont.innerHTML = '';
                    
                    finishb = document.createElement("img");
                    finishb.src = "img/FinishButton.png";
                    finishb.className = "button";
                    finishb.id = "finishButton";
                    finishb.onclick = finish;
                    
                    cont.appendChild(finishb)

                    document.getElementById("audio").play();
                    drops = document.getElementsByClassName("leaf");
                    for (let i=0; i<drops.length; i++) {
                        drops[i].className = "leaf animatedDrops";
                    }
                }
            }
            else if (time[1] == 0) {
                time[1] = 59;
                time[0] = time[0]-1;
            }
            else {
                time[1] = time[1]-1;
            }
            if (time[0]*60+time[1] <= actual && pantalla == 0) {
                actual -= rango;
                drops[index].style.opacity = 1;
                index++;
            }
            if (time[0]*60+time[1] <= actual && pantalla == 2) {
                actual -= rango;
                drops[index].style.opacity = 0;
                index--;
            }
        }
        else if (pantalla == 1) {
            // Update time
            if (time[1] == 59) {
                time[1] = 0;
                time[0] = time[0]+1;
            }
            else {
                time[1] = time[1]+1;
            }
        }
        
        // Update output
        if (time[1].toString().length == 1) {
            textTime = time[0].toString()+":0"+time[1].toString();
        }
        else {
            textTime = time[0].toString()+":"+time[1].toString();
        }

        document.getElementsByClassName("counter")[0].innerHTML = textTime;

    }, 1000);  
}

// Funciones del boton de play
function play() {
    countTime();
    if (document.getElementsByClassName("button").length == 1) {
        let cont = document.getElementById("buttonCont");
        
        cont.removeChild(document.getElementById("playButton"));

        let stopb = document.createElement("img");
        stopb.src = "img/StopButton.png";
        stopb.className = "button";
        stopb.style.right = "0px";
        stopb.id = "stopButton";
        stopb.onclick = stop;
        
        cont.appendChild(stopb);
    }
    else {
        let cont = document.getElementById("buttonCont");
        
        cont.removeChild(document.getElementById("playButton"));
        
        cont.style.width = "80px";
    }
}

// Funciones del boton stop
function stop() {
    if (document.getElementsByClassName("button").length == 1) {
        clearInterval(timer);
        
        let cont = document.getElementById("buttonCont");
        cont.style.width = "200px";
        
        let playb = document.createElement("img");
        playb.src = "img/PlayButton.png";
        playb.className = "button";
        playb.style.left = "0px";
        playb.id = "playButton";
        playb.onclick = play;

        cont.append(playb);
    }
    else {
        start();
    }
}

function finish() {
    t = Math.trunc((time[0]*60 + time[1])/5);
    time = [5+(Math.trunc(t/60)), t%60];

    pantalla = 2;

    document.getElementsByTagName("html")[0].style.background = "linear-gradient(to bottom right, #4770ff 0%, #d273ff 100%)";

    let cont = document.getElementById("buttonCont");
    cont.innerHTML = '';
    
    let stopb = document.createElement("img");
    stopb.src = "img/StopButton.png";
    stopb.className = "button";
    stopb.style.right = "0px";
    stopb.id = "stopButton";
    stopb.onclick = stop;

    cont.appendChild(stopb);

    drops = document.getElementsByClassName("leaf");
    for (let i=0;i<drops.length;i++) {
        drops[i].className = "leaf";
    }

    rango = Math.trunc((time[0]*60+time[1])/12);
    actual = (time[0]*60+time[1]);
    index--;
}