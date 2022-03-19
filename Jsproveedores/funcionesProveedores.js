import {
  Nombre,
  Direccion,
  Telefono,
  ListaProveedores,
  BotonAgregar,
  buscador
} from "./selectoresProveedores.js";

export let DB;
let IdEliminar;
export let ProveedoresLista = [];

export function conectarDBBase() {
  const AbrirConexion = window.indexedDB.open("Articulos", 1);

  AbrirConexion.onerror = function () {
    console.log("Error");
  };

  AbrirConexion.onsuccess = function () {
    DB = AbrirConexion.result;
  };
}

const proveedores = {
  nombre: "",
  direccion: "",
  telefono: "",
  id: "",
};

export function AgregarProveedor(e) {
  e.preventDefault();

  //llenar objeto
  proveedores.nombre = Nombre.value;
  proveedores.direccion = Direccion.value;
  proveedores.telefono = Telefono.value;
  proveedores.id = Date.now();

  const { nombre, direccion, telefono } = proveedores;

  //validar

  if (nombre === "" || direccion === "" || telefono == "") {
    swal("Todos los campos son obligatorios!", {
      icon: "warning",
    });
    return;
  } else {
    const transaction = DB.transaction(["proveedores"], "readwrite");
    const ObjectStores = transaction.objectStore("proveedores");

    ObjectStores.add(proveedores);

    transaction.onerror = function () {
      console.log("error");
    };

    transaction.oncomplete = function () {
      swal({
        title: "Operacion exitosa!",
        text: "Has agregado un proveedor",
        icon: "success",
      });
    
      CargarProveedores()
      setTimeout(()=>{

        CargarProveedoresHTML()
        LlenarBuscador()
        BotonAgregar.reset();
      },100)
  
    };

    
  }
}

export function CargarProveedores() {
  ProveedoresLista=[]
  const Transaction = DB.transaction(["proveedores"], "readonly");
  const ObjectStore = Transaction.objectStore("proveedores");
  ObjectStore.openCursor().onsuccess = function (e) {
    const cursor = e.target.result;

    if (cursor) {
      if (cursor === null) {
        console.log("no hay mas registros");
      } else {
      
        ProveedoresLista.push(cursor.value);

      }

      cursor.continue();
      console.log(ProveedoresLista);
    }
  };
  return ProveedoresLista;
  
}

export function CargarProveedoresHTML() {

while(ListaProveedores.firstChild){
  ListaProveedores.removeChild(ListaProveedores.firstChild)

}

  ProveedoresLista.forEach((proveedo) => {
   
    const { nombre, direccion, telefono, id } = proveedo;
   // console.log("🚀 ~ file: funcionesProveedores.js ~ line 93 ~ ProveedoresLista.forEach ~ proveedo", proveedo)

    const row = document.createElement("tr");

row.innerHTML = `<td>${nombre}</td>
<td>${direccion}</td>
<td>${telefono}</td>
<a href="#" data-id="${id}"style="font-size: 35px;"class="BTNBorrar"><img src="/js/img/delete_delete_exit_1577.png" alt="" class="imgEliminar"  style="margin-left:15px;"></a>
`;
    ListaProveedores.appendChild(row);
  });
}

export function EliminarProveedor(e){

if(e.target.classList.contains("imgEliminar")){

  IdEliminar=Number(e.target.parentElement.getAttribute("data-id"))

const Transaction=DB.transaction(["proveedores"],"readwrite");
const ObjectStore=Transaction.objectStore("proveedores");

ObjectStore.delete(IdEliminar)

Transaction.onerror=function () {

  console.log("no se pudo eliminar");
}

Transaction.oncomplete=function () {

  swal({
    title: "Operacion exitosa!",
    text: "Has Eliminado un proveedor",
    icon: "success",
  });
  CargarProveedores()
  setTimeout(()=>{
    CargarProveedoresHTML()
  },200)
  
 
}



}


}

export function LlenarBuscador(){



  ProveedoresLista.forEach((items)=>{

  const select=document.createElement("option")
const { nombre,id}=items

select.setAttribute("value",id);
select.textContent=nombre;


buscador.appendChild(select)
  })
 

  


}

export function Filtrarproveedor(e){
e.preventDefault()
ListaProveedores.innerHTML =""

//let textoBusqueda=buscador.options[buscador.selectedIndex].text
let Idproveedor=buscador.value
console.log("🚀 ~ file: funcionesProveedores.js ~ line 190 ~ Filtrarproveedor ~ textoBusqueda", Idproveedor)

let ProveedoresLista2=[]

ProveedoresLista2=ProveedoresLista.filter(item=>item.id===Number(Idproveedor))

ProveedoresLista2.forEach((proveed)=>{

  const { nombre, direccion, telefono,id}= proveed
  const row = document.createElement("tr");

  row.innerHTML = `<td>${nombre}</td>
  <td>${direccion}</td>
  <td>${telefono}</td>
  <a href="#" data-id="${id}"style="font-size: 35px;"class="BTNBorrar"><img src="/js/img/delete_delete_exit_1577.png" alt="" class="imgEliminar"  style="margin-left:15px;"></a>
  `;
      ListaProveedores.appendChild(row);
})






}
