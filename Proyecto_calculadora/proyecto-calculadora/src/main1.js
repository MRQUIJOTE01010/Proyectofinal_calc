function calcular(){

let V=document.getElementById("voltaje").value;
let I=document.getElementById("corriente").value;
let R=document.getElementById("resistencia").value;

V=parseFloat(V);
I=parseFloat(I);
R=parseFloat(R);

let llenos=0;

if(!isNaN(V)) llenos++;
if(!isNaN(I)) llenos++;
if(!isNaN(R)) llenos++;

if(llenos!=2){

document.getElementById("resultado").innerHTML=
"Debe llenar solamente dos valores.";

return;

}

if(isNaN(V)){

V=I*R;

document.getElementById("resultado").innerHTML=
"Voltaje = "+V.toFixed(2)+" V";

}

else if(isNaN(I)){

I=V/R;

document.getElementById("resultado").innerHTML=
"Corriente = "+I.toFixed(2)+" A";

}

else{

R=V/I;

document.getElementById("resultado").innerHTML=
"Resistencia = "+R.toFixed(2)+" Ω";

}

}