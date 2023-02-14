const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const message = JSON.stringify({
  recipient: "049fd4c6ce31d89c3d7ff09d5aa965aae7560bb7c61ceb5c90ce26a259630a308ab0477ac630e79890bde3a6e2c52938380b0644dc57f1f4eff81d9a71bd5681a1",
  sendAmount: 10
})
const privateKey = "703bd0c6fce541daea5575c0eb046e19a3085a9a3188f770de16a6f1ec6e0344" //public key: 04561e0615f99073719c535022f34d1e52069322a8bd4d7bdff94ea585fa432fe4b1084a52e32f3a979a366cb2abdb6a848b4dba34b1c09b90fd85449b1f1fc5d4
const hashedMsg = keccak256(utf8ToBytes(message));
// console.log(hashedMsg);
// console.log(toHex(hashedMsg));
async function recover(){
  return signature= await secp.sign(hashedMsg , privateKey,{recovered: true})
}

// const sig = toHex(signature[0])
//    const recoveryBit = signature[1]
//    const publicKey =  secp.recoverPublicKey(hashedMsg,sig,recoveryBit)
//    console.log(toHex(publicKey))


console.log(recover())
