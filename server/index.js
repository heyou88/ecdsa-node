const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0406e17a79b9935b5b860f700b151c9047ab4f050eafa4bd060bb897696400be0226f3400d06d0f551e30b125dee0e20e94faefa5fe97267263123c618a54a1454": 1000, //private:a15a1b46365d08cb0cb468784a965828f1c8eac50c769bfb5caefda89576744a
  "04561e0615f99073719c535022f34d1e52069322a8bd4d7bdff94ea585fa432fe4b1084a52e32f3a979a366cb2abdb6a848b4dba34b1c09b90fd85449b1f1fc5d4": 50,  //private:  703bd0c6fce541daea5575c0eb046e19a3085a9a3188f770de16a6f1ec6e0344
  "049fd4c6ce31d89c3d7ff09d5aa965aae7560bb7c61ceb5c90ce26a259630a308ab0477ac630e79890bde3a6e2c52938380b0644dc57f1f4eff81d9a71bd5681a1": 75, //private: 51865c9d2252671168dbeabcb2bab67d51a3d4ca1bf14031a1e4e6085cce0fd6
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODO:  get a signature from client side application

  // recover the public address from the signature
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
