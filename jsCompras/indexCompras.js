import {conectarDBBase,CargarProductos,IngresarCompra,CargarComprasHTML,EliminarCompra,CargarEdicionCompra} from "./funcionesCompras.js"
import {formulario,listadoCompras,BTNproveedor} from "./selectoresCompras.js"



document.addEventListener('DOMContentLoaded',()=>{
    conectarDBBase()

    setTimeout(()=>{
        CargarProductos()
        CargarComprasHTML()
    },500)
    formulario.innerHTML=` <div class="col-md-4">
        
    <label for="validationTooltip04" class="form-label">Buscar Articulo</label>
    <select class="js-example-basic-single form-control" name="state" id="articulo">
      <option value=""></option>
    </select>
    
    
  </div>

  <div class="col-md-2">
    <label for="validationTooltip02" class="form-label">Fecha</label>
    <input type="date" europe-countries id="fecha" name="fecha" class="form-control" >
   
  </div>

  <div class="col-md-2">
    <label for="validationTooltip03" class="form-label">Cantidad</label>
    <input type="text" class="form-control" id="cantidad" name="cantidad">
    
   
  </div>
  <div class="col-md-2">
    <label for="validationTooltip05" class="form-label">Proveedor</label>
    <input type="text" class="form-control" id="proveedor" name="proveedor"> 
    
    

    
    
  </div>
  <div class="col-md-2">
    <label for="validationTooltip04" class="form-label">Tipo Documento</label>
    <select class="form-select unidadMedida" id="tipoDocumento" name="tipoDocumento">
      <option value="Factura">Factura</option>
      <option value="Boleta">Boleta</option>
    </select>

    
  </div>
  <div class="col-md-2">
    <label for="validationTooltip05" class="form-label">N° Documento</label>
    <input type="text" class="form-control Bodega" id="NumeroDocumento" name="NumeroDocumento">
    
  </div>
  <div class="col-md-3">
      <label for="validationTooltip05" class="form-label">Observacion</label>
      <input type="text" class="form-control Observacion" id="Observacion" name="Observacion">
    
    </div>
  <div class="col-md-2 mt-5">
    <button class="btn btn-primary" type="submit" id="boton">Nueva Compra</button>
   
  </div>`
})
formulario.addEventListener("submit",IngresarCompra)
listadoCompras.addEventListener("click",EliminarCompra)
listadoCompras.addEventListener("click",CargarEdicionCompra)
if(BTNproveedor){
  BTNproveedor.addEventListener("click",hola)

  

}
