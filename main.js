$(document).ready(function(){

    $("#openCarrito").click(function(){
        $("#carrito").css('opacity','1')
        $("#carrito").css('transform','scale(1)')
    })

    $("#closeCarrito").click(function(){
        $("#carrito").css('opacity','0')
        $("#carrito").css('transform','scale(0)')
    })
    
    $("#comprar").click(function(){
        $("#carrito").css('opacity','0')
        $("#carrito").css('transform','scale(0)')
        $("#compra-completada").css('opacity','1')
        $("#compra-completada").css('transform','scale(1)')
    })

    $("#closeCompra").click(function(){
        $("#compra-completada").css('opacity','0')
        $("#compra-completada").css('transform','scale(0)')
    })
})

const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const cartel = document.getElementById('compra-completada')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        rellenarCarrito()
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    accion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('items.json')
        const data = await res.json()
        rellenarCard(data)
        
    } catch (error) {
        console.log (error)
    }
}

const rellenarCard = data => {
    data.forEach(producto => {
        templateCard.querySelector('img').setAttribute("src", producto.img)
        templateCard.querySelector('#tipo').textContent = producto.tipo
        templateCard.querySelector('b').textContent = producto.title
        templateCard.querySelector('#color').textContent = producto.color
        templateCard.querySelector('#precio').textContent = producto.precio
        templateCard.querySelector('#btn').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('btn')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn').dataset.id,
        title: objeto.querySelector('b').textContent,
        tipo: objeto.querySelector('#tipo').textContent,
        precio: objeto.querySelector('#precio').textContent,
        cantidad: 1 
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    rellenarCarrito()
}

const rellenarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.title
        templateCarrito.querySelectorAll('td')[0].textContent = producto.tipo
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    rellenarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const rellenarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">No hay productos en su carrito</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const eliminarCarrito = document.getElementById('vaciar-carrito')
    eliminarCarrito.addEventListener('click', () => {
        carrito = {}
        rellenarCarrito()
    })

    const comprar = document.getElementById('comprar')
    comprar.addEventListener('click', () => {
        carrito = {}
        rellenarCarrito()
    })
}

const accion = e => {
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}

        rellenarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }

        rellenarCarrito()
    }

    e.stopPropagation()
}