import {conectarDBBase,AgregarCliente,CargarClientes,CargarClientesHTML,EliminarClientes,LlenarBuscador,FiltrarClientes} from "./funcionesClientes.js"
import {BotonAgregar,ListaClientes,botonBuscar,Imputs} from "./selectoresClientes.js"
import {upperCase} from "../js/funciones.js"


document.addEventListener("DOMContentLoaded",conectarDBBase )
document.addEventListener("DOMContentLoaded",()=>{
    $(document).ready(function() {
        $('.js-example-basic-single').select2({
          placeholder: "Selecciona un cliente",
          allowClear: true
        });
      });

setTimeout(()=>{
    CargarClientes()
   
},100)
setTimeout(()=>{
    LlenarBuscador()
    CargarClientesHTML()
},160)

})
BotonAgregar.addEventListener("submit",AgregarCliente)
ListaClientes.addEventListener("click",EliminarClientes)
botonBuscar.addEventListener("click",FiltrarClientes)
Imputs.forEach((inpu)=>{
inpu.addEventListener("blur",upperCase)

})




