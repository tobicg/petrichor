class Producto {
    constructor(tipo, precio, talle, color) {
        this.tipo  = tipo;
        this.precio  = parseFloat(precio);
        this.talle = talle;
        this.color = color;
    }
}

const remeraSBV = new Producto("Remera", 900, "S", "Blanco");
const remeraMBV = new Producto("Remera", 900, "M", "Blanco");
const remeraLBV = new Producto("Remera", 900, "L", "Blanco");

const remeraSBA = new Producto("Remera", 900, "S", "Blanco");
const remeraMBA = new Producto("Remera", 900, "M", "Blanco");
const remeraLBA = new Producto("Remera", 900, "L", "Blanco");

const remeraSBeM = new Producto("Remera", 900, "S", "Beige");
const remeraMBeM = new Producto("Remera", 900, "M", "Beige");
const remeraLBeM = new Producto("Remera", 900, "L", "Beige");

const gorraB = new Producto("Gorra", 600, "Único", "Blanca");
const gorraBe = new Producto("Gorra", 600, "Único", "Beige");
const gorraN = new Producto("Gorra", 600, "Único", "Negra");
const gorraV = new Producto("Gorra", 600, "Único", "Verde");

const bolsaB = new Producto("Bolsa", 700, "Único", "Blanca");
const bolsaBe = new Producto("Bolsa", 700, "Único", "Beige");

const carrito = []

let total = 0;

let pedido1 = prompt("Desea comprar la remera blanca y verde? (Ingrese si o no)")

if (pedido1.toLowerCase() == "si") {
    carrito.push(remeraMBV);
    total = total + remeraMBV.precio;
    alert ("Se ha añadido el producto a su carro")
} else if (pedido1.toLowerCase() == "no") {
    alert ("No se ha añadido el producto a su carro")
} else if (pedido1.toLowerCase() != "si" || pedido1.toLowerCase() != "no") {
    alert ("Ingrese una respuesta válida")
}

let pedido2 = prompt("Desea comprar la gorra negra? (Ingrese si o no)")

if (pedido2.toLowerCase() == "si") {
    carrito.push(gorraN);
    total = total + gorraN.precio;
    alert ("Se ha añadido el producto a su carro")
} else if (pedido2.toLowerCase() == "no") {
    alert ("No se ha añadido el producto a su carro")
} else if (pedido2.toLowerCase() != "si" || pedido2.toLowerCase() != "no") {
    alert ("Ingrese una respuesta válida")
}

let pedido3 = prompt("Desea comprar la bolsa beige? (Ingrese si o no)")

if (pedido3.toLowerCase() == "si") {
    carrito.push(bolsaBe);
    total = total + bolsaBe.precio;
    alert ("Se ha añadido el producto a su carro")
} else if (pedido3.toLowerCase() == "no") {
    alert ("No se ha añadido el producto a su carro")
} else if (pedido3.toLowerCase() != "si" || pedido3.toLowerCase() != "no") {
    alert ("Ingrese una respuesta válida")
}

carrito.sort((a,b)=> a.precio - b.precio)

alert(`El total de su compra es $${total}`);
console.log(carrito);