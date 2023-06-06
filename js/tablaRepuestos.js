import { CreateHTML } from "./clases/createHTML.js";
import { ConServer } from "./clases/conectionServer.js";

window.onload = function(){
    btnEnvRepuesto.disabled = true;

    let promesa = connServer1.getDataGet(urlServer);
    promesa.then(function(value){
        let user = JSON.parse(value);
        if(user[0] == undefined){
            window.location.href = "https://inegcep.com";
          }else{
            setUser.innerHTML = "Bienvenido " + user[0];
          }
    });

    let promesa2 = connServer1.getDataGet(urlServer2);
    promesa2.then(function(value){
        let lineas = JSON.parse(value);
        if(lineas[0] == undefined){
            window.location.href = "https://inegcep.com";
          }else{
            titleRepuestos.innerHTML = "Repuestos de la línea  " + lineas[0] + " " + lineas[1];
          }
    });
}

let tableTbodyRepuestos = document.getElementById('table-tbody-repuestos');
let btnsetRepuesto = document.getElementById('btn-agre-repuesto');
let btnEnvRepuesto = document.getElementById('btn-send-repuesto');
let codigoSap = document.getElementById('codigo-sap');
let numParte = document.getElementById('num-parte');
let descripcion = document.getElementById('descrip');
let cantidad = document.getElementById('cantidad');
let unidad = document.getElementById('unidad');
let cont = 1;
let texto = ``;
let btnBorrar = [];
let btnEditar = [];
let btnModalAplicar = [];
let idRow = [];
let idModal = [];
let dataRe = {};
let tSap = [];
let tParte = [];
let tDescrip = [];
let tCantidad = [];
let tUnidad = [];
let tSapModal = [];
let tParteModal = [];
let tDescripModal = [];
let tCantidadModal = [];
let tUnidadModal = [];
let idFormModal = {};
let tSapVal = [];
let tParteVal = [];
let tDescripVal = [];
let tCantidadVal = [];
let tUnidadVal = [];
let valores = {};

let urlServer = "https://localhost/tesalia/Backend-Repuestos/login/get_sessionJS.php";
let urlServer2 = "https://localhost/tesalia/Backend-Repuestos/paginas/repuestos/data_repuestos.php";
let urlDataLink = "https://localhost/tesalia/Backend-Repuestos/paginas/repuestod_DDBB.php";
let setUser = document.getElementById('set-user-2');
let titleRepuestos = document.getElementById('title-repuestos');

const connServer1 = new ConServer();


btnsetRepuesto.addEventListener('click', function(){

    const crearHTML = new CreateHTML();

   if(!(codigoSap.value == "" || numParte.value == "" || descripcion.value == "" || cantidad.value == "" || unidad.value =="")){
        let data = crearHTML.setFilaTableRepuesto(cont, codigoSap.value, numParte.value, descripcion.value, cantidad.value, unidad.value)
        texto = data[0] + texto;
        
        tableTbodyRepuestos.innerHTML = texto;

        btnBorrar.push(data[2]);
        btnEditar.push(data[1]);
        idRow.push(data[3]);
        idModal.push(data[4]);
        tSap.push(data[5]);
        tParte.push(data[6]);
        tDescrip.push(data[7]);
        tCantidad.push(data[8]);
        tUnidad.push(data[9]);
        btnModalAplicar.push(data[10]);



        tSapModal.push(`modal-${cont}-sap`);
        tParteModal.push(`modal-${cont}-parte`);
        tDescripModal.push(`modal-${cont}-desc`);
        tCantidadModal.push(`modal-${cont}-cant`);
        tUnidadModal.push(`modal-${cont}-unidad`);

        idFormModal = {
            codSap: tSapModal, 
            numParte: tParteModal,
            descripcion: tDescripModal, 
            cantidad: tCantidadModal,
            unidad: tUnidadModal 
        };

        dataRe = {
            codSap: tSap, 
            numParte: tParte,
            descripcion: tDescrip, 
            cantidad: tCantidad,
            unidad: tUnidad
        }



        for(let x of btnBorrar){
            eventBorrar(x, idRow);
        }

        for(let x of btnEditar){
            eventEditar(x, idModal, dataRe, cont);
        }

        if(cont == 1){
            btnEnvRepuesto.disabled = false;
        }

        for(let x of btnModalAplicar){
            eventModalAplicar(x, idFormModal, dataRe);
        }

        cont++;

    }else{
        alert("Llene todos los campos che!!!");
    }

    codigoSap.value = "";
    numParte.value = "";
    descripcion.value = "";
    cantidad.value = "";
    unidad.value ="";

});


btnEnvRepuesto.addEventListener('click', function(){


    for(let i=0; i<=dataRe['codSap'].length-1; i++){
        tSapVal.push(document.getElementById(dataRe['codSap'][i]).innerHTML);
        tParteVal.push(document.getElementById(dataRe['numParte'][i]).innerHTML);
        tDescripVal.push(document.getElementById(dataRe['descripcion'][i]).innerHTML);
        tCantidadVal.push(document.getElementById(dataRe['cantidad'][i]).innerHTML);
        tUnidadVal.push(document.getElementById(dataRe['unidad'][i]).innerHTML);
    }

    valores = {
        codSap: tSapVal, 
        numParte: tParteVal,
        descripcion: tDescripVal, 
        cantidad: tCantidadVal,
        unidad: tUnidadVal
    }


    let data = JSON.stringify(valores);
    let result = connServer1.sendData(urlDataLink, data);
    result.then(function(value){
        console.log(value);
    });

    tSapVal = [];
    tParteVal = [];
    tDescripVal = [];
    tCantidadVal = [];
    tUnidadVal = [];

});

function eventModalAplicar(x, id, idF){
    document.getElementById(x).addEventListener('click', function(){
        
        let l = x.length;
        let index;
        let ides = [];
        let idesF = [];
        let row;

        let comun = x.slice(l-2, l+1);
        if(comun.slice(0,1) == "-"){
            index= x.slice(l-1, l+1)-1;
            row = id[index];

            ides.push(document.getElementById(id.codSap[index]).value);
            ides.push(document.getElementById(id.numParte[index]).value);
            ides.push(document.getElementById(id.descripcion[index]).value);
            ides.push(document.getElementById(id.cantidad[index]).value);
            ides.push(document.getElementById(id.unidad[index]).value);
     
            // console.table(ides);

            idesF.push(document.getElementById(idF.codSap[index]));
            idesF.push(document.getElementById(idF.numParte[index]));
            idesF.push(document.getElementById(idF.descripcion[index]));
            idesF.push(document.getElementById(idF.cantidad[index]));
            idesF.push(document.getElementById(idF.unidad[index]));
            let c = 0;
            for(let x of idesF){
                x.innerHTML = ides[c];
                c++;
            }
            c = 0;

            btnsetRepuesto.disabled = true;

        }else{
            index= x.slice(l-2, l+1)-1;
            row = id[index];
            ides.push(document.getElementById(id.codSap[index]).value);
            ides.push(document.getElementById(id.numParte[index]).value);
            ides.push(document.getElementById(id.descripcion[index]).value);
            ides.push(document.getElementById(id.cantidad[index]).value);
            ides.push(document.getElementById(id.unidad[index]).value);

            // console.table(ides);

            idesF.push(document.getElementById(idF.codSap[index]));
            idesF.push(document.getElementById(idF.numParte[index]));
            idesF.push(document.getElementById(idF.descripcion[index]));
            idesF.push(document.getElementById(idF.cantidad[index]));
            idesF.push(document.getElementById(idF.unidad[index]));
            let c = 0;
            for(let x of idesF){
                x.innerHTML = ides[c]
                c++;
            }
            c = 0;
            btnsetRepuesto.disabled = true;
        }


    });
}

function eventBorrar(x, id){
    document.getElementById(x).addEventListener('click',function(){
        let l = x.length;
        let index;

        let comun = x.slice(l-2, l+1);
        if(comun.slice(0,1) == "-"){
            let row;
            index= x.slice(l-1, l+1);
            row = id[index-1];
            document.getElementById(row).remove();
            btnsetRepuesto.disabled = true;

        }else{
            let row;
            index= x.slice(l-2, l+1);
            row = id[index-1];
            document.getElementById(row).remove();
            btnsetRepuesto.disabled = true;

        }

    });
}

function eventEditar(x, id, data, item){
    // document.getElementById(x).addEventListener('click',function(){
    let l = x.length;
    let index;
    let ides = [];

    let comun = x.slice(l-2, l+1);
    if(comun.slice(0,1) == "-"){
        index= x.slice(l-1, l+1)-1;
        let row = id[index];

        ides.push(document.getElementById(data.codSap[index]).innerHTML);
        ides.push(document.getElementById(data.numParte[index]).innerHTML);
        ides.push(document.getElementById(data.descripcion[index]).innerHTML);
        ides.push(document.getElementById(data.cantidad[index]).innerHTML);
        ides.push(document.getElementById(data.unidad[index]).innerHTML);
        let texto = `
            <form>
                <div class="mb-3">
                    <label class="form-label">Código SAP</label>
                    <input class="form-control" id="modal-${index + 1}-sap" type="number" value="${ides[0]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">N° Parte</label>
                    <input class="form-control" id="modal-${index + 1}-parte" type="text" value="${ides[1]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <input class="form-control" id="modal-${index + 1}-desc" type="text" value="${ides[2]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Cantidad</label>
                    <input class="form-control" id="modal-${index + 1}-cant" type="number" step="0.05" value="${ides[3]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Unidad</label>
                    <input class="form-control" id="modal-${index + 1}-unidad" type="text" value="${ides[4]}">
                </div>
            </form>
        `;  

        // console.table(ides[0]);
        document.getElementById(row).innerHTML= texto;

    }else{
        index= x.slice(l-2, l+1)-1;
        let row = id[index];

        ides.push(document.getElementById(data.codSap[index]).innerHTML);
        ides.push(document.getElementById(data.numParte[index]).innerHTML);
        ides.push(document.getElementById(data.descripcion[index]).innerHTML);
        ides.push(document.getElementById(data.cantidad[index]).innerHTML);
        ides.push(document.getElementById(data.unidad[index]).innerHTML);

        let texto = `
            <form>
                <div class="mb-3">
                    <label class="form-label">Código SAP</label>
                    <input class="form-control" id="modal-${index + 1}-sap" type="number" value="${ides[0]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">N° Parte</label>
                    <input class="form-control" id="modal-${index + 1}-parte" type="text" value="${ides[1]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <input class="form-control" id="modal-${index + 1}-desc" type="text" value="${ides[2]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Cantidad</label>
                    <input class="form-control" id="modal-${index + 1}-cant" type="number" step="0.05" value="${ides[3]}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Unidad</label>
                    <input class="form-control" id="modal-${index + 1}-unidad" type="text" value="${ides[4]}">
                </div>
            </form>
        `;  

        // console.log(texto);
        document.getElementById(row).innerHTML= texto;

    }
    // document.getElementById(x).addEventListener('click',function(){

    // });
}
