simpleCart({
checkout: {
type: "PayPal" ,
email: "zackrose-facilitator@gmail.com" ,

// use paypal sandbox, default is false
sandbox: true,

// http method for form, "POST" or "GET", default is "POST"
//method: "GET",

// url to return to on successful checkout, default is null
success: "http://localhost/beatles/store.php?directed=PayPal" ,

// url to return to on cancelled checkout, default is null
cancel: "http://localhost/beatles/cart.php?directed=PayPal"
},

cartStyle: "table",

cartColumns: [
    { attr: "name" , label: "Name" },
    { attr: "size" , label: "Size" },
    { attr: "price" , label: "Price", view: 'currency' } ,
    { view: "decrement" , label: false , text: "-" } ,
    { attr: "quantity" , label: "Qty" } ,
    { view: "increment" , label: false , text: "+" } ,
    { attr: "total" , label: "SubTotal", view: 'currency' } ,
    { view: "remove" , text: "Remove" , label: false }
]

});

var shippingRates = {
  Shirt: {USA_1: 5, USA_add: 3, World_1: 13, World_add: 5},
  Vinyl: {USA_1: 6, USA_add: 4, World_1: 15, World_add: 5},
  CD: {USA_1: 4, USA_add: 1, World_1: 10, World_add: 3},
  Patch: {USA_1: 1, USA_add: 1, World_1: 3, World_add: 1}
}

var shippingLocation = function(){
  //return getCookie("shippingLocation");
  return localStorage.getItem("shippingLocation");
};

var getHighestShippingRate = function()
{
  var highestRate=0;
  var highest="";

  itemTypes=getItemTypes();
  //console.log(itemTypes);
  $.each(shippingRates, function(i, item)
  {
    //console.log("i: "+i);
    if (itemTypes[i]>0)
    {
      //console.log("i in cartItems");
      if (item[shippingLocation()+"_1"] > highestRate)
      {
        highestRate = item[shippingLocation()+"_1"];
        highest = i;
      }
    }
  });

 //console.log("Highest Rate for " + shippingLocation() + ": " + highest +". Amount: "+highestRate);
return highest;


}

var getCartItems = function()
{
  var cartItems=[];
  simpleCart.each( function( item ){
    cartItems.push( {name:item.get("name"), quantity:item.get("quantity")} );
  });
//console.log(cartItems);
return cartItems;
}

var getItemTypes = function()
{
  var findtype = new RegExp(/\[([^)]+)\]/);
  var cartTypes={Shirt:0, Vinyl:0, CD:0, Patch:0};

  //var cartTypes={};

  var cartItems=getCartItems();
  //console.log(cartItems);

var matches;
  $.each(cartItems, function(i, item)
  {
    matches = findtype.exec(item["name"]);
    //console.log(item["name"] + " | " + matches);

    if (matches.length >0);
    {
      for (j = 0; j < item["quantity"]; j++)
      cartTypes[matches[1]]++;
    }
  });

return cartTypes;
  //console.log(cartTypes);
}


simpleCart.shipping(function(){

  if (simpleCart.quantity() ==0) { return 0; }

  var itemTypes = getItemTypes();

  var first = shippingLocation() + "_1";
  var additional = shippingLocation() + "_add";

  var total = 0;
  var highestRate = getHighestShippingRate();

  //console.log(itemTypes);
  //console.log(highestRate);

  $.each(itemTypes, function(i, item)
  {
    if (item > 0)
    {
      //console.log(item);
      //console.log("--total: "+ total);
      //console.log("Cart Qty: "+simpleCart.quantity());
      if (simpleCart.quantity() > 1)
      {
        if (i==highestRate)
        {
          total+=shippingRates[i][shippingLocation()+"_1"];
          total+=shippingRates[i][shippingLocation()+"_add"] * (item -1);
        }
        else {
          total+=shippingRates[i][shippingLocation()+"_add"] * item;
        }
      }
      else {
        //console.log("i: "+ i);
        //console.log("ship: " + shippingLocation()+"_1");
        //console.log("item qty: " + item );
        total=shippingRates[i][shippingLocation()+"_1"] * item;
      }
  }
  });

  return total;
});


$(document).ready(function(){

  if (localStorage.getItem("shippingLocation") === null) {
    localStorage.setItem("shippingLocation", "USA");
  }

  //$(".debug_action").click(simpleCart.shipping);

  $(".emptycart").click(function(){
    if (confirm("This will empty the cart. Are you sure?"))
    { simpleCart.empty(); }
  });


  $("#shippingLocation").val(shippingLocation());


  $("#shippingLocation").on("change", function(){
    var newLocation = $("#shippingLocation option:selected").text();

    localStorage.setItem("shippingLocation", newLocation);

    $("#simpleCart_shipping").text("$"+simpleCart.shipping().toFixed(2));
    $("#simpleCart_grandTotal").text("$"+simpleCart.grandTotal().toFixed(2));
  });


});
