import{ui}from "./UI.js"
import {articuloInput,stockMinimoInput,saldoInput,unidadMedidaInput,BodegaInput,categoriaInput,formulario} from "../selectores.js"
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
   
if(articulos){

    articulos.forEach((item)=>{
        const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria,id}=item

        if(id===idEditar){
            articuloInput.value = articulo
            stockMinimoInput.value = stockMinimo
            saldoInput.value = Saldo
            unidadMedidaInput.value = unidadMedida
            BodegaInput.value = Bodega
            categoriaInput.value = categoria
        
            ArticuloObj.id=id
            ArticuloObj.articulo=articulo
            ArticuloObj.stockMinimo=stockMinimo
            ArticuloObj.Saldo=Number(Saldo)
            ArticuloObj.unidadMedida=unidadMedida
            ArticuloObj.Bodega=Bodega
            ArticuloObj.categoria=categoria
            console.log("se llena objeto", ArticuloObj)
            swal({
                title: "Has Ingresado al Modo edicion!",
                icon: "success",
              });
        editando=true
        const BotonAgregar = document.querySelector("#boton");
        BotonAgregar.textContent="Guardar cambios"
        }

    })

    

    
    
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
//const confirmation =swal("Alerta","Desea eliminar este item?","warning",{button:"Aceptar"});

swal("Alerta","Desea eliminar este item?","warning",{buttons:["Cancelar","Aceptar"],dangerMode: true})
.then((value) => {
    if(value){
        console.log("🚀 ~ file: Producto.js ~ line 81 ~ Producto ~ .then ~ value", value)
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
            
            swal("Se ha Eliminado el registro correctamente!", {
                icon: "success",
              })
       }  

});    
    }
    
   
}

export const items=new Producto()