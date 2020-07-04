var ambilday = new Date();
var dd = String(ambilday.getDate()).padStart(2, '0');
var mm = String(ambilday.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = ambilday.getFullYear();

export default ambilday = yyyy + mm + dd;