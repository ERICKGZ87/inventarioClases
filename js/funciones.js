import {items,editando} from "./clases/Producto.js"
import {ui,iditemEditar,Productos} from "./clases/UI.js"
import {form,tabla,articuloInput} from "../js/selectores.js"


export const buscar= document.querySelector("#buscar")

export let BaseDatoArticulos;

export const ArticuloObj={
    id:"",
    articulo:"",
    stockMinimo:"",
    Saldo: "",
    unidadMedida:"",
    Bodega: "",
    categoria:""

}

export function CargarBuscador(){
 
    const buscador=document.querySelector("#buscar");

const transaction=BaseDatoArticulos.transaction(["Articulos"],"readonly");
const ObjectStore=transaction.objectStore("Articulos")

const Productos=ObjectStore.openCursor()

Productos.onsuccess= function (e) {
const cursor=e.target.result;

if(cursor){

  const {id,articulo}=cursor.value;

const select=document.createElement("option")
select.setAttribute("value",id);
select.setAttribute("data-id",articulo);
select.textContent=articulo;

buscador.appendChild(select)

cursor.continue()

}
}


}

export function FiltrarArticulos(e){
e.preventDefault()
  let textoBusqueda=buscar.options[buscar.selectedIndex].text 
  
  let Productos2=Productos.filter(producto=> producto.articulo===textoBusqueda)
  console.log("🚀 ~ file: funciones.js ~ line 58 ~ FiltrarArticulos ~ Productos2", Productos2)

  Productos2.forEach((item)=>{

    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria,id}=item
  
        tabla.innerHTML=""
        const row=document.createElement("tr")

    if(Saldo<=stockMinimo){
  row.innerHTML=`<td>${articulo}</td>
         <td>${stockMinimo}</td>
        <td class="msjError"><strong>${Saldo}</strong><img src="/js/img/alert_21476.png" alt="" class="imgError"></td>
        <td>${unidadMedida}</td>
        <td>${Bodega}</td>
        <td>${categoria}</td>
        `

    }else{
        row.innerHTML=`<td>${articulo}</td>
        <td>${stockMinimo}</td>
       <td class="msjBien"><strong>${Saldo}</strong><img src="/js/img/solicit_accept_check_ok_theaction_6340.png" alt=""class="imgSucces"></td>
       <td>${unidadMedida}</td>
       <td>${Bodega}</td>
       <td>${categoria}</td>
       `

    }
        const BtnEditar=document.createElement("button")
        BtnEditar.classList.add("btn","mr-2","link-warning")
        BtnEditar.setAttribute("id",id)
        BtnEditar.innerHTML='Editar'
        row.appendChild(BtnEditar)
    
        BtnEditar.onclick=(e) =>{
          let iditemEditar2;
        iditemEditar2=parseInt(e.target.getAttribute("id"))
        console.log("🚀 ~ file: UI.js ~ line 59 ~ UI ~ ObjectStore.openCursor ~ iditemEditar", iditemEditar2)
        
        
        items.CargarModoEdicion(iditemEditar2,Productos2)
        
        }
        
        const Btn=document.createElement("button")
        Btn.classList.add("btn","mr-2","link-danger")
        Btn.setAttribute("id",id)
        Btn.innerHTML='Eliminar <i class="bi bi-file-earmark-x-fill"></i>'
        
        row.appendChild(Btn)
        
          
       Btn.onclick=(e) =>{
          
        let iditemEliminar=parseInt(e.target.getAttribute("id"))
        console.log("🚀 ~ file: UI.js ~ line 49 ~ UI ~ obj.forEach ~ iditemEliminar", iditemEliminar)
        items.EliminarArticulos(iditemEliminar)
        
        }
        
      tabla.appendChild(row)
      

   


  })

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

ObjectStore.createIndex("articulo","articulo",{unique:true})
ObjectStore.createIndex("stockMinimo","stockMinimo",{unique:false})
ObjectStore.createIndex("Saldo","Saldo",{unique:false})
ObjectStore.createIndex("unidadMedida","unidadMedida",{unique:false})
ObjectStore.createIndex("Bodega","Bodega",{unique:false})
ObjectStore.createIndex("categoria","categoria",{unique:false})
ObjectStore.createIndex("id","id",{unique:true})

const ObjectStoreVentas = base.createObjectStore("ventas",{keyPath:"id",autoIncrement:true})

ObjectStoreVentas.createIndex("articulo","articulo",{unique:false})
ObjectStoreVentas.createIndex("fecha","fecha",{unique:false})
ObjectStoreVentas.createIndex("cantidad","cantidad",{unique:false})
ObjectStoreVentas.createIndex("cliente","cliente",{unique:false})
ObjectStoreVentas.createIndex("tipoDocumento","tipoDocumento",{unique:false})
ObjectStoreVentas.createIndex("NumDocumento","NumDocumento",{unique:false})
ObjectStoreVentas.createIndex("observacion","observacion",{unique:false})
ObjectStoreVentas.createIndex("id","id",{unique:true})
ObjectStoreVentas.createIndex("idArticulo","idArticulo",{unique:true})

const ObjectStoreCompras = base.createObjectStore("compras",{keyPath:"id",autoIncrement:true})

ObjectStoreCompras.createIndex("articulo","articulo",{unique:false})
ObjectStoreCompras.createIndex("fecha","fecha",{unique:false})
ObjectStoreCompras.createIndex("cantidad","cantidad",{unique:false})
ObjectStoreCompras.createIndex("proveedor","proveedor",{unique:false})
ObjectStoreCompras.createIndex("tipoDocumento","tipoDocumento",{unique:false})
ObjectStoreCompras.createIndex("NumDocumento","NumDocumento",{unique:false})
ObjectStoreCompras.createIndex("observacion","observacion",{unique:false})
ObjectStoreCompras.createIndex("id","id",{unique:true})
ObjectStoreCompras.createIndex("idArticulo","idArticulo",{unique:true})
}

console.log("Se crearon las columnnas");



}

export function InsertarEnBasedeDatos(){

    let transaction=BaseDatoArticulos.transaction(["Articulos"],"readwrite");
    const objectStore=transaction.objectStore("Articulos")

    objectStore.add(ArticuloObj)

    transaction.oncomplete=(even)=>{
        swal({
            title: "Operacion exitosa!",
            text: "Se ha agregado el Nuevo Articulo!",
            icon: "success",
          });
    }
    transaction.onerror = (e)=>{
  
        swal({
            title: "Alerta!",
            text: `Ya existe el articulo`,
            icon: "warning",
          });
      }





}

export function InfoArticulo(e){
    ArticuloObj[e.target.name]=e.target.value;

    const saldoInput= document.querySelector("#Saldo").value;
    const stockMinimoInput= document.querySelector("#stockminimo").value;

   ArticuloObj.Saldo=Number(saldoInput)
   ArticuloObj.stockMinimo=Number(stockMinimoInput)

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

    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria}=ArticuloObj

if(articulo==="" || stockMinimo==="" || Saldo==="" || unidadMedida==="" || Bodega==="" || categoria==="" ){

    swal("Todos los campos son obligatorios!", {
        icon: "warning",
      })

}else if(isNaN(Saldo) || Saldo<=0 ||isNaN(stockMinimo) || stockMinimo<=0 ){
    swal("No puedes agregar letras en los campos Stock-minimo y Stock actual,y los valores deben ser mayor a 0", {
        icon: "warning",
      })

}
else{
    let transaction =BaseDatoArticulos.transaction(["Articulos"],"readwrite")
    const objectStore=transaction.objectStore("Articulos")
    objectStore.put(ArticuloObj)
    
    transaction.oncomplete=() => {
       
        swal({
            title: "Operacion exitosa!",
            text: "Has Editado el Articulo!",
            icon: "success",
          });
    }
    transaction.onerror=(e) => {
    
    console.log("hay error",e.target.error)
    }
// edita en indexedDB
items.EditarArticulos()

   //ReiniciarObjet()

}

   
}else{
    ArticuloObj.id=Date.now()

    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria}=ArticuloObj
    
        if(articulo==="" || stockMinimo==="" || Saldo==="" || unidadMedida==="" || Bodega==="" || categoria==="" ){
          
            ui.MostrarAlertas("todos los campos son Obligatorios","error")
            form.forEach((d)=>{
                if(d.value===""){
                   d.classList.add("Error")

                }

            })
         
        }else if(isNaN(Saldo) || Saldo<=0 ||isNaN(stockMinimo) || stockMinimo<=0 ){

            swal("No puedes agregar letras en los campos Stock-minimo y Stock actual,y los valores deben ser mayor a 0", {
                icon: "warning",
              })
        }
        else{
            items.AgregarArticulos({...ArticuloObj})
            //items.AgregarArticulos(ArticuloObj)
       
            console.log(items)
            form.forEach((d)=>{
                if(d.value===""){
                   d.classList.remove("Error")

                }

            })
            ReiniciarObjet()

        }

}

   

}
export function ReiniciarObjet(){
    ArticuloObj.articulo=""
    ArticuloObj.stockMinimo=""
    ArticuloObj.Saldo=""
    ArticuloObj.unidadMedida=""
    ArticuloObj.Bodega=""
    ArticuloObj.categoria=""
  
  }

  export function upperCase(e) {
    var x=document.getElementById(e.target.name).value
    document.getElementById(e.target.name).value=x.toUpperCase()
 }

 

  