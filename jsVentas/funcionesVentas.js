import {formulario,listadoVentas} from "./SelectoresVentas.js"
import {ArticuloObj,BaseDatoArticulos} from "../js/funciones.js"


let DB;
let IdArticulo;
let EdicionVentas;
let IdEditar;
let MontoAnteriorVenta;
let CantidadDevolverStock;
let data=[]
let ClientesLista=[];

const ventas={
articulo:"",
fecha:"",
cantidad:"",
cliente:"",
tipoDocumento:"",
NumDocumento:"",
Observacion:"",
id:"",
idarticulo:""


}


export function IngresarVenta(e){

  e.preventDefault()

if(EdicionVentas){
 
  const transaction = DB.transaction(["ventas"], "readwrite");
  const ObjectStore = transaction.objectStore("ventas");

  const ArticuloInput=document.querySelector("#articulo").value
  const FechaInput=document.querySelector("#fecha").value
  const CantidadInput=document.querySelector("#cantidad").value
  const ClienteInput=document.querySelector("#cliente")
  const tipoDocumentoInput=document.querySelector("#tipoDocumento").value
  const NumeroDocumentoInput=document.querySelector("#NumeroDocumento").value
  const observacionInput=document.querySelector("#Observacion").value

  ventas.articulo=ArticuloInput
  ventas.fecha=FechaInput
  ventas.cantidad=Number(CantidadInput)
  ventas.cliente=ClienteInput.options[ClienteInput.selectedIndex].text
  ventas.tipoDocumento=tipoDocumentoInput
  ventas.NumDocumento=NumeroDocumentoInput
  ventas.Observacion=observacionInput
  ventas.id=Number(IdEditar)
  ventas.idarticulo=Number(IdArticulo)
 
  const {articulo,fecha,cantidad,cliente,tipoDocumento,NumDocumento,Observacion}=ventas

if(articulo===""||fecha===""||cantidad===""||cliente===""||tipoDocumento===""||NumDocumento===""||Observacion===""){
 swal({
    title: "Atencion!",
    text: "Todos los campos son obligatorios!",
    icon: "error",
  });

}else if(isNaN(cantidad)||cantidad<=0){
  swal({
    title: "Atencion!",
    text: "No puedes agregar letras y numero menores a 0!",
    icon: "error",
  });

}
else{
  ObjectStore.put(ventas)

  transaction.onerror=function(){

    console.error("error")
  }
  transaction.oncomplete=function(){


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
    <label for="validationTooltip05" class="form-label">Cliente</label>
    <input type="text" class="form-control" id="cliente" name="cliente">
    
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

  EdicionVentas=false;
  
  
swal("Se ha editado el registro!","Desea actualizar el stock?","success",{buttons:["Cancelar","Aceptar"],dangerMode: false})
.then((value) => {
    if(value){
       
      ActualizarStockVenta("edicion");
            swal("Se ha actualizado el stock!", {
                icon: "success",
              })
       }  

});
  
  }
  CargarventasHTML()
}

  
//ingreso de nueva venta
}else{
  const ArticuloInput=document.querySelector("#articulo")
  const FechaInput=document.querySelector("#fecha").value
  const CantidadInput=document.querySelector("#cantidad").value
  const ClienteInput=document.querySelector("#cliente")
  const tipoDocumentoInput=document.querySelector("#tipoDocumento").value
  const NumeroDocumentoInput=document.querySelector("#NumeroDocumento").value
  const observacionInput=document.querySelector("#Observacion").value

  IdArticulo=Number(ArticuloInput.value) // para actualizar stock
 
 

  ventas.articulo=ArticuloInput.options[ArticuloInput.selectedIndex].text
  ventas.fecha=FechaInput
  ventas.cantidad=Number(CantidadInput)
  ventas.cliente=ClienteInput.options[ClienteInput.selectedIndex].text
  ventas.tipoDocumento=tipoDocumentoInput
  ventas.NumDocumento=NumeroDocumentoInput
  ventas.Observacion=observacionInput
  ventas.id=Date.now()
  ventas.idarticulo=Number(IdArticulo)

  const{articulo,fecha,cantidad,cliente,tipoDocumento,NumDocumento,observacion}=ventas

if(articulo===""||fecha===""||cantidad===""||cliente===""||tipoDocumento===""||NumDocumento===""||observacion===""){
  swal({
    title: "Atencion!",
    text: "Todos los campos son obligatorios!",
    icon: "error",
  });
  
}else if(isNaN(cantidad)||cantidad <=0){

  swal({
    title: "Atencion!",
    text: "No puede agregar letras,y numero menores a 0",
    icon: "error",
  });
}
else{

const transaction=DB.transaction(["ventas"],"readwrite");
const ObjectStore=transaction.objectStore("ventas")

data.forEach((items)=>{

  const {id,Saldo,articulo}=items


  if(ventas.idarticulo===id){

if(ventas.cantidad>Saldo){
  swal({
    title: "Alerta!",
    text: `El stock es insuficiente, la cantidad de unidades que tienes de: ${articulo} son : ${Saldo} `,
    icon: "error",
  });

}else{
  ObjectStore.add(ventas)
  //console.log("🚀 ~ file: funcionesVentas.js ~ line 57 ~ IngresarVenta ~ ventas", ventas)
  
  transaction.onerror=function(e){
    console.log("ha ocurrido un error",e.target.error)
  
  }
  transaction.oncomplete=function(){
    swal({
      title: "Operacion exitosa!",
      text: "Has agregado una venta!",
      icon: "success",
    });
    formulario.reset();
    ActualizarStockVenta("venta")
    CargarventasHTML()
  
    
  }
  
}



  }

})

console.log(ventas)



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
 
  const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria,id}=cursor.value;

const select=document.createElement("option")
select.setAttribute("value",id);
select.setAttribute("data-id",articulo);
select.textContent=articulo;

SelectProductos.appendChild(select)

cursor.continue()
data.push(cursor.value)
//console.log("🚀 ~ file: funcionesVentas.js ~ line 294 ~ CargarProductos ~ data", data)
}

$(document).ready(function() {
  $('.js-example-basic-single').select2({
    placeholder: "Selecciona un articulo",
    allowClear: true
  });
});
}


}

export function CargarventasHTML(){

while(listadoVentas.firstChild){
  listadoVentas.removeChild(listadoVentas.firstChild)
}

  const transaction=DB.transaction(["ventas"],"readonly")
  const ObjectStore=transaction.objectStore("ventas")

  ObjectStore.openCursor().onsuccess= function (e){

    const cursor = e.target.result
  if(cursor){
  
    const{articulo,fecha,cantidad,cliente,tipoDocumento,NumDocumento,Observacion,id,idarticulo}=cursor.value
  //console.log(cursor.value)
  
  
  
  const row=document.createElement("tr")
  row.innerHTML=`<td>${articulo}</td>
  <td>${fecha}</td>
  <td>${cantidad}</td>
  <td>${cliente}</td>
  <td>${tipoDocumento}</td>
  <td>${NumDocumento}</td>
  <td>${Observacion}</td>
  <a href="#" data-id="${id}" data-idProducto="${idarticulo}" data-Cantidad="${cantidad}" style="font-size: 35px;"class="BTNEditar"><img src="/js/img/editnote_pencil_edi_6175.png" alt="" class="imgEditar"></a>
  <a href="#" data-id="${id}" data-idProducto="${idarticulo}" data-Cantidad="${cantidad}" style="font-size: 35px;"class="BTNBorrar"><img src="/js/img/delete_delete_exit_1577.png" alt="" class="imgEliminar"  style="margin-left:15px;"></a>
  `
  listadoVentas.appendChild(row)

  cursor.continue()
  
  }
  
  }

}

function ActualizarStockVenta(tipo){
// actualizar stock
const transactionArticulos=DB.transaction(["Articulos"],"readwrite")
const OBjectStoreArticulos=transactionArticulos.objectStore("Articulos")

OBjectStoreArticulos.openCursor().onsuccess= function (e){

  const cursor = e.target.result
  
  if(cursor){
    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria,id}=cursor.value

switch (tipo){
  case "venta":
    if(id===IdArticulo){

      const {cantidad}=ventas
  
      ArticuloObj.articulo=articulo
      ArticuloObj.stockMinimo=stockMinimo
      ArticuloObj.Saldo=Saldo-cantidad
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

      const {cantidad}=ventas // capturando el valor cantidad nuevo del input ya cargado en el objeto ventas
 
      // calculos stock restante por edicion de ventas
      let montoNuevo=cantidad
let MontoNuevo=MontoAnteriorVenta-montoNuevo
      

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
    ArticuloObj.Saldo=Saldo+CantidadDevolverStock
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


export function EliminarVenta(e){
  e.preventDefault()

if(e.target.classList.contains("imgEliminar")){

  const IdEliminar=Number(e.target.parentElement.getAttribute("data-id"))
  IdArticulo=Number(e.target.parentElement.getAttribute("data-idProducto"));
  CantidadDevolverStock=Number(e.target.parentElement.getAttribute("data-cantidad"))


  const Transaction=DB.transaction(["ventas"],"readwrite")
  const ObjectStore=Transaction.objectStore("ventas")

  ObjectStore.delete(Number(IdEliminar))

Transaction.onerror= function (){

  console.log("no se pudo borrar")
}


Transaction.oncomplete= function (){

  CargarventasHTML();
  swal("Se ha eliminado el registro!","ahora Desea actualizar el stock?","warning",{buttons:["Cancelar","Aceptar"],dangerMode: true})
  .then((value) => {
      if(value){
         
        ActualizarStockVenta("eliminar");
              swal("Se ha actualizado el stock!", {
                  icon: "success",
                })
         }  
  
  });

 
 //const ElementoBorrar=e.target.parentElement.parentElement

 
}
  

}




}

export function CargarEdicionVenta(e) {
  e.preventDefault();
  console.log(ventas)




  if (e.target.classList.contains("imgEditar")) {

    formulario.innerHTML=` <div class="col-md-3">
        
    <label for="validationTooltip04" class="form-label">Articulo</label>
    <input type="text" class="form-control" id="articulo" name="articulo" readonly>
    
   </div>
   
   <div class="col-md-2">
    <label for="validationTooltip02" class="form-label">Fecha</label>
    <input type="date" europe-countries id="fecha" name="fecha" class="form-control" >
   
   </div>
   
   <div class="col-md-2">
    <label for="validationTooltip03" class="form-label">Cantidad</label>
    <input type="text" class="form-control" id="cantidad" name="cantidad">
    
   
   </div>
   <div class="col-md-3">
    <label for="validationTooltip05" class="form-label">Cliente</label>
    <select class="js-example-basic-single form-control" name="state" id="cliente">
    <option value=""></option>
   </select>
    
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
const Cliente=document.querySelector("#cliente")
const TipoDocumento=document.querySelector("#tipoDocumento")
const NumeroDocumento=document.querySelector("#NumeroDocumento")
 const ObservacionN=document.querySelector("#Observacion")

    IdEditar = e.target.parentElement.getAttribute("data-id");
    IdArticulo=Number(e.target.parentElement.getAttribute("data-idProducto"));
    MontoAnteriorVenta=Number(e.target.parentElement.getAttribute("data-cantidad"))
    const transaction = DB.transaction(["ventas"], "readwrite");
    const ObjectStore = transaction.objectStore("ventas");
  
    ObjectStore.openCursor().onsuccess = function (e) {
  
      const cursor = e.target.result;
    
      if (cursor) {
        const {articulo,fecha,cantidad,cliente,tipoDocumento,NumDocumento,Observacion,id,} = cursor.value;
  
        if (id === Number(IdEditar)) {
         
          //llenar campos
          
          Articulo.value=articulo
          Fecha.value=fecha
          Cantidad.value=cantidad
          Cliente.value=cliente
          TipoDocumento.value=tipoDocumento
          NumeroDocumento.value=NumDocumento
          ObservacionN.value=Observacion
  
          swal({
            title: "Has Entrado al Modo Edicion!",
            icon: "success",
          });
          CargarProductos()
          setTimeout(()=>{
            LlenarBuscador()
          },200)
        }
        cursor.continue();
        EdicionVentas=true
      }
    
    };
  
  
  }


  

  
}

export function CargarClientes() {
  ClientesLista=[]
  const Transaction = DB.transaction(["clientes"], "readonly");
  const ObjectStore = Transaction.objectStore("clientes");
  ObjectStore.openCursor().onsuccess = function (e) {
    const cursor = e.target.result;

    if (cursor) {
      if (cursor === null) {
        console.log("no hay mas registros");
      } else {
      
          ClientesLista.push(cursor.value);

      }

      cursor.continue();
      console.log(ClientesLista);
    }
  };
  return ClientesLista;
  
}

export function LlenarBuscador(){
  
  const buscador=document.querySelector("#cliente")
  ClientesLista.forEach((items)=>{

  const select=document.createElement("option")
const { nombre,id}=items

select.setAttribute("value",id);
select.textContent=nombre;


buscador.appendChild(select)
  })
 

  


}
