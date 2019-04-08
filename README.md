# Arquitectura-Web-TP
Trabajo Practico de Arquitectura Web 1 semestre 2019

Nombre del grupo: Arquitectura web Cuentas Corrientes
Integrantes: Febbroni Lucas - Macharé Nicolás
Negocio Elegido: Venta de productos online a traves de cuentas corrientes

Endpoints:

******************************************************************************************************************
/users
verbo: Get
errores:
-404 not found
descripcion: obtenes los datos de un usuario

/users
verbo: Post
errores:
-401 Unauthorized
-403 Forbidden
descripcion: crear un usuario

/users
verbo: put
errores:
-404 not found
-401 Unauthorized
-403 Forbidden
descripcion: actualizar datos de un usuario

/users
verbo: delete
errores:
-404 not found
descripcion: borrar un usuario
******************************************************************************************************************

/accounts
verbo: Get
errores:
-404 not found
descripcion: obtenes los datos de una cuenta

/accounts
verbo: Post
errores:
-401 Unauthorized
-403 Forbidden
descripcion: crear una cuenta corriente dentro del sistema

/accounts
verbo: Put
errores:
-401 Unauthorized
-403 Forbidden
-404 not found
descripcion: actualizar los datos de una cuenta

/accounts
verbo: Delete
errores:
-404 not found
descripcion: borrar una cuenta de una usuario


/accounts
verbo: List
errores:
-404 not found
descripcion: listar las cuentas de una usuario
******************************************************************************************************************

/items
verbo: Get
errores:
-404 not found
descripcion: obtener los items que un usuario presenta para vender

/items
verbo: Post
errores:
-401 Unauthorized
-403 Forbidden
descripcion: crear un items que un usuario presenta para vender

/items
verbo: put
errores:
-404 not found
-401 Unauthorized
-403 Forbidden
descripcion: actualizar los datos de los items que un usuario presenta para vender

/items
verbo: delete
errores:
-404 not found
descripcion: borrar un item que un usuario presenta para vender

/items
verbo: list
errores:
-404 not found
descripcion: listar los items que un usuario presenta para vender
******************************************************************************************************************

/sells
verbo: get
errores:
-404 not found
descripcion: mostrar el detalle de una ventas que un usuario realizo

/sells
verbo: list
errores:
-404 not found
descripcion: listar las ventas que un usuario realizo

/buys
verbo: get
errores:
-404 not found
descripcion: mostrar el detalle de una compra que un usuario realizo

/buys
verbo: list
errores:
-404 not found
descripcion: listar las compras que un usuario realizo

/tranfers
verbo: put
errores:
-404 not found
-401 Unauthorized
-403 Forbidden
descripcion: tranferir plata dentro del sistema de una cuenta a otra, del mismo usuario o entre usuarios
