export const processWebHook = async (request, response) => {
  if (request.params) {
    console.log('request params:', request.params);
  }
  if (request.body) {
    console.log('request body:', request.body);
  }
  response.send({success: true});
}