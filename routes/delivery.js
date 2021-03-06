const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

// Load User Model
require('../models/delivery');
const Del = mongoose.model('delivery');
const thisDel = new Del;

// User Login Route
router.get('/delivery', (req, res) => {
  res.render('/delivery');
});
router.get('/deliveryTracking', (req, res) => {

  var ID = req.query.id;
  var objID = mongoose.Types.ObjectId(ID);

    Del.findOne({_id:[objID]}, function(err, item) {
      if (!item || err) {
        req.flash('error_msg', 'Delivery ID Incorrect.');
        return res.redirect('back');
      }

      var trackDel = [];
      var elem = new Object();
      elem["streetName"] = item.streetName;
      elem["streetNum"] = item.streetNumber;
      elem["suburb"] = item.suburb;
      elem["postcode"] = item.postcode;
      elem["state"] = item.state;
      elem["date"] = item.DeliveryTime +  ' on the ' + item.DeliveryDate;

      trackDel.push(elem);
      if (trackDel.length > 0) {
      res.render('deliveryTracking', {delivery: trackDel});
      }
    });
});

var del4Date;

// Register Form POST
router.post('/delivery', (req, res) => {
  const newUser = new Del({
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    suburb: req.body.suburb,
    postcode: req.body.postcode,
    state: req.body.state
  });
  console.log(newUser.streetName);
  del4Date = newUser;
    res.redirect('/courier');

});


var xID;
router.post('/deliveryDT', (req, res) => {
  const newUser = new Del({
    streetNumber: del4Date.streetNumber,
    streetName: del4Date.streetName,
    suburb: del4Date.suburb,
    postcode: del4Date.postcode,
    state: del4Date.state,
    DeliveryDate: req.body.DeliveryDate,
    DeliveryTime: req.body.DeliveryTime
  });
  if (newUser.DeliveryDate != null) {
    var formDate;
    var today = new Date();
    if (newUser.DeliveryDate == 'Date+4') {
      formDate = ( today.getDate() + 4 ) + "/" + ( today.getMonth() + 1);
      newUser.DeliveryDate = formDate;
    }
    if (newUser.DeliveryDate == 'Date+3') {
      formDate = ( today.getDate() + 3 ) + "/" + ( today.getMonth() + 1);
      newUser.DeliveryDate = formDate;
    }
    if (newUser.DeliveryDate == 'Date+2') {
      formDate = ( today.getDate() + 2 ) + "/" + ( today.getMonth() + 1);
      newUser.DeliveryDate = formDate;
    }
    if (newUser.DeliveryDate == 'Date+1') {
      formDate = ( today.getDate() + 1 ) + "/" + ( today.getMonth() + 1);
      newUser.DeliveryDate = formDate;
    }
    if (newUser.DeliveryDate == 'Date+5') {
      formDate = ( today.getDate() + 5 ) + "/" + ( today.getMonth() + 1);
      newUser.DeliveryDate = formDate;
    }
  };
  newUser.save(function(err){
    xID = newUser._id;
    var payDel = [];
        var elem = new Object();
        elem["id"] = xID;
        payDel.push(elem);
        if (payDel.length > 0) {
        res.render('payment', {delivery: payDel});
        }
    del4Date = null;
 })
});

module.exports = router;
