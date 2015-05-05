var crypto = require('crypto');
 
var secret = crypto.randomBytes(16),
    cipher = crypto.createCipheriv("aes128", secret,secret),
    decipher = crypto.createDecipheriv("aes128", secret,secret);
 
cipher.setAutoPadding(false);
decipher.setAutoPadding(false);
 var haha = {"operator" : "Tata Docomo GSM","my_num" : "8904765965","plan" : "LOCAL", "data" : [{ "local_intra_sec" : 0 , "local_inter_sec" : 0,"local_intra_minute" : 0 , "local_inter_minute" : 0},{  "std_intra_sec" : 11973 , "std_inter_sec" : 1778 , "std_inter_minute" : 0 ,"std_intra_minute" : 260}]};
var plaintext = JSON.stringify(haha);
console.log(plaintext);
var ciphertext = cipher.update(plaintext);
 
console.log("Cipher text is:");
console.log(ciphertext);
 
var deciphertext = decipher.update(ciphertext);
 
console.log("");
console.log("Deciphered text is:");
console.log(deciphertext)	;
