import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {toHex} from 'ethereum-cryptography/utils'
function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    const address  = toHex(secp.getPublicKey(privateKey))
    setPrivateKey(privateKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        private key
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
        Address: {address.slice(0,10)}...
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
