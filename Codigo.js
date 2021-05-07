
      //llama a una url que responde un objeto JSON en una función callback
      // realmente devuelve un código javascript
      // esta funcion devuelve una Promesa, que se ejecuta al recibir los datos

      const JSONP = (unique => url =>
        new Promise(rs => {
          const script = document.createElement('script');
          const name = `_jsonp_${unique++}`;

          if (url.match(/\?/)) {
            url += `&callback=${name}`;
          } else {
            url += `?callback=${name}`;
          }
          console.log(url);
          script.src = url;
          window[name] = json => {
            rs(json);
            script.remove();
            delete window[name];
          };
          document.body.appendChild(script);
        })
      )(0);

      // comprueba que no ha habido errores
      const checkSuccess = (json =>{
        console.log("checkSuccess: ",json);
          if(json.success) {
          //   console.log("-->  SUCCESS: "+json.message+" serverTimeout: "+json.serverTimeout );
              return Promise.resolve(json.data);}
          else {return  Promise.reject('Se ha producido un error (SUCCESS false) '+json.message);}
      })

      // composicion de la url del comando a partir de los argumentos
      const cmd_url = ((cmd,arg) =>{
        const gascript_url ="https://script.google.com/a/iesvaldebernardo.es/macros/s/AKfycbywcfCEBEab3_4wcMNJ89Bm2q3SBD2TrAiOTwWHaZ8/dev";
        var url = gascript_url+"?command="+cmd
        if (typeof(arg) !=="undefined") url = url+'&arg='+JSON.stringify(arg)
        console.log(url);
        return url;
        })

      // llamada a la API
      function APIcall(cmd,arg){
          return JSONP(cmd_url(cmd,arg)).then(checkSuccess);
}

function doPost(event){
  return responder(event)
}

function doGet(event){ 
  return responder(event)
}
function responder(event){
  
  //console.log("evento doGet: ", JSON.stringify(event));
  //parameter = event.parameter;
  //const {parameter} = event;
  //const {nombre, pais="Spain",formato="html"} = parameter;
  const { parameter:{FechadeFinalización, Descripción, Prioridad, Categoria, Asignatura}} = event;
  
  if(formato=="json"){
    miString = FechadeFinalización +Descripción +Prioridad +Categoria +Asignatura;
    return ContentService.createTextOutput(JSON.stringify(event) +"\n\n"+ miString)
    .setMimeType(ContentService.MimeType.JSON);
  }
  else if(formato=="htmlcreado") { 
    html = [
      "<h2> Probando GET creado </h2>",
      "<p>Hola ",FechadeFinalización, " de ",Descripción, Prioridad, Categoria, Asignatura, "</p>",   
    ].join("");
      return HtmlService.createHtmlOutput(html)
      .setTitle("Probando GET con AppScript") 
      }      
      else if (formato=="htmlDesdeArchivo"){
      return HtmlService.createTemplateFromFile("Formulario").evaluate();
      }
    };