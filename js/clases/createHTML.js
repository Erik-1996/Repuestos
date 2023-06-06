

export class CreateHTML{
    constructor(){

    }

    setOption(value,name){
        let text = ``;
        text = `<option value="${value}">${name}</option>`;
        return text;
    }

    setFilaTableRepuesto(item, val1, val2, val3, val4, val5){
        let text = ``;
        let id1 = `btn-e-table-${item}`;
        let id2 = `btn-b-table-${item}`;
        let id3 = `fila-table-${item}`;
        let idModal = `modal-${item}`;
        let idCodSap = `sap-${item}`;
        let idNparte = `num-parte-${item}`;
        let idDescrip = `descripcion-${item}`;
        let idCantidad = `cantidad-${item}`;
        let idUnidad = `unidad-${item}`;
        let idBtnModal = `btn-modal-${item}`;
        
        text = `
            <tr id="${id3}">
                <th scope="row">${item}</th>
                <td id="${idCodSap}">${val1}</td>
                <td id="${idNparte}">${val2}</td>
                <td id="${idDescrip}">${val3}</td>
                <td id="${idCantidad}">${val4}</td>
                <td id="${idUnidad}">${val5}</td>

                <td>
                    <button type="button" id="${id1}" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop${item}">
                        Editar
                    </button>

                    <div class="modal fade" id="staticBackdrop${item}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Repuesto</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="${idModal}">

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="${idBtnModal}">Aplicar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </td>

                <td><button class="btn btn-danger" id="${id2}">Borrar</button></td>
            </tr>
        `;
        return [text, id1, id2, id3, idModal, idCodSap,idNparte, idDescrip, idCantidad, idUnidad, idBtnModal, val1, val2, val3, val4, val5];
    }
}

