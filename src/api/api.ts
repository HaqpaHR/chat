const axios = require('axios');

export const  requestS = axios.get('https://ice.dating/get_data.js',
      {params: {mode: 'no-cors'}}
  )
  .then(function (response: any) {
    // handle success
    console.log(response);
  })
  .catch(function (error: any) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
