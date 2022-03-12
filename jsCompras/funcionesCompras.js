import {formulario,listadoCompras} from "./selectoresCompras.js"
import {ArticuloObj} from "../js/funciones.js"

export let DB;
let IdArticulo;
let EdicionCompras;
let IdEditar;
let MontoAnteriorCompra;
let CantidadDevolverStock;


const compras={
articulo:"",
fecha:"",
cantidad:"",
proveedor:"",
tipoDocumento:"",
NumDocumento:"",
Observacion:"",
id:"",
idarticulo:""


}


export function IngresarCompra(e){

  e.preventDefault()

if(EdicionCompras){
 
  const transaction = DB.transaction(["compras"], "readwrite");
  const ObjectStore = transaction.objectStore("compras");

  const ArticuloInput=document.querySelector("#articulo").value
  const FechaInput=document.querySelector("#fecha").value
  const CantidadInput=document.querySelector("#cantidad").value
  const ProveedorInput=document.querySelector("#proveedor").value
  const tipoDocumentoInput=document.querySelector("#tipoDocumento").value
  const NumeroDocumentoInput=document.querySelector("#NumeroDocumento").value
  const observacionInput=document.querySelector("#Observacion").value

  compras.articulo=ArticuloInput
  compras.fecha=FechaInput
  compras.cantidad=Number(CantidadInput)
  compras.proveedor=ProveedorInput
  compras.tipoDocumento=tipoDocumentoInput
  compras.NumDocumento=NumeroDocumentoInput
  compras.Observacion=observacionInput
  compras.id=Number(IdEditar)
  compras.idarticulo=Number(IdArticulo)
  //console.log("🚀 ~ file: funcionesVentas.js ~ line 50 ~ IngresarVenta ~ ventas", ventas)

  ObjectStore.put(compras)

  transaction.onerror=function(){

    console.error("error")
  }
  transaction.oncomplete=function(){

    swal({
      title: "Operacion exitosa!",
      text: "Has Editado un registro !",
      icon: "success",
    });
    
   ActualizarStockCompra("edicion");

    formulario.innerHTML=` <div class="col-md-4">
        
    <label for="validationTooltip04" class="form-label">Articulo</label>
    <select class="js-example-basic-single form-control" name="state" id="articulo" >
      <option value=""></option>
    </select>
    
    
  </div>

  <div class="col-md-3 articulosss">
    <label for="validationTooltip02" class="form-label">Fecha</label>
    <input type="date" europe-countries id="fecha" name="fecha" class="form-control" >
   
  </div>

  <div class="col-md-3">
    <label for="validationTooltip03" class="form-label">Cantidad</label>
    <input type="text" class="form-control" id="cantidad" name="cantidad">
    
   
  </div>
  <div class="col-md-4">
    <label for="validationTooltip05" class="form-label">Proveedor</label>
    <input type="text" class="form-control" id="proveedor" name="proveedor">
    
  </div>
  <div class="col-md-4">
    <label for="validationTooltip04" class="form-label">Tipo Documento</label>
    <select class="form-select unidadMedida" id="tipoDocumento" name="tipoDocumento">
      <option value="Factura">Factura</option>
      <option value="Boleta">Boleta</option>
    </select>

    
  </div>
  <div class="col-md-4">
    <label for="validationTooltip05" class="form-label">N° Documento</label>
    <input type="text" class="form-control Bodega" id="NumeroDocumento" name="NumeroDocumento">
    
  </div>
  <div class="col-md-4">
      <label for="validationTooltip05" class="form-label">Observacion</label>
      <input type="text" class="form-control Observacion" id="Observacion" name="Observacion">
    
    </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit" id="boton">Nueva venta</button>
   
  </div>`

  EdicionCompras=false;
  
  CargarComprasHTML()
  CargarProductos()
 
  
  }

}else{
  const ArticuloInput=document.querySelector("#articulo")
  const FechaInput=document.querySelector("#fecha").value
  const CantidadInput=document.querySelector("#cantidad").value
  const ProveedorInput=document.querySelector("#proveedor").value
  const tipoDocumentoInput=document.querySelector("#tipoDocumento").value
  const NumeroDocumentoInput=document.querySelector("#NumeroDocumento").value
  const observacionInput=document.querySelector("#Observacion").value

  IdArticulo=Number(ArticuloInput.value) // para actualizar stock
 
 

  compras.articulo=ArticuloInput.options[ArticuloInput.selectedIndex].text
  compras.fecha=FechaInput
  compras.cantidad=Number(CantidadInput)
  compras.proveedor=ProveedorInput
  compras.tipoDocumento=tipoDocumentoInput
  compras.NumDocumento=NumeroDocumentoInput
  compras.Observacion=observacionInput
  compras.id=Date.now()
  compras.idarticulo=Number(IdArticulo)

  const{articulo,fecha,cantidad,proveedor,tipoDocumento,NumDocumento,observacion}=compras

if(articulo===""||fecha===""||cantidad===""||proveedor===""||tipoDocumento===""||NumDocumento===""||observacion===""){
  console.log("todos los campos son obligatorios")
  return;
}else if(isNaN(cantidad)||cantidad <0){

  swal({
    title: "Atencion!",
    text: "No puede agregar letras,y numero menores a 0",
    icon: "error",
  });
}

else{

const transaction=DB.transaction(["compras"],"readwrite");
const ObjectStore=transaction.objectStore("compras")

ObjectStore.add(compras)
//console.log("🚀 ~ file: funcionesVentas.js ~ line 57 ~ IngresarVenta ~ ventas", ventas)

transaction.onerror=function(e){
  console.log("ha ocurrido un error",e.target.error)

}
transaction.oncomplete=function(){
  swal({
    title: "Operacion exitosa!",
    text: "Has agregado una compra!",
    icon: "success",
  });
  formulario.reset();
  ActualizarStockCompra("compra")
  CargarComprasHTML()

  
}
console.log(compras)



}

}
}

export function conectarDBBase() {
    const AbrirConexion = window.indexedDB.open("Articulos", 1);

    AbrirConexion.onerror = function () {
      console.log("Error");
    };

    AbrirConexion.onsuccess = function () {
      DB = AbrirConexion.result;
      console.log("Open",DB)
    };

  }
 


export function CargarProductos(){
 
  const SelectProductos=document.querySelector("#articulo")
  //cargar productos en select 
const transaction=DB.transaction(["Articulos"],"readonly");
const ObjectStore=transaction.objectStore("Articulos")

const Productos=ObjectStore.openCursor()

Productos.onsuccess= function (e) {
const cursor=e.target.result;

if(cursor){

  const {id,articulo,Saldo}=cursor.value;

const select=document.createElement("option")
select.setAttribute("value",id);
select.setAttribute("data-id",articulo);

select.textContent=articulo + " " +`Stock: ${Saldo}`;

SelectProductos.appendChild(select)

cursor.continue()
}
$(document).ready(function() {
  $('.js-example-basic-single').select2();
});
}


}

export function CargarComprasHTML(){

while(listadoCompras.firstChild){
    listadoCompras.removeChild(listadoCompras.firstChild)
}

  const transaction=DB.transaction(["compras"],"readonly")
  const ObjectStore=transaction.objectStore("compras")

  ObjectStore.openCursor().onsuccess= function (e){

    const cursor = e.target.result
  if(cursor){
  
    const{articulo,fecha,cantidad,proveedor,tipoDocumento,NumDocumento,Observacion,id,idarticulo}=cursor.value
  //console.log(cursor.value)
  
  
  
  const row=document.createElement("tr")
  row.innerHTML=`<td>${articulo}</td>
  <td>${fecha}</td>
  <td>${cantidad}</td>
  <td>${proveedor}</td>
  <td>${tipoDocumento}</td>
  <td>${NumDocumento}</td>
  <td>${Observacion}</td>
  <a href="#" data-id="${id}" data-idProducto="${idarticulo}" data-Cantidad="${cantidad}" style="font-size: 35px;"class="BTNEditar"><i class="bi bi-pencil-square"></i></a>
  <a href="#" data-id="${id}" data-idProducto="${idarticulo}" data-Cantidad="${cantidad}" style="font-size: 35px;"class="BTNBorrar"><i class="bi bi-file-earmark-x-fill"></i></a>
  `
  listadoCompras.appendChild(row)

  cursor.continue()
  
  }
  
  }

}

function ActualizarStockCompra(tipo){
// actualizar stock
const transactionArticulos=DB.transaction(["Articulos"],"readwrite")
const OBjectStoreArticulos=transactionArticulos.objectStore("Articulos")

OBjectStoreArticulos.openCursor().onsuccess= function (e){

  const cursor = e.target.result
  
  if(cursor){
    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria,id}=cursor.value

switch (tipo){
  case "compra":
    if(id===IdArticulo){

      const {cantidad}=compras
  
      ArticuloObj.articulo=articulo
      ArticuloObj.stockMinimo=stockMinimo
      ArticuloObj.Saldo=Saldo+cantidad
      ArticuloObj.unidadMedida=unidadMedida
      ArticuloObj.Bodega=Bodega
      ArticuloObj.categoria=categoria
      ArticuloObj.id=IdArticulo
      //console.log("🚀 ~ file: funcionesVentas.js ~ line 310 ~ ArticuloObj", ArticuloObj)
        
       OBjectStoreArticulos.put(ArticuloObj)
  
        }
        
        transactionArticulos.onerror= function (){
          console.log("no se ha actualizado el stock")
        }
        transactionArticulos.oncomplete= function (){
          console.log("se ha actualizado el stockkkkkkk")
        }
  break;
  case "edicion":
    if(id===IdArticulo){

      const {cantidad}=compras // capturando el valor cantidad nuevo del input ya cargado en el objeto ventas
 
      // calculos stock restante por edicion de ventas
      let montoNuevo=cantidad
let MontoNuevo=-MontoAnteriorCompra+montoNuevo
      

      ArticuloObj.articulo=articulo
      ArticuloObj.stockMinimo=stockMinimo
      ArticuloObj.Saldo=MontoNuevo+Saldo
      ArticuloObj.unidadMedida=unidadMedida
      ArticuloObj.Bodega=Bodega
      ArticuloObj.categoria=categoria
      ArticuloObj.id=IdArticulo
      //console.log("🚀 ~ file: funcionesVentas.js ~ line 310 ~ ArticuloObj", ArticuloObj)
        
       OBjectStoreArticulos.put(ArticuloObj)
  
        }
        
        transactionArticulos.onerror= function (){
          console.log("no se ha actualizado el stock")
        }
        transactionArticulos.oncomplete= function (){
          console.log("se ha actualizado el stockkkkkkk")
        }
  break;
  case "eliminar":
  if(id===IdArticulo){

    ArticuloObj.articulo=articulo
    ArticuloObj.stockMinimo=stockMinimo
    ArticuloObj.Saldo=Saldo-CantidadDevolverStock
    ArticuloObj.unidadMedida=unidadMedida
    ArticuloObj.Bodega=Bodega
    ArticuloObj.categoria=categoria
    ArticuloObj.id=IdArticulo
    //console.log("🚀 ~ file: funcionesVentas.js ~ line 310 ~ ArticuloObj", ArticuloObj)
      
     OBjectStoreArticulos.put(ArticuloObj)

      }
      
      transactionArticulos.onerror= function (){
        console.log("no se ha actualizado el stock")
      }
      transactionArticulos.oncomplete= function (){
        console.log("se ha actualizado el stockkkkkkk")
      }
break;
}



cursor.continue()

}



}
}


export function EliminarCompra(e){
  e.preventDefault()

if(e.target.classList.contains("bi-file-earmark-x-fill")){

  const IdEliminar=Number(e.target.parentElement.getAttribute("data-id"))
  IdArticulo=Number(e.target.parentElement.getAttribute("data-idProducto"));
  CantidadDevolverStock=Number(e.target.parentElement.getAttribute("data-cantidad"))


  const Transaction=DB.transaction(["compras"],"readwrite")
  const ObjectStore=Transaction.objectStore("compras")

  ObjectStore.delete(Number(IdEliminar))

Transaction.onerror= function (){

  console.log("no se pudo borrar")
}


Transaction.oncomplete= function (){

  swal({
    title: "Atencion!",
    text: "Se ha Eliminado el registro!",
    icon: "success",
  });
  ActualizarStockCompra("eliminar")
  CargarComprasHTML();
 //const ElementoBorrar=e.target.parentElement.parentElement

 
}
  

}




}

export function CargarEdicionCompra(e) {
  e.preventDefault();
  console.log(compras)
 formulario.innerHTML=` <div class="col-md-4">
        
 <label for="validationTooltip04" class="form-label">Articulo</label>
 <input type="text" class="form-control" id="articulo" name="articulo" readonly>
 
</div>

<div class="col-md-3 articulosss">
 <label for="validationTooltip02" class="form-label">Fecha</label>
 <input type="date" europe-countries id="fecha" name="fecha" class="form-control" >

</div>

<div class="col-md-3">
 <label for="validationTooltip03" class="form-label">Cantidad</label>
 <input type="text" class="form-control" id="cantidad" name="cantidad">
 

</div>
<div class="col-md-4">
 <label for="validationTooltip05" class="form-label">Proveedor</label>
 <input type="text" class="form-control" id="proveedor" name="proveedor">
 
</div>
<div class="col-md-4">
 <label for="validationTooltip04" class="form-label">Tipo Documento</label>
 <select class="form-select unidadMedida" id="tipoDocumento" name="tipoDocumento">
   <option value="Factura">Factura</option>
   <option value="Boleta">Boleta</option>
 </select>

 
</div>
<div class="col-md-4">
 <label for="validationTooltip05" class="form-label">N° Documento</label>
 <input type="text" class="form-control Bodega" id="NumeroDocumento" name="NumeroDocumento">
 
</div>
<div class="col-md-4">
   <label for="validationTooltip05" class="form-label">Observacion</label>
   <input type="text" class="form-control Observacion" id="Observacion" name="Observacion">
 
 </div>
<div class="col-12">
 <button class="btn btn-primary" type="submit" id="boton">Guardar Cambios</button>

</div>`

const Articulo=document.querySelector("#articulo")
const Fecha=document.querySelector("#fecha")
const Cantidad=document.querySelector("#cantidad")
const Proveedor=document.querySelector("#proveedor")
const TipoDocumento=document.querySelector("#tipoDocumento")
const NumeroDocumento=document.querySelector("#NumeroDocumento")
 const ObservacionN=document.querySelector("#Observacion")

  if (e.target.classList.contains("bi-pencil-square")) {
    IdEditar = e.target.parentElement.getAttribute("data-id");
    IdArticulo=Number(e.target.parentElement.getAttribute("data-idProducto"));
    MontoAnteriorCompra=Number(e.target.parentElement.getAttribute("data-cantidad"))
 
  }

  const transaction = DB.transaction(["compras"], "readwrite");
  const ObjectStore = transaction.objectStore("compras");

  ObjectStore.openCursor().onsuccess = function (e) {

    const cursor = e.target.result;
  
    if (cursor) {
      const {articulo,fecha,cantidad,proveedor,tipoDocumento,NumDocumento,Observacion,id,} = cursor.value;

      if (id === Number(IdEditar)) {
       
        //llenar campos
        
        Articulo.value=articulo
        Fecha.value=fecha
        Cantidad.value=cantidad
        Proveedor.value=proveedor
        TipoDocumento.value=tipoDocumento
        NumeroDocumento.value=NumDocumento
        ObservacionN.value=Observacion

        swal({
          title: "Has Entrado al Modo Edicion!",
        
          icon: "success",
        });
    
      }
      cursor.continue();
      EdicionCompras=true
    }
  };


  

  
}