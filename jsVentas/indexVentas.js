import {conectarDBBase,CargarProductos,IngresarVenta,CargarventasHTML,EliminarVenta,CargarEdicionVenta} from "./funcionesVentas.js"
import {Articulo,formulario,listadoVentas} from "./SelectoresVentas.js"



document.addEventListener('DOMContentLoaded',()=>{
    conectarDBBase()

    setTimeout(()=>{
        CargarProductos()
        CargarventasHTML()
    },500)
    formulario.innerHTML=` <div class="col-md-3">
        
    <label for="validationTooltip04" class="form-label">Articulo</label>
    <select class="js-example-basic-single form-control" name="state" id="articulo" >
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
    <label for="validationTooltip05" class="form-label">Cliente</label>
    <input type="text" class="form-control" id="cliente" name="cliente">
    
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
  <div class="col-2 mt-5">
    <button class="btn btn-primary" type="submit" id="boton">Nueva venta</button>
   
  </div>`
})
formulario.addEventListener("submit",IngresarVenta)
listadoVentas.addEventListener("click",EliminarVenta)
listadoVentas.addEventListener("click",CargarEdicionVenta)