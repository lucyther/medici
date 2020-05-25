const express = require('express');

// Creating an express app
var app = express();
app.use(express.static('public'));

// Set ejs as templating engine
// ejs looks into the 'views' folder for templates to render
app.set('view engine', 'ejs');

app.route('/wallet').get(function(req, res){
    res.render('wallet');
});

app.route('/wallet-pt').get(function(req, res){
  res.render('wallet-pt');
});

app.route('/wallet-cn').get(function(req, res){
  res.render('wallet-cn');
});

// Get the wallet address;
app.route('/wallet-address').get((req, res) => {
  const address = web3.eth.accounts.wallet[0].address;
  console.log("address: ", address)
  return res.send(address);
});

// Get the wallet's cETH balance
app.route('/wallet-balance/ceth/').get((req, res) => {
  console.log("Getting wallet cETH balance for address ", req.query.walletAddress)
  const myWalletAddress = req.query.walletAddress;

  cEthContract.methods.balanceOf(myWalletAddress).call().then((result) => {
    const cTokenBalance = result / 1e8;
    return res.send(cTokenBalance.toString());
  }).catch((error) => {
    console.error('[wallet-ctoken-balance] error: ', error);
    return res.sendStatus(400);
  });
});

// Get the amount of ETH supplied by the user
app.route('/protocol-balance/eth/').get((req, res) => {
  const myWalletAddress = req.query.walletAddress;

  cEthContract.methods.balanceOfUnderlying(myWalletAddress).call().then((balance) => {
    let balanceOfUnderlying = web3.utils.fromWei(balance).toString();
    console.log("getting amount of ETH supplied to Compound...")
    console.log("underlying eth: ", balanceOfUnderlying);
    return res.send(balanceOfUnderlying);
  }).catch((error) => {
    console.error('[wallet-token-balance] error: ', error);
    return res.sendStatus(400);
  })
})

// Get the amount of eth in user's wallet
app.route('/wallet-balance/eth').get((req, res) => {
  console.log("Getting wallet balance for address ", req.query.walletAddress)
  const myWalletAddress = req.query.walletAddress;
  web3.eth.getBalance(myWalletAddress).then((result) => {
    console.log('eth balance for wallet: ', result)
    const ethBalance = web3.utils.fromWei(result);
    return res.send(ethBalance);
  }).catch((error) => {
    console.error('[wallet-balance] error: ', error);
    return res.sendStatus(400);
  });
});

// NOTE: this is not being triggered currently. Done in the client
app.route('/supply/eth/:amount').get((req, res) => {
  const myWalletAddress = req.query.walletAddress;
  // const myWalletAddress = web3.eth.accounts.wallet[0].address;
  console.log("[supply] supplying " + req.params.amount + " from account " + myWalletAddress)

  if (isNaN(req.params.amount)) {
    console.log("bad input!")
    return res.sendStatus(400);
  }

  cEthContract.methods.mint().send({
    from: myWalletAddress,
    gasLimit: web3.utils.toHex(500000),
    gasPrice: web3.utils.toHex(20000000000),
    value: web3.utils.toHex(web3.utils.toWei(req.params.amount, 'ether'))
  }).then((result) => {
    return res.sendStatus(200);
  }).catch((error) => {
    console.error('[supply] error:', error);
    return res.sendStatus(400);
  });
});

// NOTE: this is not being triggered currently. Done in the client
app.route('/redeem/eth/:cTokenAmount').get((req, res) => {
  const myWalletAddress = req.query.walletAddress;
  console.log("amount to redeem: ", req.params.cTokenAmount)
  if (isNaN(req.params.cTokenAmount)) {
    return res.sendStatus(400);
  }

  cEthContract.methods.redeem(Math.floor(req.params.cTokenAmount * 1e8)).send({
    from: myWalletAddress,
    gasLimit: web3.utils.toHex(500000),
    gasPrice: web3.utils.toHex(20000000000),
  }).then((result) => {
    return res.sendStatus(200);
  }).catch((error) => {
    console.error('[redeem] error: ', error);
    return res.sendStatus(400);
  });
});

app.get('/', (req, res) => {
  let animals = [
    { name: 'Alligator' },
    { name: 'Crocodile' }
  ];
  res.render('home', { animals: animals });
});

app.get('/blog', (req, res) => {
  res.render('blog');
});

// Test code
app.get('/newAnimals', function (req, res) {
  console.log('replying with new animals!');
  let animals = [
      { name: 'Llama' },
      { name: 'Tiger' }
    ];
  return res.status(200).json(animals);
});

// Bind the application to the port on our machine
app.listen(process.env.PORT || 8080, () => {
  console.log(`API server started`)
})