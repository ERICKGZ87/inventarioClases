import {items,editando} from "./clases/Producto.js"
import {ui,iditemEditar} from "./clases/UI.js"
import {form} from "../js/selectores.js"

export let BaseDatoArticulos;


export const ArticuloObj={
    id:"",
    articulo:"",
    stockMinimo:"",
    Saldo: "",
    unidadMedida:"",
    Bodega: "",
    Observacion:""

}


export function CrearBaseDeDatos(){

    //crear la base de datos
let BaseDatos= window.indexedDB.open("Articulos",1)

//si hay error
BaseDatos.onerror=()=>{

    console.log("hubo un error")

}

//si todo sale bien
BaseDatos.onsuccess=(succes)=>{
    console.log("exito se ha creado la base de datos")

    BaseDatoArticulos=BaseDatos.result
  
    ui.InyectarHtml()
    
}

BaseDatos.onupgradeneeded=(e)=>{

    const base=e.target.result
    console.log("base", base)
    const ObjectStore=base.createObjectStore("Articulos",{
        keyPath: "id",
        autoIncrement: true
    })

//definir columnnas

ObjectStore.createIndex("articulo","articulo",{unique:false})
ObjectStore.createIndex("stockMinimo","stockMinimo",{unique:false})
ObjectStore.createIndex("Saldo","Saldo",{unique:false})
ObjectStore.createIndex("unidadMedida","unidadMedida",{unique:false})
ObjectStore.createIndex("Bodega","Bodega",{unique:false})
ObjectStore.createIndex("Observacion","Observacion",{unique:false})
ObjectStore.createIndex("id","id",{unique:false})

const ObjectStoreVentas = base.createObjectStore("ventas",{keyPath:"id",autoIncrement:true})

ObjectStoreVentas.createIndex("articulo","articulo",{unique:false})
}


console.log("Se crearon las columnnas");



}

export function InsertarEnBasedeDatos(){

    let transaction=BaseDatoArticulos.transaction(["Articulos"],"readwrite");
   
    transaction.oncomplete=(even)=>{
        console.log("se ha hecho la operacion",even);
ui.MostrarAlertas("Se ha agregado un nuevo item","succes")
    }
    transaction.onerror = (error)=>{
        console.log("error en la transaccion completada",error);
        //ui.MostrarAlertas(`${error}`,"error")
    
      }
const objectStore=transaction.objectStore("Articulos")


const peticion=objectStore.add(ArticuloObj)

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

    let transaction =BaseDatoArticulos.transaction(["Articulos"],"readwrite")
    const objectStore=transaction.objectStore("Articulos")
    objectStore.put(ArticuloObj)
    
    transaction.oncomplete=() => {
       
    console.log("exito")
    }
    transaction.onerror=(e) => {
    
    console.log("hay error",e.target.error)
    }
// edita en indexedDB
items.EditarArticulos()

   //ReiniciarObjet()
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

  