function convertirFecha(fechaTexto) {
    const meses = {
      'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
      'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
      'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
    };
  
    if (!fechaTexto) return null;
  
    const partes = fechaTexto.toLowerCase().split('-');
    if (partes.length !== 3) return null;
  
    const dia = partes[0].padStart(2, '0');
    const mes = meses[partes[1]];
    let anio = partes[2];
  
    if (!mes) return null;
  
    // Asegurar formato YYYY
    anio = anio.length === 2 ? (parseInt(anio) > 50 ? '19' + anio : '20' + anio) : anio;
  
    return `${anio}-${mes}-${dia}`;
  }
  module.exports = convertirFecha; 