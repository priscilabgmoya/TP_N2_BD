
# TP\_N2\_BD

## 📚 Descripción

Este repositorio contiene el Trabajo Práctico Nº2 de la materia **Bases de Datos Avanzados**, desarrollado utilizando **Node.js**, **Sequelize** como ORM y **MariaDB** como sistema de gestión de base de datos. El objetivo del proyecto es modelar, crear e interactuar con una base de datos relacional, aplicando buenas prácticas de diseño y normalización.

## 🧩 Contenido del Repositorio

* `models/`: Definición de modelos Sequelize que representan las entidades de la base de datos.
* `archivo/`: Archivos de migraciones para crear las tablas automáticamente.
* `config/`: Configuración de conexión a la base de datos (usuario, contraseña, host, etc.).
* `db.db.js`: Archivo principal para la conexión con MariaDB.
* `index.js`: Punto de entrada para ejecutar el proyecto.
* `README.md`: Documentación del proyecto.

## 🛠️ Tecnologías Utilizadas

* [Node.js](https://nodejs.org/)
* [Sequelize](https://sequelize.org/)
* [MariaDB](https://mariadb.org/)
* [dotenv](https://www.npmjs.com/package/dotenv) (para manejo de variables de entorno)

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/priscilabgmoya/TP_N2_BD.git
   cd TP_N2_BD
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con tus credenciales de base de datos:

   ```env
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tp_n2_bd
   DB_DIALECT=mariadb
   ```

4. Crea la base de datos en MariaDB:

   ```sql
   CREATE DATABASE tp_n2_bd;
   ```

5. Ejecuta las migraciones y los seeders:

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

6. Inicia el proyecto:

   ```bash
   node index.js
   ```

## 🔍 Consultas

En el archivo `consultas.js` se encuentran las consultas desarrolladas con Sequelize que permiten realizar operaciones como:

* Obtener registros específicos.
* Filtrar por atributos.
* Consultas con `include` (JOINs).
* Ordenamientos y agrupamientos.

## 📄 Licencia

Este proyecto se distribuye bajo la Licencia MIT.

## 👩‍💻 Autor

* **Priscila B. G. Moya** - [GitHub](https://github.com/priscilabgmoya)

---

¿Querés que lo adapte más al formato de algún TP que venís usando o lo deje así? También puedo generar un ejemplo de `.env`, migración o consulta si necesitás.
