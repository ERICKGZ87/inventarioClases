import{formulario,tabla}from "../selectores.js"
import { items } from "./Producto.js";
import {BaseDatoArticulos} from "../funciones.js"

export let iditemEliminar;
export let iditemEditar;

export let Productos=[];

class UI {

    MostrarAlertas(msj,tipo){
          //crear div
      const div = document.createElement("div");
      div.classList.add("text-center", "alert", "d-block", "col-12");
  
      if (tipo === "error") {
        div.classList.add("alert", "alert-danger");
      } else {
        div.classList.add("alert", "alert-success");
      }
      setTimeout(() => {
        div.remove();
      }, 2000);
      //msj error
      div.textContent = msj;
      //form.insertBefore(div,document.querySelector("#mascota11"))
      formulario.appendChild(div)
    }

    InyectarHtml(){
       this.LImpiarTabla()
let textoBusqueda;
       //cargar buscador

const ObjectStore=BaseDatoArticulos.transaction("Articulos").objectStore("Articulos")


ObjectStore.openCursor().onsuccess = function(e){

const cursor=e.target.result

if(cursor===null){
console.log("no hay mas registros")

}else{
  Productos.push(cursor.value);


  console.log("🚀 ~ file: UI.js ~ line 45 ~ UI ~ ObjectStore.openCursor ~ Productos", Productos)

}
const row=document.createElement("tr")
if(cursor){
  
  Productos.forEach((item)=>{

    const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,categoria,id}=item
    
    row.innerHTML=`<td>${articulo}</td>
     <td>${stockMinimo}</td>
    <td>${Saldo}</td>
    <td>${unidadMedida}</td>
    <td>${Bodega}</td>
    <td>${categoria}</td>
    `
    
    const BtnEditar=document.createElement("button")
    BtnEditar.classList.add("btn","mr-2","link-warning")
    BtnEditar.setAttribute("id",id)
    BtnEditar.innerHTML='Editar'
    row.appendChild(BtnEditar)
    
    //const citaa=cursor.value
  
    
    BtnEditar.onclick=(e) =>{
      
    iditemEditar=parseInt(e.target.getAttribute("id"))
    console.log("🚀 ~ file: UI.js ~ line 59 ~ UI ~ ObjectStore.openCursor ~ iditemEditar", iditemEditar)
    
    
    items.CargarModoEdicion(iditemEditar,Productos)
    
    }
    
    const Btn=document.createElement("button")
    Btn.classList.add("btn","mr-2","link-danger")
    Btn.setAttribute("id",id)
    Btn.innerHTML='Eliminar <i class="bi bi-file-earmark-x-fill"></i>'
    
    row.appendChild(Btn)
    
      
   Btn.onclick=(e) =>{
      
    iditemEliminar=parseInt(e.target.getAttribute("id"))
    console.log("🚀 ~ file: UI.js ~ line 49 ~ UI ~ obj.forEach ~ iditemEliminar", iditemEliminar)
    items.EliminarArticulos(iditemEliminar)
    
    }
    
  

  
  })
  tabla.appendChild(row)

  cursor.continue()
}

}


    }

    LImpiarTabla(){
while(tabla.firstChild){
tabla.removeChild(tabla.firstChild)

}

    }
    
}

export const ui=new UI()