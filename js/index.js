import {formulario,form,unidadMedidaInput,categoriaInput} from "./selectores.js"
import {InfoArticulo,upperCase,NuevoArticulo,CrearBaseDeDatos,CargarBuscador,FiltrarArticulos} from "./funciones.js"

const Btnbusqueda=document.querySelector("#btnBuscar");


Listener()
function Listener(){
    setTimeout(()=>{
        CargarBuscador() 
        
      
    },1000)
    document.addEventListener("DOMContentLoaded",CrearBaseDeDatos)
    
    $(document).ready(function() {
        $('.js-example-basic-single').select2({
            placeholder: "Selecciona un articulo",
    allowClear: true
        });
      });

   formulario.addEventListener("submit",NuevoArticulo)
    form.forEach((input)=>{
input.addEventListener("blur",upperCase)
input.addEventListener("blur",InfoArticulo)

    })
    unidadMedidaInput.addEventListener("blur",InfoArticulo)
    categoriaInput.addEventListener("blur",InfoArticulo)
    Btnbusqueda.addEventListener("click",FiltrarArticulos)
}
