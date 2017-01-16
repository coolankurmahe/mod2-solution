(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);



ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCntroller = this;

  toBuyCntroller.tobuyItems = ShoppingListCheckOffService.gettoBuyItems();


  toBuyCntroller.buyItem = function (itemIndex) {

    ShoppingListCheckOffService.buyItem(itemIndex);

    var buylen = ShoppingListCheckOffService.gettoBuyLength();

    if(buylen == 0)
    toBuyCntroller.message = "Everything is bought!";
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCntroller = this;
  var boughtItems;
  boughtCntroller.message = "Nothing bought yet.";
  boughtCntroller.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  var boughtlen =ShoppingListCheckOffService.getBoughtLength();

  if(boughtlen != 0)
  boughtCntroller.message = "";


}


function ShoppingListCheckOffService() {

  var service = this;

  // List of tobuy and bought items
  var toBuyItems = [{name:"cookies", quantity:"10"}, {name:"shirts", quantity:"5"},
  {name:"maggie", quantity:"2"},{name:"chairs", quantity:"7"},
  {name:"wine", quantity:"4"}];

  var boughtItems =[];


  service.buyItem = function (itemIndex) {


    var item = toBuyItems[itemIndex];

    boughtItems.push(item);

    toBuyItems.splice(itemIndex, 1);

  };

  service.gettoBuyItems = function () {
    return toBuyItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
  service.gettoBuyLength = function () {
    return toBuyItems.length;
  };
  service.getBoughtLength = function () {
    return boughtItems.length;
  };
}

})();
