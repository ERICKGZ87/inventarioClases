import {conectarDBBase,AgregarProveedor,CargarProveedores,CargarProveedoresHTML,EliminarProveedor,LlenarBuscador,Filtrarproveedor} from "./funcionesProveedores.js"
import {BotonAgregar,ListaProveedores,botonBuscar,Imputs} from "./selectoresProveedores.js"
import {upperCase} from "../js/funciones.js"


document.addEventListener("DOMContentLoaded",conectarDBBase )
document.addEventListener("DOMContentLoaded",()=>{
    $(document).ready(function() {
        $('.js-example-basic-single').select2({
          placeholder: "Selecciona un proveedor",
          allowClear: true
        });
      });

setTimeout(()=>{
    CargarProveedores()
   
},100)
setTimeout(()=>{
    LlenarBuscador()
    CargarProveedoresHTML()
},160)

})
BotonAgregar.addEventListener("submit",AgregarProveedor)
ListaProveedores.addEventListener("click",EliminarProveedor)
botonBuscar.addEventListener("click",Filtrarproveedor)
Imputs.forEach((inpu)=>{
inpu.addEventListener("blur",upperCase)

})




