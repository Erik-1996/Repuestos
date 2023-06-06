import { CreateHTML } from "./clases/createHTML.js";
import { ConServer } from "./clases/conectionServer.js";

window.onload = function(){
    let acum = ``;
    const create = new CreateHTML;
    let elemSipa16 = ['Sopladora', 'LLenadora', 'Etiquetadora', 'Kroness', 'Transportes', 'Termofijadora', 'Paletiador', 'Envolvedor'];
    for (let x of elemSipa16){
        let value = x.toLocaleLowerCase();
        let name = x;
        acum =  acum + create.setOption(value, name);
    }

    elemlinea.innerHTML = acum;
    btnEmpezar.disabled = false;

    let promesa = connServer1.getDataGet(urlServer);
    promesa.then(function(value){
        let user = JSON.parse(value);
        if(user[0] == undefined){
            window.location.href = "https://inegcep.com";
          }else{
            setUser.innerHTML = "Bienvenido " + user[0];
          }
    });
}

let linea = document.getElementById('linea');
let elemlinea = document.getElementById('elem-linea');
let btnEmpezar = document.getElementById('btn-empezar');
let setUser = document.getElementById('set-user');
let urlServer = "http://erik-backend.000.pe/login/get_sessionJS.php";

const connServer1 = new ConServer();


linea.addEventListener('change', function(){

    const create = new CreateHTML;

    let acum = ``;
    console.log(linea.value == "sipa-20");

    if(linea.value == "sipa-20"){
        let elemSipa20 = ['Sopladora', 'LLenadora', 'Etiquetadora', 'Transportes', 'Termofijadora', 'Paletiador', 'Envolvedor'];
        for (let x of elemSipa20){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
        btnEmpezar.disabled = false;
    }else if(linea.value == "sipa-16"){
        let elemSipa16 = ['Sopladora', 'LLenadora', 'Etiquetadora', 'Kroness', 'Transportes', 'Termofijadora', 'Paletiador', 'Envolvedor'];
        for (let x of elemSipa16){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
    }else if(linea.value == "khs"){
        let elemSipa16 = ['Sopladora', 'Transportes Aereos', 'LLenadora', 'Etiquetadora', 'Transportes', 'Termofijadora', 'Paletiador', 'Envolvedor'];
        for (let x of elemSipa16){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
        btnEmpezar.disabled = false;
    }else if(linea.value == "kompass"){
        let elemSipa16 = ['Sopladora', 'Transportes Aereos', 'LLenadora', 'Etiquetadora', 'Transportes', 'Termofijadora'];
        for (let x of elemSipa16){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
        btnEmpezar.disabled = false;
    }else if(linea.value == "carballo"){
        let elemSipa16 = ['Lavadora', 'LLenadora', 'Etiquetadora', 'Transportes', 'Encajonadora', 'Desencajonadora'];
        for (let x of elemSipa16){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
        btnEmpezar.disabled = false;
    }else if(linea.value == "galon"){
        let elemSipa16 = ['Sopladora', 'LLenadora', 'Etiquetadora', 'Termofijadora', 'Envolvedor'];
        for (let x of elemSipa16){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
        btnEmpezar.disabled = false;
    }else if(linea.value == "bidon"){
        let elemSipa16 = ['LLenadora'];
        for (let x of elemSipa16){
            let value = x.toLocaleLowerCase();
            let name = x;
            acum =  acum + create.setOption(value, name);
        }

        elemlinea.innerHTML = acum;
        btnEmpezar.disabled = false;
    }


});
