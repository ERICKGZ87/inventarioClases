
export let DB1;
let BaseDatoArticulos
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
    
  
    //ui.InyectarHtml()
    
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

export function conectarDBBase() {
    const AbrirConexion = window.indexedDB.open("Articulos", 1);

    AbrirConexion.onerror = function () {
      console.log("Error");
    };

    AbrirConexion.onsuccess = function () {
        DB1 = AbrirConexion.result;
      
    };

  }