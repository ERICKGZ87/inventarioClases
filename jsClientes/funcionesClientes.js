import {
    Nombre,
    Direccion,
    Telefono,
    ListaClientes,
    BotonAgregar,
    buscador
  } from "./selectoresClientes.js";
  
  export let DB;
  let IdEliminar;

  export let ClientesLista = [];

  export function conectarDBBase() {
    const AbrirConexion = window.indexedDB.open("Articulos", 1);
  
    AbrirConexion.onerror = function () {
      console.log("Error");
    };
  
    AbrirConexion.onsuccess = function () {
      DB = AbrirConexion.result;
    };
  }
  
  const clientes = {
    nombre: "",
    direccion: "",
    telefono: "",
    id: "",
  };
  
  export function AgregarCliente(e) {
    e.preventDefault();
  
    //llenar objeto
    clientes.nombre = Nombre.value;
    clientes.direccion = Direccion.value;
    clientes.telefono = Telefono.value;
    clientes.id = Date.now();
  
    const { nombre, direccion, telefono } = clientes;
  
    //validar
  
    if (nombre === "" || direccion === "" || telefono == "") {
      swal("Todos los campos son obligatorios!", {
        icon: "warning",
      });
      return;
    } else {
      const transaction = DB.transaction(["clientes"], "readwrite");
      const ObjectStores = transaction.objectStore("clientes");
  
      ObjectStores.add(clientes);
  
      transaction.onerror = function () {
        console.log("error");
      };
  
      transaction.oncomplete = function () {
        swal({
          title: "Operacion exitosa!",
          text: "Has agregado un cliente",
          icon: "success",
        });
      
        CargarClientes()
        setTimeout(()=>{
  
          CargarClientesHTML()
          LlenarBuscador()
          BotonAgregar.reset();
        },100)
    
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
  
  
  export function CargarClientesHTML() {
  
  while(ListaClientes.firstChild){
    ListaClientes.removeChild(ListaClientes.firstChild)
  
  }
  
  ClientesLista.forEach((client) => {
     
      const { nombre, direccion, telefono, id } = client;
     // console.log("🚀 ~ file: funcionesProveedores.js ~ line 93 ~ ProveedoresLista.forEach ~ proveedo", proveedo)
  
      const row = document.createElement("tr");
  
  row.innerHTML = `<td>${nombre}</td>
  <td>${direccion}</td>
  <td>${telefono}</td>
  <a href="#" data-id="${id}"style="font-size: 35px;"class="BTNBorrar"><img src="/js/img/delete_delete_exit_1577.png" alt="" class="imgEliminar"  style="margin-left:15px;"></a>
  `;
  ListaClientes.appendChild(row);
    });
  }
  
  export function EliminarClientes(e){
  
  if(e.target.classList.contains("imgEliminar")){
  
    IdEliminar=Number(e.target.parentElement.getAttribute("data-id"))
  
  const Transaction=DB.transaction(["clientes"],"readwrite");
  const ObjectStore=Transaction.objectStore("clientes");
  
  ObjectStore.delete(IdEliminar)
  
  Transaction.onerror=function () {
  
    console.log("no se pudo eliminar");
  }
  
  Transaction.oncomplete=function () {
  
    swal({
      title: "Operacion exitosa!",
      text: "Has Eliminado un cliente",
      icon: "success",
    });
    CargarClientes()
    setTimeout(()=>{
        CargarClientesHTML()
    },200)
    
   
  }
  
  
  
  }
  
  
  }
  
  export function LlenarBuscador(){
  
    ClientesLista.forEach((items)=>{
  
    const select=document.createElement("option")
  const { nombre,id}=items
  
  select.setAttribute("value",id);
  select.textContent=nombre;
  
  
  buscador.appendChild(select)
    })
   
  
    
  
  
  }
  
  export function FiltrarClientes(e){
  e.preventDefault()
  ListaClientes.innerHTML =""
  
  //let textoBusqueda=buscador.options[buscador.selectedIndex].text
  let Idproveedor=buscador.value
  console.log("🚀 ~ file: funcionesProveedores.js ~ line 190 ~ Filtrarproveedor ~ textoBusqueda", Idproveedor)
  
  let ClientesLista2=[]
  
  ClientesLista2=ClientesLista.filter(item=>item.id===Number(Idproveedor))
  
  ClientesLista2.forEach((client)=>{
  
    const { nombre, direccion, telefono,id}= client
    const row = document.createElement("tr");
  
    row.innerHTML = `<td>${nombre}</td>
    <td>${direccion}</td>
    <td>${telefono}</td>
    <a href="#" data-id="${id}"style="font-size: 35px;"class="BTNBorrar"><img src="/js/img/delete_delete_exit_1577.png" alt="" class="imgEliminar"  style="margin-left:15px;"></a>
    `;
    ListaClientes.appendChild(row);
  })
  
  
  
  
  
  
  }
  