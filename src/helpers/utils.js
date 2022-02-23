export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    // encodeing the key
    let encodedKey = encodeURIComponent(property); // user name=>user%name
    let encodedValue = encodeURIComponent(params[property]); // akash 122= >akash%122

    formBody(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&'); // eariler [username=akak,password=1233] after join it will be like username=akak&password=1233 and it is exact url encoded parameter
}
