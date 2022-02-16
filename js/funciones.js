import {items,editando} from "./clases/Producto.js"
import {ui,iditemEditar} from "./clases/UI.js"
import {form} from "../js/selectores.js"



export const ArticuloObj={
    id:"",
    articulo:"",
    stockMinimo:"",
    Saldo: "",
    unidadMedida:"",
    Bodega: "",
    Observacion:""

}


export function InfoArticulo(e){
    ArticuloObj[e.target.name]=e.target.value
   
    form.forEach((d)=>{
        if(d.value!==""){
           d.classList.remove("Error")

        }

    })
    console.log("desde infoarticulo",ArticuloObj)
}



export function NuevoArticulo(e){
    e.preventDefault()

if(editando){

    items.EditarArticulos(iditemEditar,{...ArticuloObj})

    ReiniciarObjet()
}else{
    ArticuloObj.id=Date.now()

    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,Observacion}=ArticuloObj
    
        if(articulo!=="" && stockMinimo!=="" && Saldo!=="" && unidadMedida!=="" && Bodega!=="" && Observacion!=="" ){
           items.AgregarArticulos({...ArticuloObj})
            //items.AgregarArticulos(ArticuloObj)
       
            console.log(items)
            form.forEach((d)=>{
                if(d.value===""){
                   d.classList.remove("Error")

                }

            })
            ReiniciarObjet()
        }else{
            ui.MostrarAlertas("todos los campos son Obligatorios","error")
            form.forEach((d)=>{
                if(d.value===""){
                   d.classList.add("Error")

                }

            })

        }

}

   

}
export function ReiniciarObjet(){
    ArticuloObj.articulo=""
    ArticuloObj.stockMinimo=""
    ArticuloObj.Saldo=""
    ArticuloObj.unidadMedida=""
    ArticuloObj.Bodega=""
    ArticuloObj.Observacion=""
  
  }

  