import {formulario,form,unidadMedidaInput} from "./selectores.js"
import {InfoArticulo,ArticuloObj,NuevoArticulo,CrearBaseDeDatos} from "./funciones.js"



Listener()
function Listener(){
    

document.addEventListener("DOMContentLoaded",CrearBaseDeDatos)

   formulario.addEventListener("submit",NuevoArticulo)
    form.forEach((input)=>{
input.addEventListener("blur",InfoArticulo)

    })
    unidadMedidaInput.addEventListener("blur",InfoArticulo)


}
console.log(ArticuloObj)