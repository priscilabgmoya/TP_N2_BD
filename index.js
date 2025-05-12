const fs = require('fs');
const Papa = require('papaparse');
const { sequelize } = require("./src/db/db.db.js");
const {addRegion} = require('./src/models/region.model.js');
const { connection } = require('./src/db/db.db.js');
const {addSector} = require('./src/models/sector.model.js');
const {addTipoAccion} = require('./src/models/tipoAccion.model.js');
const {addSeccion} = require('./src/models/seccion.model.js');
const {addGrupoFamilia} = require('./src/models/grupo_familia.model.js');
const {addFamilia} = require('./src/models/familia.model.js');
const {addSupermercado} = require('./src/models/supermecado.model.js');
const {addSubFamilia} = require('./src/models/sub_familia.model.js');
const {addArticulo} = require('./src/models/articulo.model.js');
const addVenta = require('./src/models/venta.model.js');
const convertirFecha = require('./src/ultis/fecha.utils.js');
let  data_no_load = []
const archivoCSV = fs.readFileSync('./src/archivo/tbloperaciones-mejora.csv', 'utf8');

Papa.parse(archivoCSV, {
  header: true,
  skipEmptyLines: true,
  complete: async function (results) {
    const {data} = results;
    await connection(); 
   await addData(data)
   console.table(data_no_load);
    
    
    
    
  }
});


const addData = async (data)=>{
  for (let index = 0; index < data.length; ) {
    const element = data[index];
    const transaction = await sequelize.transaction();

    const { REGION, COMPETENCIAS, SECTOR, SECCION, FAMILIA, SCANNING, DESDE, HASTA, MONTO } = element;
    const typeAction = element["TIPO DE ACCION"];
    const gFamilia = element["G-FAMILIA"];
    const subFamilia = element["SUB-FAMILIA"];
    const descripcionArt = element["DESCRIPCION + PACKAGIN"];
    const fechaCarga = element["FECHA DE CARGA"];
    try {
  
      const { data: dataRegion , error: errorRegion} = await addRegion({ descripcion: REGION }, { transaction });
      if(errorRegion) throw errorRegion
      const { data: dataSector , error: errorSector} = await addSector({ nombre: SECTOR }, { transaction });
      if(errorSector) throw errorSector
      const { data: dataTipo, error: errorTipo } = await addTipoAccion({ nombre: typeAction }, { transaction });
      if(errorTipo) throw errorTipo
      const { data: dataSeccion , error: errorSeccion} = await addSeccion({ nombre: SECCION, id_sector: dataSector.dataValues.id_sector }, { transaction });
      if(errorSeccion) throw errorSeccion
      const { data: dataGFamilia, error: errorGFamilia } = await addGrupoFamilia({ nombre: gFamilia, id_seccion: dataSeccion.dataValues.id_seccion }, { transaction });
      if(errorGFamilia) throw errorGFamilia
      const { data: dataFamilia, error: errorFamilia } = await addFamilia({ nombre: FAMILIA, id_gfamilia: dataGFamilia.dataValues.id_gfamilia }, { transaction });
      if(errorFamilia) throw errorFamilia
      const { data: dataSubFamilia, error: errorSubFamilia } = await addSubFamilia({ nombre: subFamilia, id_familia: dataFamilia.dataValues.id_familia }, { transaction });
      if(errorSubFamilia) throw errorSubFamilia
      const { data: dataArticulo, error: errorArticulo } = await addArticulo({ nombre: descripcionArt, codigo_barra: SCANNING, id_subfamilia: dataSubFamilia.dataValues.id_subfamilia }, { transaction });
      if(errorArticulo) throw errorArticulo
  
      const lastDash = COMPETENCIAS.lastIndexOf('-');
      const nombre = COMPETENCIAS.slice(0, lastDash).replaceAll('-', '');
      const codigo = COMPETENCIAS.slice(lastDash + 1);
      const { data: dataSuper, error: errorSuper } = await addSupermercado({ nombre: nombre, codigo: codigo, id_region: dataRegion.dataValues.id_region }, { transaction });
      if(errorSuper) throw errorSuper
  
      const venta = {
        fecha_carga: convertirFecha(fechaCarga),
        desde: convertirFecha(DESDE),
        hasta: convertirFecha(HASTA),
        id_region: dataRegion.dataValues.id_region,
        id_supermercado: dataSuper.dataValues.id_supermercado,
        id_tipo_accion: dataTipo.dataValues.id,
        id_articulo: dataArticulo.dataValues.id_articulo,
        monto: parseFloat(MONTO) || 0 
      };
  
      const { data: datVenta, error: errorVenta } = await addVenta({...venta}, { transaction });
      if(errorVenta) throw errorVenta
      await transaction.commit(); // ✅ Confirmamos la transacción
      // ✅ Si todo fue exitoso, eliminar el elemento del array
      data.splice(index, 1);
    } catch (err) {
      await transaction.rollback(); 
      data_no_load.push({descripcionArt, SCANNING}); 
      console.error('❌ Error al procesar el elemento:', err);
      index++; // avanzar al siguiente solo si hubo error
    }
  }

 
  
}