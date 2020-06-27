let delta = -3;
let isPortableDevice = true;
let xCoord = [];
let Intens = [];
let index = 0;

let flag = false;

let lambda_param;
let lambda_mass = [];

let lambda, n, I0, aWidth, bWidth, d, l, count, multiplyer, Imax;

let ctx = Grad.getContext("2d");

function Idifr(sinfi) {
    let u = Math.PI*(aWidth)*(sinfi)/lambda;
    return I0*Math.pow(sin(u)/u, 2);
}

function Iinter(sinfi) {
    let delta = Math.PI*(d)*(sinfi)/lambda;
    return Math.pow(sin(n*delta)/sin(delta), 2);
}

function Ifi(sinfi) {
    return Idifr(sinfi)*Iinter(sinfi);
}

function sinfi(x) {
    return x/Math.sqrt((Math.pow(x, 2) + Math.pow(l, 2)))
}

function update(){
    lambda = Number(lambda_param)*Math.pow(10, -9),
    n = Number(N.value),
    I0 = Number(I.value),
    aWidth = Number(A.value)*Math.pow(10, -6),
    bWidth = Number(B.value)*Math.pow(10, -6),
    d = Number(aWidth)+Number(bWidth),
    l = Number(L.value)/10,
    count = -496, multiplyer = -count;

    if (delta < 0) {
        for (let x = -displayWidth/2; x <= displayWidth/2; x+=displayWidth/991) {
            if (Idifr(sinfi(x))  > delta) delta =  Idifr(sinfi(x));
        }
    }
    I0 = I0/delta;

    Imax = Ifi(1.1054525350662203e-14);
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0,0,1000,500);
    base_image = new Image();
    base_image.src = 'sources/4.png';
    base_image.style = 'opacity: 0.3;'
    ctx.lineWidth = 1;

    if(!flag){
        for(index = 0; index < lambda_mass.length; index++){
            lambda_param = lambda_mass[index];
            update();
            for (let x = -displayWidth/2; x <= displayWidth/2; x+=displayWidth/(2*991)) {
                ctx.strokeStyle = ''+wavelengthToColor(lambda_param, Ifi(sinfi(x))/Imax);
                ctx.beginPath();
                ctx.moveTo(count+multiplyer, 0);
                ctx.lineTo((count+=0.5)+multiplyer, 500);
                ctx.stroke();
            }
        }
   }else{
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0,0,1000,500);
    }
    

    ctx.globalAlpha = 0.1
    ctx.drawImage(base_image, 330, 100);
    ctx.globalAlpha = 1
}

var sel = document.getElementById("gas");

function set_parametr(){
    if(sel.value === "Выберите газ в лампе"){
        flag = true
        draw();
    }else if(sel.value === "Гелий"){
        lambda_mass = [447,501,587,667,700];
        flag = false;
        draw();
    }else if(sel.value === "Криптон"){
        lambda_mass = [427,431,437,446,557,587];
        flag = false;
        draw();
    }else if(sel.value === "Неон"){
        lambda_mass = [453,470,478,495,534,588,638,692,700];
        flag = false;
        draw();
    }else if(sel.value === "Пары ртути"){
        lambda_mass = [404,491,538,579];
        flag = false;
        draw();
    }
}



N.onmousemove = function() {
    isPortableDevice = false;
    if(N.value==='50'){
        console.log('ANANAS')
        document.getElementById("labelN").innerHTML = '<a href="http://kot.spb.ru/">Количество щелей: ' + N.value +'</a>';
    }else{
        document.getElementById("labelN").innerText = "Количество щелей: " + N.value;
    }
/*
    if(N.value==='1'){
        flag = true;
    }else{
        flag = false;
    }*/
    draw();
};

Lambda.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelLambda").innerText = "длина волны: " + Lambda.value + "нм";
    delta = -3;
    draw();
};

A.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelA").innerText = "Ширина щели: " + A.value + "мкм";
    delta = -3;
    draw();
};

B.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelB").innerText = "Расстояние между краями соседних щелей: " + B.value + "мкм";
    delta = -3;
    draw();
};

I.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelI").innerText = "Интенсивность в центре: " + I.value;
    delta = -3;
    draw();
};

L.onmousemove = function () {
    isPortableDevice = false;
    document.getElementById("labelL").innerText = `Расстояние от решетки до экрана: ${L.value/10}м`;
    draw();
};

gas.onchange = function(){
    if (!isPortableDevice) return;
    draw();
}


N.onchange = function() {
    if (!isPortableDevice) return;
    document.getElementById("labelN").innerText = "Количество щелей: " + N.value;
    draw();
};

Lambda.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelLambda").innerText = "длина волны: " + Lambda.value + "нм";
    delta = -3;
    draw();
};

A.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelA").innerText = "Ширина щели: " + A.value + "мкм";
    delta = -3;
    draw();
};

B.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelB").innerText = "Расстояние между краями соседних щелей: " + B.value + "мкм";
    delta = -3;
    draw();
};

I.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelI").innerText = "Интенсивность в центре: " + I.value;
    delta = -3;
    draw();
};

L.onchange = function () {
    if (!isPortableDevice) return;
    document.getElementById("labelL").innerText = `Расстояние от решетки до экрана: ${L.value/10}м`;
    draw();
};

window.onload = function () {
    draw();
};