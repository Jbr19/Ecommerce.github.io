import { productosServicios } from "../services/productosServicios.js";


function mostrarProductosIndex(seccion, clasificador) {
    productosServicios.listaProductos().then((respuesta) => {
        respuesta.forEach((producto) => {
            if (seccion.childNodes.length < 6) {
                clasificar(seccion, producto, clasificador);
            }
        });
    });
}

function mostrarProductosSeccion(seccion, clasificador) {
    productosServicios.listaProductos().then((respuesta) => {
        respuesta.forEach((producto) => {
            clasificar(seccion, producto, clasificador);
        });
    });
}

function mostrarProductosNombre(ubicacion, clasificador, ubicacionCantidad) {
    productosServicios.listaProductos().then((respuesta) => {
        respuesta.forEach(producto => {
            if (producto.nombre.toLowerCase().includes(clasificador.toLowerCase())) {
                ubicacion.appendChild(productosServicios.crearNuevaLinea(producto.nombre, producto.precio, producto.image, producto.id));
            }
        });
        if (ubicacion.childElementCount == 0) {
            ubicacionCantidad.textContent = `No se encontraron productos`;
        }
        else {
            if (ubicacion.childElementCount == 1) {
                ubicacionCantidad.textContent = `Se encontró ${ubicacion.childElementCount} producto:`;
            }
            else {
                ubicacionCantidad.textContent = `Se encontraron ${ubicacion.childElementCount} productos:`;
            }
        }
    });
}

function mostrarProductos() {
    productosServicios.listaProductos().then(respuesta => {
        respuesta.forEach(({ image, nombre, precio, id }) => {
            productosServicios.crearLineaAdmin(image, nombre, precio, id);

        });
    }).catch((err) => { console.log(err); });
}

function clasificar(ubicacion, producto, clasificador) {
    if (producto.seccion == clasificador) {
        ubicacion.appendChild(productosServicios.crearNuevaLinea(producto.nombre, producto.precio, producto.image, producto.id));
    }
}

function obtenerInformacion(parametro) {
    const url = new URL(window.location);
    const info = url.searchParams.get(parametro);
    return info;
}



export const funciones = {
    mostrarProductosSeccion,
    mostrarProductosNombre,
    mostrarProductosIndex,
    mostrarProductos,
    clasificar,
    obtenerInformacion,
}