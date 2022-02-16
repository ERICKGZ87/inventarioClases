import {formulario,form,unidadMedidaInput} from "./selectores.js"
import {InfoArticulo,ArticuloObj,NuevoArticulo} from "./funciones.js"



Listener()
function Listener(){

   formulario.addEventListener("submit",NuevoArticulo)
    form.forEach((input)=>{
input.addEventListener("blur",InfoArticulo)

    })
    unidadMedidaInput.addEventListener("blur",InfoArticulo)


}
console.log(ArticuloObj)