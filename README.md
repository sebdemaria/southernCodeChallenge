SOUTHERN CODE CHALLENGE:

- Pasos para instalarlo:

1. clonar proyecto
2. instalar dependencias: npm i
3. crear .env con las siguientes constantes (no commiteado como buena practica de seguridad):
    NEXT_PUBLIC_BASE_URL=https://api.nasa.gov/
    NEXT_PUBLIC_NASA_API_KEY=6l56mbcv6k2LLjKuiME5rtdyIYaXx1I4U6nABWdD
4. levantar proyecto: npm run dev

Se implementaron todos los requerimientos solicitados en el mail, inclusive los no requeridos. El guardado de los favoritos se realiza en el localstorage.
Al estar la api diseñada de manera que no se pueden obtener fotos individuales mediante ID la aplicacion del skeleton no pudo ser aplicada de la manera mas optima deseada, generandose un pequeño glitch de contenido entre que la request finaliza y la imagen termina de renderzarse, se intento la aplicacion del evento onLoadingComplete u onLoad para el render del skeleton sin exito, el glitch seguia presente. Debido a este el skeleton esta implementado durante el loading de la request.

El paginado fue aplicado con SWR, dandonos la posibilidad de cachear la respuesta de las paginas sin necesidad de realizar una nueva request al momento de volver a paginas ya recorridas.

Oportunidades de mejora:

- aplicacion de libreria para manejo de estados globales (Redux, mobX, etc.)
- implementacion de framework de CSS (tailwind, chakra ui, material ui, etc)
- mayor creacion de mixins para reducir el estilado de codigo repetitivo (se aplicaron algunos pero no fue 100% explotado el recurso)
- mayores casos de testing
