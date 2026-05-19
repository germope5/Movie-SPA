const arregloOriginal = [
  {
    aseguradora: 'AFIRME',
    cotizacion: {
      cliente: {
        tipoPersona: 'fisica',
        nombre: 'prueba',
        apellidoPat: 'prueba',
        apellidoMat: 'prueba',
        rfc: '',
        fechaNacimiento: '01-01-2005',
        ocupacion: '',
        curp: '',
        direccion: {
          calle: 'oriente 945',
          noExt: '410',
          noInt: '021',
          colonia: 'prueba',
          codPostal: '56618',
          poblacion: 'mexico',
          ciudad: 'cdmx',
          pais: 'mexico',
        },
        edad: '18',
        genero: 'MASCULINO',
        telefono: '',
        email: '',
      },
    },
  },
];

// 2. Copia profunda (Deep Copy)
const arregloCopia = structuredClone(arregloOriginal);

// 3. Modificaciones agrupadas en un objeto
const cambiosCliente = {
  nombre: 'Germán',
  rfc: 'MOPG960502XXX',
  email: 'german.mora@ahorra.io',
  fechaNacimiento: '02-05-1996',
  direccion: {
    calle: 'Jacobo Watt',
    noExt: '72',
    noInt: 'B1-402',
    colonia: 'San Simón Culhuacán',
    codPostal: '09800',
    poblacion: 'Iztapalapa',
    ciudad: 'Ciudad de México',
    pais: 'México',
  },
};

// 4. Aplicamos los cambios con spread operator (manteniendo inmutabilidad)
arregloCopia[0].cotizacion.cliente = {
  ...arregloCopia[0].cotizacion.cliente,
  ...cambiosCliente,
  direccion: {
    ...arregloCopia[0].cotizacion.cliente.direccion,
    ...cambiosCliente.direccion,
  },
};

// Función para imprimir arreglos
const imprimir = (titulo, arreglo) => {
  console.log(`\n=== ${titulo} ===`);
  console.log(JSON.stringify(arreglo, null, 2));
};


imprimir('ARREGLO ORIGINAL', arregloOriginal);
imprimir('ARREGLO COPIA (Modificado)', arregloCopia);
