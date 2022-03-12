export const formulario = document.querySelector("#form");
export const form = document.querySelectorAll("form input");
export const BotonAgregar = document.querySelector("#boton");
export const tabla = document.querySelector("#Articulos tbody");

// inpust
export const articuloInput= document.querySelector("#articulo");
export const stockMinimoInput= document.querySelector("#stockminimo");
export const saldoInput= document.querySelector("#Saldo");
export const unidadMedidaInput= document.querySelector("#unidadMedida");
export const BodegaInput= document.querySelector("#Bodega");
export const categoriaInput= document.querySelector("#categoria");

//expresiones reg
export let alfanumerico=/[a-zA-Z_0-9]{1,16}$/

export let RexNOmbre=/^[a-zA-ZÀ-ÿ\s-0-9]{1,40}$/;
export let rgAmount =/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;