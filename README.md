# Arquitectura-Web-TP
Trabajo Practico de Arquitectura Web 1 semestre 2019

Nombre del grupo: Arquitectura web Cuentas Corrientes
Integrantes: Febbroni Lucas - Macharé Nicolás
Negocio Elegido: Venta de productos online a traves de cuentas corrientes

Endpoints:

******************************************************************************************************************
/users?<user ID>
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

/users?<user ID>
verbo: put
errores:
-401 Unauthorized
-404 not found
descripcion: actualizar datos de un usuario

/users?<user ID>
verbo: delete
errores:
-404 not found
descripcion: borrar un usuario
******************************************************************************************************************

/accounts?<account ID>
verbo: Get
errores:
-404 not found
descripcion: obtenes los datos de una cuenta

/accounts?<user ID>
verbo: Post
errores:
-401 Unauthorized
-403 Forbidden
descripcion: crear una cuenta corriente dentro del sistema

/accounts?<account ID>
verbo: Put
errores:
-401 Unauthorized
-403 Forbidden
-404 not found
descripcion: actualizar los datos de una cuenta

/accounts?<account ID>
verbo: Delete
errores:
-404 not found 
-401 Unauthorized
-403 Forbidden
descripcion: borrar una cuenta de una usuario

/accounts?<user ID>
verbo: List
errores:
-404 not found
descripcion: listar las cuentas de una usuario
  
******************************************************************************************************************

/loads?<user email>&<user password>&<load id>
verbo: Get
errores:
-404 not found
descripcion: obtenes los datos de una cuenta

/loads?<user email>&<account alias>&<amount>
verbo: Post
errores:
-401 Unauthorized
-403 Forbidden
descripcion: crear una cuenta corriente dentro del sistema
  
******************************************************************************************************************

/items?<item ID>
verbo: Get
errores:
-404 not found
descripcion: obtener los items que un usuario presenta para vender

/items?<user ID>
verbo: Post
errores:
-401 Unauthorized
-403 Forbidden
descripcion: crear un items que un usuario presenta para vender

/items?<item ID>
verbo: put
errores:
-404 not found
-401 Unauthorized
-403 Forbidden
descripcion: actualizar los datos de los items que un usuario presenta para vender

/items?<item ID>
verbo: delete
errores:
-404 not found
-401 Unauthorized
-403 Forbidden
descripcion: borrar un item que un usuario presenta para vender

/items?<user ID>
verbo: list
errores:
-404 not found
descripcion: listar los items que un usuario presenta para vender
******************************************************************************************************************

/sells?<sell ID>
verbo: get
errores:
-404 not found
descripcion: mostrar el detalle de una ventas que un usuario realizo

/sells?<user ID>
verbo: list
errores:
-404 not found
descripcion: listar las ventas que un usuario realizo
******************************************************************************************************************

/buys?<buy ID>
verbo: get
errores:
-404 not found
descripcion: mostrar el detalle de una compra que un usuario realizo

/buys?<user ID>
verbo: list
errores:
-404 not found
descripcion: listar las compras que un usuario realizo
******************************************************************************************************************

/tranfers?<user ID>&<account ID>&<user ID>&<account ID>
verbo: put
errores:
-404 not found
-401 Unauthorized
-403 Forbidden
descripcion: tranferir plata dentro del sistema de una cuenta a otra, del mismo usuario o entre usuarios
