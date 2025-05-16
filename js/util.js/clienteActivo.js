import { obtenerDeStorage, guardarEnStorage } from "./localStorage.js";

export function guardarClienteActualizado(cliente){
    const clienteSinCircular = JSON.parse(JSON.stringify(cliente,(key,value)=>{
        if(key === 'propietario')return undefined;
        return value;
    }))
    
    sessionStorage.setItem("clienteActivo",JSON.stringify(clienteSinCircular));

    const clientes = obtenerDeStorage("clientes");
    const index = clientes.findIndex(x => x.usuario === cliente.usuario);
    if(index !== -1){
        clientes[index]= clienteSinCircular;
        guardarEnStorage("clientes", clientes);
    }
}