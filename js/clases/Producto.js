import{ui}from "./UI.js"
import {articuloInput,stockMinimoInput,saldoInput,unidadMedidaInput,BodegaInput,ObservacionInput,formulario} from "../selectores.js"
import {ArticuloObj,ReiniciarObjet} from "../funciones.js"
export let editando;

class Producto{
    constructor(){
        this.articulos=[]
    }

    AgregarArticulos(itemObj){
this.articulos=[...this.articulos,itemObj]

ui.InyectarHtml(this.articulos)
formulario.reset()
    }
 

    CargarModoEdicion(idEditar,{articulos}){
   
articulos.forEach((d)=>{
    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,Observacion,id}=d

if(d.id===idEditar){
    articuloInput.value = articulo
    stockMinimoInput.value = stockMinimo
    saldoInput.value = Saldo
    unidadMedidaInput.value = unidadMedida
    BodegaInput.value = Bodega
    ObservacionInput.value = Observacion

    ArticuloObj.articulo=articulo
    ArticuloObj.stockMinimo=stockMinimo
    ArticuloObj.Saldo=Saldo
    ArticuloObj.unidadMedida=unidadMedida
    ArticuloObj.Bodega=Bodega
    ArticuloObj.Observacion=Observacion
    console.log("🚀 ~ file: Producto.js ~ line 38 ~ Producto ~ articulos.forEach ~ ArticuloObj", ArticuloObj)
ui.MostrarAlertas("Estas en modo Edicion","succes")
}
})
editando=true
const BotonAgregar = document.querySelector("#boton");
BotonAgregar.textContent="Guardar cambios"


    }
    

    EditarArticulos(id,ArticuloModificADO){

        this.articulos=this.articulos.map(Articulos=>Articulos.id===ArticuloModificADO.id ? ArticuloModificADO : Articulos)
        
        ui.InyectarHtml(this.articulos)
        editando=false
        const BotonAgregar = document.querySelector("#boton");
BotonAgregar.textContent="Agregar Articulo"
formulario.reset()
ReiniciarObjet()
    }




    EliminarArticulos(id){

        this.articulos=this.articulos.filter(d=>d.id !== id)
        ui.InyectarHtml(this.articulos)
    }
    
   
}

export const items=new Producto()