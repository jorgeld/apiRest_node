'use strict';
const moment = require('moment');

function getComunidades(req, res){
    res.status(200).send({
        data : ['Andalucía', 'Aragón', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Ceuta', 'Comunidad Valenciana', 'Comunidad de Madrid', 'Extremadura', 'Galicia', 'Islas Baleares', 'La Rioja', 'Melilla', 'Navarra', 'País Vasco', 'Principado de Asturias', 'Región de Murcia' , 'Andorra']
    })
}

function getNombres(req, res){
    res.status(200).send({
        nombres: ['ANTONIO', 'JOSE', 'MANUEL', 'FRANCISCO', 'DAVID', 'JUAN', 'JOSE ANTONIO', 'JAVIER', 'JOSE LUIS', 'DANIEL', 'FRANCISCO JAVIER', 'JESUS', 'CARLOS', 'ALEJANDRO', 'MIGUEL', 'JOSE MANUEL', 'RAFAEL', 'PEDRO', 'MIGUEL ANGEL', 'ANGEL', 'JOSE MARIA', 'PABLO', 'FERNANDO', 'SERGIO', 'LUIS', 'JORGE', 'ALBERTO', 'JUAN CARLOS', 'JUAN JOSE', 'ALVARO', 'DIEGO', 'ADRIAN', 'RAUL', 'JUAN ANTONIO', 'ENRIQUE', 'IVAN', 'RAMON', 'RUBEN', 'VICENTE', 'OSCAR', 'ANDRES', 'JOAQUIN', 'JUAN MANUEL', 'SANTIAGO', 'EDUARDO', 'VICTOR', 'ROBERTO', 'MARIO', 'JAIME', 'FRANCISCO JOSE', 'IGNACIO', 'MARCOS', 'ALFONSO', 'SALVADOR', 'RICARDO', 'JORDI', 'EMILIO', 'GUILLERMO', 'JULIAN', 'GABRIEL', 'JULIO', 'HUGO', 'TOMAS', 'MARC', 'JOSE MIGUEL', 'AGUSTIN', 'GONZALO', 'MOHAMED', 'JOSE RAMON', 'FELIX', 'JOAN', 'NICOLAS', 'ISMAEL', 'CRISTIAN', 'MARTIN', 'SAMUEL', 'AITOR', 'JOSEP', 'JUAN FRANCISCO', 'MARIANO', 'DOMINGO', 'HECTOR', 'JOSE CARLOS', 'ALFREDO', 'SEBASTIAN', 'CESAR', 'IKER', 'FELIPE', 'JOSE ANGEL', 'JOSE IGNACIO', 'ALEX', 'VICTOR MANUEL', 'LUIS MIGUEL', 'RODRIGO', 'GREGORIO', 'JOSE FRANCISCO', 'JUAN LUIS', 'XAVIER', 'ALBERT', 'MARIA CARMEN', 'MARIA', 'CARMEN', 'JOSEFA', 'ANA MARIA', 'ISABEL', 'MARIA PILAR', 'MARIA DOLORES', 'MARIA TERESA', 'LAURA', 'ANA', 'CRISTINA', 'MARIA ANGELES', 'FRANCISCA', 'MARTA', 'ANTONIA', 'DOLORES', 'MARIA ISABEL', 'MARIA JOSE', 'LUCIA', 'MARIA LUISA', 'SARA', 'PAULA', 'ELENA', 'PILAR', 'CONCEPCION', 'RAQUEL', 'ROSA MARIA', 'MANUELA', 'MERCEDES', 'MARIA JESUS', 'ROSARIO', 'JUANA', 'TERESA', 'BEATRIZ', 'ENCARNACION', 'NURIA', 'JULIA', 'SILVIA', 'IRENE', 'MONTSERRAT', 'PATRICIA', 'ALBA', 'ROSA', 'ANDREA', 'ROCIO', 'MONICA', 'MARIA MAR', 'ANGELA', 'ALICIA', 'SONIA', 'SANDRA', 'MARINA', 'SUSANA', 'MARGARITA', 'YOLANDA', 'NATALIA', 'MARIA JOSEFA', 'MARIA ROSARIO', 'INMACULADA', 'EVA', 'MARIA MERCEDES', 'CLAUDIA', 'ANA ISABEL', 'ESTHER', 'NOELIA', 'ANGELES', 'VERONICA', 'CARLA', 'SOFIA', 'CAROLINA', 'NEREA', 'MARIA ROSA', 'MARIA VICTORIA', 'AMPARO', 'EVA MARIA', 'MARIA CONCEPCION', 'LORENA', 'MIRIAM', 'INES', 'ANA BELEN', 'VICTORIA', 'MARIA ELENA', 'MARIA ANTONIA', 'CATALINA', 'CONSUELO', 'LIDIA', 'MARIA NIEVES', 'DANIELA', 'CELIA', 'EMILIA', 'LUISA', 'GLORIA', 'OLGA', 'ALEJANDRA', 'AURORA', 'MARIA SOLEDAD', 'ESPERANZA', 'AINHOA', 'MARIA CRISTINA'],    })
}

function getNombresHombre(req, res){
    res.status(200).send({
        nombreshombre: ['ANTONIO', 'JOSE', 'MANUEL', 'FRANCISCO', 'DAVID', 'JUAN', 'JOSE ANTONIO', 'JAVIER', 'JOSE LUIS', 'DANIEL', 'FRANCISCO JAVIER', 'JESUS', 'CARLOS', 'ALEJANDRO', 'MIGUEL', 'JOSE MANUEL', 'RAFAEL', 'PEDRO', 'MIGUEL ANGEL', 'ANGEL', 'JOSE MARIA', 'PABLO', 'FERNANDO', 'SERGIO', 'LUIS', 'JORGE', 'ALBERTO', 'JUAN CARLOS', 'JUAN JOSE', 'ALVARO', 'DIEGO', 'ADRIAN', 'RAUL', 'JUAN ANTONIO', 'ENRIQUE', 'IVAN', 'RAMON', 'RUBEN', 'VICENTE', 'OSCAR', 'ANDRES', 'JOAQUIN', 'JUAN MANUEL', 'SANTIAGO', 'EDUARDO', 'VICTOR', 'ROBERTO', 'MARIO', 'JAIME', 'FRANCISCO JOSE', 'IGNACIO', 'MARCOS', 'ALFONSO', 'SALVADOR', 'RICARDO', 'JORDI', 'EMILIO', 'GUILLERMO', 'JULIAN', 'GABRIEL', 'JULIO', 'HUGO', 'TOMAS', 'MARC', 'JOSE MIGUEL', 'AGUSTIN', 'GONZALO', 'MOHAMED', 'JOSE RAMON', 'FELIX', 'JOAN', 'NICOLAS', 'ISMAEL', 'CRISTIAN', 'MARTIN', 'SAMUEL', 'AITOR', 'JOSEP', 'JUAN FRANCISCO', 'MARIANO', 'DOMINGO', 'HECTOR', 'JOSE CARLOS', 'ALFREDO', 'SEBASTIAN', 'CESAR', 'IKER', 'FELIPE', 'JOSE ANGEL', 'JOSE IGNACIO', 'ALEX', 'VICTOR MANUEL', 'LUIS MIGUEL', 'RODRIGO', 'GREGORIO', 'JOSE FRANCISCO', 'JUAN LUIS', 'XAVIER', 'ALBERT'],
    })
}

function getNombresMujeres(req, res){
    res.status(200).send({
        nombresmujeres: ['MARIA CARMEN', 'MARIA', 'CARMEN', 'JOSEFA', 'ANA MARIA', 'ISABEL', 'MARIA PILAR', 'MARIA DOLORES', 'MARIA TERESA', 'LAURA', 'ANA', 'CRISTINA', 'MARIA ANGELES', 'FRANCISCA', 'MARTA', 'ANTONIA', 'DOLORES', 'MARIA ISABEL', 'MARIA JOSE', 'LUCIA', 'MARIA LUISA', 'SARA', 'PAULA', 'ELENA', 'PILAR', 'CONCEPCION', 'RAQUEL', 'ROSA MARIA', 'MANUELA', 'MERCEDES', 'MARIA JESUS', 'ROSARIO', 'JUANA', 'TERESA', 'BEATRIZ', 'ENCARNACION', 'NURIA', 'JULIA', 'SILVIA', 'IRENE', 'MONTSERRAT', 'PATRICIA', 'ALBA', 'ROSA', 'ANDREA', 'ROCIO', 'MONICA', 'MARIA MAR', 'ANGELA', 'ALICIA', 'SONIA', 'SANDRA', 'MARINA', 'SUSANA', 'MARGARITA', 'YOLANDA', 'NATALIA', 'MARIA JOSEFA', 'MARIA ROSARIO', 'INMACULADA', 'EVA', 'MARIA MERCEDES', 'CLAUDIA', 'ANA ISABEL', 'ESTHER', 'NOELIA', 'ANGELES', 'VERONICA', 'CARLA', 'SOFIA', 'CAROLINA', 'NEREA', 'MARIA ROSA', 'MARIA VICTORIA', 'AMPARO', 'EVA MARIA', 'MARIA CONCEPCION', 'LORENA', 'MIRIAM', 'INES', 'ANA BELEN', 'VICTORIA', 'MARIA ELENA', 'MARIA ANTONIA', 'CATALINA', 'CONSUELO', 'LIDIA', 'MARIA NIEVES', 'DANIELA', 'CELIA', 'EMILIA', 'LUISA', 'GLORIA', 'OLGA', 'ALEJANDRA', 'AURORA', 'MARIA SOLEDAD', 'ESPERANZA', 'AINHOA', 'MARIA CRISTINA'],
    })
}

function getApellidos(req, res){
    res.status(200).send({
        apellidos: ['GARCIA', 'GONZALEZ', 'RODRIGUEZ', 'FERNANDEZ', 'LOPEZ', 'MARTINEZ', 'SANCHEZ', 'PEREZ', 'GOMEZ', 'MARTIN', 'JIMENEZ', 'RUIZ', 'HERNANDEZ', 'DIAZ', 'MORENO', 'MUÑOZ', 'ALVAREZ', 'ROMERO', 'ALONSO', 'GUTIERREZ', 'NAVARRO', 'TORRES', 'DOMINGUEZ', 'VAZQUEZ', 'RAMOS', 'GIL', 'RAMIREZ', 'SERRANO', 'BLANCO', 'MOLINA', 'MORALES', 'SUAREZ', 'ORTEGA', 'DELGADO', 'CASTRO', 'ORTIZ', 'RUBIO', 'MARIN', 'SANZ', 'NUÑEZ', 'IGLESIAS', 'MEDINA', 'GARRIDO', 'CORTES', 'CASTILLO', 'SANTOS', 'LOZANO', 'GUERRERO', 'CANO', 'PRIETO', 'MENDEZ', 'CRUZ', 'CALVO', 'GALLEGO', 'VIDAL', 'LEON', 'MARQUEZ', 'HERRERA', 'PEÑA', 'FLORES', 'CABRERA', 'CAMPOS', 'VEGA', 'FUENTES', 'CARRASCO', 'DIEZ', 'CABALLERO', 'REYES', 'NIETO', 'AGUILAR', 'PASCUAL', 'SANTANA', 'HERRERO', 'LORENZO', 'MONTERO', 'HIDALGO', 'GIMENEZ', 'IBAÑEZ', 'FERRER', 'DURAN', 'SANTIAGO', 'BENITEZ', 'MORA', 'VICENTE', 'VARGAS', 'ARIAS', 'CARMONA', 'CRESPO', 'ROMAN', 'PASTOR', 'SOTO', 'SAEZ', 'VELASCO', 'MOYA', 'SOLER', 'PARRA', 'ESTEBAN', 'BRAVO', 'GALLARDO', 'ROJAS'],
    })
}

function getPaises(req, res){
    res.status(200).send({
        paises: ["Afghanistan", "Albania", "Argelia", "Alemania", "American Samoa", "Andorra", "Angola", "Anguilla", "Antartida", "Antigua y Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia-Herzegovina", "Botswana", "Bouvet Island", "Brasil", "Brit Ind Ocean Territory", "Brunei Darussalm", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Canary Islands", "Cape Verde", "Caymen Islands", "Central African Rep", "Chad", "Chile", "China", "Christmas Islands", "Cocos Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Chipre", "Dem Rep. of Korea", "Dinamarca", "Djibouti", "Dominica", "East Timor", "Ecuador", "Egipto", "El Salvador", "Eritrea", "España", "Estados Unidos de America", "Estonia", "Etiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "Francia", "Guiana Francesa", "Polynesia Francesa", "French So. Territories", "Gabon", "Gambia", "Georgia", "Ghana", "Gibraltar", "Guinea Equatorial", "Grecia", "Greenland", "Grenada", "Guadalupe", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Heard, McDonald Island", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Inglaterra", "Iran", "Iraq", "Ireland", "Islas Filipinas", "Israel", "Italia", "Ivory Coast", "Jamaica", "Japon", "Jordan", "Kazakhistan", "Kenia", "Kiribati", "Korea del Norte", "Kuwait", "Kyrqyzstan", "Laos", "Lativa", "Libano", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia", "Maldivas", "Mali", "Malta", "Mariana Islands", "Marruecos", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montserrat", "Mozambique", "Myanmar", "Nambia", "Nauru", "Nepal", "Netherland Antilles", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue Island", "Norfolk Island", "Northern Mariana Island", "Norway", "OCE", "Oman", "Pacific Islands", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reino Unido", "Republica de Corea", "Republica Dominicana", "Reunion", "Romania", "Russian Federation", "Rwanda", "South Georgia Sandwich", "Saint Pierre Miguelon", "Samoa", "San Marino", "Sao Tomee and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierre Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somali Republic", "South Africa", "South Korea", "Sri Lanka", "St. Helena", "St. Kits-Nevis", "St. Lucia", "St. Vincent/Grenadines", "Sudan", "Suriname", "Svalbard Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokeelau", "Tonga", "Trinidad Tobago", "Tunisia", "Turquia", "Turkmenistan", "Turks Caicos Islands", "Tuvalu", "Uganda", "Ukrania", "United Arab Emirates", "Uruguay", "US Minor Outlying Is.", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands: British", "Virgin Islands: US", "Wallis Futuna Islands", "Western Sahara", "Western Samoa", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"],
    })
}

function getProvincias(req, res){
    res.status(200).send({
        provincias: ['Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
            'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
            'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
            'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
            'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']
    })
}


module.exports = {
    getComunidades,
    getNombres,
    getNombresHombre,
    getNombresMujeres,
    getApellidos,
    getProvincias,
    getPaises
};