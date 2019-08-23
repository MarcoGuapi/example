var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: '44vxt98wxqvxyt7q',
    publicKey: 'yz4n93cpzn32pt6x',
    privateKey: '25126a5269026e10ffa3751fce8ca1c2'
  });
router.post('/NONCE', function(req, res, next) {
 
  var nonceFromTheClient = req.body.paymentMethodNonce;
  var amount=req.body.valor;
  console.log(nonceFromTheClient);


  var newTransaction = gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

router.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
      res.send(response.clientToken);
    });
  });

  router.get("/hello",function(req,res){
        res.send("hello word");
  });

module.exports = router;