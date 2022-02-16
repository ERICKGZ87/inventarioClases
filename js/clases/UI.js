import{formulario,tabla}from "../selectores.js"
import { items } from "./Producto.js";

export let iditemEliminar;
export let iditemEditar;

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

    InyectarHtml(obj){
       this.LImpiarTabla()
obj.forEach((ob)=>{
const {articulo,stockMinimo,Saldo,unidadMedida,Bodega,Observacion,id}=ob

const row=document.createElement("tr")
row.innerHTML=`<td>${articulo}</td>
<td>${stockMinimo}</td>
<td>${Saldo}</td>
<td>${unidadMedida}</td>
<td>${Bodega}</td>
<td>${Observacion}</td>
`

const BtnEditar=document.createElement("button")
BtnEditar.classList.add("btn","mr-2","link-danger")
BtnEditar.setAttribute("id",id)
BtnEditar.innerHTML='Editar'
row.appendChild(BtnEditar)

BtnEditar.onclick=(e) =>{
  
  iditemEditar=parseInt(e.target.getAttribute("id"))
  //console.log("🚀 ~ file: UI.js ~ line 51 ~ UI ~ obj.forEach ~ iditemEditar", iditemEditar)

  items.CargarModoEdicion(iditemEditar,items)

}

const Btn=document.createElement("button")
Btn.classList.add("btn","mr-2","link-danger")
Btn.setAttribute("id",id)
Btn.innerHTML='Eliminar'

row.appendChild(Btn)

  
Btn.onclick=(e) =>{
  
    iditemEliminar=parseInt(e.target.getAttribute("id"))
    console.log("🚀 ~ file: UI.js ~ line 49 ~ UI ~ obj.forEach ~ iditemEliminar", iditemEliminar)
 items.EliminarArticulos(iditemEliminar)

  }

tabla.appendChild(row)



})

    }

    LImpiarTabla(){
while(tabla.firstChild){
tabla.removeChild(tabla.firstChild)

}

    }
    
}

export const ui=new UI()