# APLICACIÓN PARA RECONOCIMIENTO DE IMÁGENES DE CONTENEDORES

## Logex

Logex es una empresa exportadora de aguacates, limones, piñas y otras frutas exóticas. Las frutas son despachadas vía marítima en contenedores refrigerados. En promedio, mensualmente se carga en planta 240 contenedores.
La operación logística de una exportación marítima depende esencialmente de la gestión de los contenedores. Estos son propiedad de las navieras y cada exportador debe reservar cupos en los buques de carga para la asignación de los contenedores. Una vez confirmada reserva, el exportador por medio de su transportador terrestre debe retirar las unidades de carga en los patios de las navieras. 
Cada contenedor tiene un número único a nivel mundial, este número tiene una relevancia tanto operativa como legal. El número del contenedor debe ir en los documentos de despachos y aduaneros y de su correcta digitación depende la operación logística y aduanera tanto en el país exportador como importador.
Debido a la importancia de la gestión de los contenedores, Logex está en la búsqueda de un sistema para llevar control de los números de contenedores que ingresan a la planta a realizar los respectivos cargues de exportación. El objetivo principal de este sistema es reducir el riesgo de cometer errores en la documentación derivada principalmente por el número de contenedor y cumplir con estándares de seguridad tales como BASC (Business Alliance for Secure Commerce). 


## Azure Computer Vision REST API

CLIENTE: Aplicación en ambiente web desarrollada en JavaScript usando la librería React.js. Esta aplicación consiste en la toma de imágenes por medio de WebRTC, cargue de fotos locales o urls de fotos almacenadas. 
Azure Computer Vision REST API: La comunicación entre el cliente y la plataforma de Azure Cloud se realizará mediante REST api, la cual consiste en 2 endpoints:
-	[POST] https://logex-containers.cognitiveservices.azure.com/vision/v3.1/read/analyze?language=en
La anterior API devuelve una url denominada “operation-location”. La url devuelta se usará para obtener los datos de la imagen:
-	[GET] https://logex-containers.cognitiveservices.azure.com /vision/v3.1/read/analyzeResults/{operationId} 
