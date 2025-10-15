const API_CLIENTES = 'http://localhost:3000/api/clientes';
const API_VENTAS = 'http://localhost:3000/api/ventas';

// Referencias del DOM
const formCliente = document.getElementById('formCliente');
const formVenta = document.getElementById('formVenta');
const tablaClientes = document.querySelector('#tablaClientes tbody');
const tablaVentas = document.querySelector('#tablaVentas tbody');
const selectCliente = document.getElementById('clienteVenta');

/* -------------------------------
   1️⃣ Registrar nuevo cliente
-------------------------------- */
formCliente.addEventListener('submit', async e => {
  e.preventDefault();

  const cliente = {
    nombre: formCliente.nombre.value,
    telefono: formCliente.telefono.value,
    correo: formCliente.correo.value
  };

  await fetch(API_CLIENTES, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(cliente)
  });

  formCliente.reset();
  cargarClientes(); // recargar tabla y select
});

/* -------------------------------
   2️⃣ Cargar todos los clientes
-------------------------------- */
async function cargarClientes() {
  const res = await fetch(API_CLIENTES);
  const clientes = await res.json();

  tablaClientes.innerHTML = '';
  selectCliente.innerHTML = '<option value="">Selecciona un cliente</option>';

  clientes.forEach(c => {
    // Mostrar en tabla
    const fila = `
      <tr>
        <td>${c.id}</td>
        <td>${c.nombre}</td>
        <td>${c.telefono}</td>
        <td>${c.correo}</td>
      </tr>
    `;
    tablaClientes.innerHTML += fila;

    // Agregar al select de ventas
    selectCliente.innerHTML += `<option value="${c.nombre}">${c.nombre}</option>`;
  });
}

/* -------------------------------
   3️⃣ Registrar nueva venta
-------------------------------- */
formVenta.addEventListener('submit', async e => {
  e.preventDefault();

  const venta = {
    cliente: selectCliente.value,
    producto: formVenta.producto.value,
    total: formVenta.total.value
  };

  await fetch(API_VENTAS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(venta)
  });

  formVenta.reset();
  cargarVentas();
});

/* -------------------------------
   4️⃣ Cargar todas las ventas
-------------------------------- */
async function cargarVentas() {
  const res = await fetch(API_VENTAS);
  const ventas = await res.json();

  tablaVentas.innerHTML = '';

  ventas.forEach(v => {
    const fila = `
      <tr>
        <td>${v.id}</td>
        <td>${v.cliente}</td>
        <td>${v.producto}</td>
        <td>$${v.total}</td>
        <td>${new Date(v.fecha).toLocaleString()}</td>
      </tr>
    `;
    tablaVentas.innerHTML += fila;
  });
}

/* -------------------------------
   5️⃣ Ejecutar al cargar la página
-------------------------------- */
window.onload = () => {
  cargarClientes();
  cargarVentas();
};