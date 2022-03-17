
export let DB1;


export function conectarDBBase() {
    const AbrirConexion = window.indexedDB.open("Articulos", 1);

    AbrirConexion.onerror = function () {
      console.log("Error");
    };

    AbrirConexion.onsuccess = function () {
        DB1 = AbrirConexion.result;
      
    };

  }