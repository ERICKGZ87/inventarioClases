import{ui}from "./UI.js"
import {articuloInput,stockMinimoInput,saldoInput,unidadMedidaInput,BodegaInput,ObservacionInput,formulario} from "../selectores.js"
import {ArticuloObj,ReiniciarObjet,InsertarEnBasedeDatos,BaseDatoArticulos} from "../funciones.js"
export let editando;

class Producto{
    constructor(){
        this.articulos=[]
    }

    AgregarArticulos(itemObj){

//this.articulos=[...this.articulos,itemObj]

InsertarEnBasedeDatos()
ui.InyectarHtml()
formulario.reset()

    }
 

    CargarModoEdicion(idEditar,articulos){
   

    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,Observacion,id}=articulos

if(articulos){

    if(articulos.id===idEditar){
        articuloInput.value = articulo
        stockMinimoInput.value = stockMinimo
        saldoInput.value = Saldo
        unidadMedidaInput.value = unidadMedida
        BodegaInput.value = Bodega
        ObservacionInput.value = Observacion
    
        ArticuloObj.id=id
        ArticuloObj.articulo=articulo
        ArticuloObj.stockMinimo=stockMinimo
        ArticuloObj.Saldo=Saldo
        ArticuloObj.unidadMedida=unidadMedida
        ArticuloObj.Bodega=Bodega
        ArticuloObj.Observacion=Observacion
        console.log("se llena objeto", ArticuloObj)
    ui.MostrarAlertas("Estas en modo Edicion","succes")
    editando=true
    const BotonAgregar = document.querySelector("#boton");
    BotonAgregar.textContent="Guardar cambios"
    }
    
 
    

}
    }
    

    EditarArticulos(){
    
        //this.articulos=this.articulos.map(Articulos=>Articulos.id===ArticuloModificADO.id ? ArticuloModificADO : Articulos)

        ui.InyectarHtml()
        editando=false
        const BotonAgregar = document.querySelector("#boton");
    BotonAgregar.textContent="Agregar Articulo"
    formulario.reset()
    ReiniciarObjet() 
    }




    EliminarArticulos(id){

        //this.articulos=this.articulos.filter(d=>d.id !== id)
let transaction=BaseDatoArticulos.transaction(["Articulos"],"readwrite")
const ObjectStore=transaction.objectStore("Articulos")
ObjectStore.delete(id)

transaction.oncomplete=() =>{

    console.log("se elimino")
    ui.InyectarHtml()
    }
transaction.onerror=() =>{

console.log("no se elimino")
    }
    



        
    }
    
   
}

export const items=new Producto()