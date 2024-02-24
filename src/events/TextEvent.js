const mcdata = require("minecraft-data")('bedrock_1.20.61');
/** @type {import("../../types/events/Event").Event} */
module.exports = {
  name: 'text',
  once: false,
  execute: async (params, client) => {
    let code = params.message.replace(/§[0-9a-fk-or]/gi, '').replace(/%/g, ''); 
    if (mcdata.language[code]) {
      let translatedMessage = mcdata.language[code];
    
      for (let i = 0; i < params.parameters.length; i++) {
        let placeholder = `%s`;
        translatedMessage = translatedMessage.replace(placeholder, params.parameters[i]);
      }
      
      console.log(translatedMessage);
    } else {
      console.log("No translation found for code:", code);
    }
  }
}
