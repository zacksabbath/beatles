/********************** MERCH.PHP LOGIC ********************************

Here is all the JS code asociated with merch.php

*************************************************************************/



/********************************************************************\
*************************** FUNCTIONS ********************************
\********************************************************************/

/*********************************************************************
This function takes the JSON data provided by getmerch.php,
places it in the handlebars template,
and finally appends the data to the primaary section.
**********************************************************************/
var parseMerchData = function(result)
{
    $.each(result, function(idx, obj) {

        /* I'm a big fan of the tenary conditional operator.
        Here we are converting is_soldout from string to boolean.
        Otherwise the handlebars template will not read the value
        properly when performing conditional logic.
        */
        obj.is_soldout = obj.is_soldout == '1' ? true : false;

        //Compile Handlebars.js template
        var source   = $("#merch-template").html();
        var template = Handlebars.compile(source);
        var html    = template(obj);

        //Append data to the dom
        $(".merchandise").append(html);
    });
}

//This function filters merchitems based on the filter passed in
var filterMerchToggle = function(filter)
{
    var items = $('.merchitem.type-'+filter);
    items.fadeToggle(300);
    refreshSoldOutItems(false);  //Pass (false) so that we don't perform fade effect here
}

var filterMerchSelect = function(filter)
{
    var items = $('.merchitem.type-'+filter);
    var items_hide = $('.merchitem').not('.type-'+filter);
    items_hide.hide();
    items.fadeIn(300);

    refreshSoldOutItems(false);  //Pass (false) so that we don't perform fade effect here
}

/* Grab GET arguments passed into the URL */
var getGetArguments = function()
{
    var $_GET = {},
    args = location.search.substr(1).split(/&/);
    for (var i=0; i<args.length; ++i) {
        var tmp = args[i].split(/=/);
        if (tmp[0] != "") {
            $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
        }
    }
    return $_GET;
}



/******* Refresh Sold Out Items *******
Due to overlap of sold out items verses other types,
filtering sold out items was a bit tricky.

Basically this function runs whenever a filter update occurs.
That way if another filter brings out sold out items, and they
aren't supposed to be present, they will be immediately hidden
before the user sees them.

Also we do a quick check to see which item types are selected,
and remove the ones which are not.

The doFade boolean is passed because we only want the fade effect
to happen when a user actually clicks the button.

*************************************************/
var refreshSoldOutItems = function(doFade)
{
  /*
    var items = $('.merchitem.is_soldout');

    //Only perform fade effect if instructed to do so via doFade Boolean
    if ($('.merch').hasClass('show_soldout'))
    {
        doFade ? items.fadeIn(300) : items.show();
    }
    else
    {
        doFade ? items.fadeOut(300) : items.hide();
    }

    markVisibleItems(); //Set ".show" flag to current visible items
    items.not('.show').hide(); //remove items that are not visible
    unmarkVisibleItems(); //remove ".show" flag
    */
}

var markVisibleItems = function()
{
    //Get all Merch items
    var items = $('.merchitem');

    //Get set of currently visible items from toggle area
    var visibleTypes = $('.merchfilter.selected').map(function(){
        return $(this).data('filter');
    }).get();

    //Set ".show" flag to visible items
    //Later we will hide soldout items not part of current visible set
    $.each(visibleTypes, function(i, filter_type){
        items.filter('.type-'+filter_type).addClass("show");
    });
}


/*** Remove ".show" flag from visible items ***/
var unmarkVisibleItems = function()
{
    $('.merchitem').removeClass("show");
}

/*********************************************
This funciton is used to update toggle buttons
when a "select only" button is pressed
**********************************************/
var setToggleButtons = function(filter)
{
    items = $('.merchfilter[data-filter="'+filter+'"]');
    items_deselect = $('.merchfilter[data-filter!="'+filter+'"][data-filter!="soldout"]');

    items_deselect.removeClass("selected").removeClass("whitelink").addClass("blacklink");
    items.addClass("selected").addClass("whitelink").removeClass("blacklink");
}


/********************************************************************************
This function highlights a button and unsets all sibling buttons.
When the user clicks a given sort or select, only that button should be selected.
*********************************************************************************/
$.fn.selectButton = function()
{
    // "new" class is a flag to later set button to appropriate color
    // This prevents linkcolor from changing until mouse leaves button
    this.addClass("selected").addClass("new");

    //Set siblings to black (not selected)
    this.siblings().removeClass("selected").removeClass("whitelink").addClass("blacklink");
}

/***********************************************
This JQuery function toggles button color.
It is executed when the user clicks a filter button.
It does not affect its siblings.
************************************************/
$.fn.toggleButtonClasses = function()
{
    if (this.hasClass("new")) //Cursor hasn't left button before second click
    {
        this.toggleClass("whitelink").toggleClass("blacklink");
    }

    // "new" class is a flag to later set button to appropriate color on mouseLeave
    // This prevents linkcolor from changing until mouse leaves button
    this.toggleClass("selected").addClass("new");
}

$.fn.deselectButton = function()
{
    this.removeClass("whitelink").removeClass("selected").addClass("blacklink");
}

/*************************************************************************
This function is to allow an element to follow until the top of page.
(used for aside.merchoptions in this application)
*************************************************************************/
$.fn.followTo = function (pos, margin) {
    var $this = this,
        $window = $(window);  //make variables a bit more readable

    //check for window scroll position, if at top set to absolute, else set to fixed.
    $window.scroll(function (e) {
        if ($window.scrollTop() < pos) {
            $this.css({
                position: 'absolute',
                top: pos + margin
            });
        } else {
            $this.css({
                position: 'fixed',
                top: margin
            });
        }
    });
};




/********************************************************************\
********************** Event Handler Callbacks ***********************
\********************************************************************/

/******* Modal Functionality ****/
var openModal = function(e)
{
    e.preventDefault();  //We don't want the link to function normally

    var imgSrc = $(this).attr('href');

    /*
    Calculate both width and height,
    so that modal can center the window properly
    before the external image is loaded.

    The image size information is determined at the server side stage.
    */
    var imageheight = $(window).height() * .75;
    var imagewidth = Math.round(  imageheight * ( $(this).data("width") / $(this).data("height"))  );

    var modalcontent= '<img height="'+imageheight+ '" width="' + imagewidth + '"  src="'+ imgSrc +'"/>';

    modal.open({content: modalcontent});
}

var animateOnAdd = function(e){
  e.preventDefault();
  $('.cartHeader').hide();
  $('.cartHeader').fadeIn(1200);

  $(this).fadeOut(300,
    function(){
      $(this).fadeIn(300);
  });

}

/****** Sort Click Event - Callback *****/
var merchSort = function(e){

    e.preventDefault();

    var sort_value;
    var price=false; //If we are sorting based on price we need to change type from string to float
    var descend=false; //If price is descending will need to reverse sort comparison later on.

    //Use a switch to define sort_value and set flags.
    switch($(this).data("sort")) {
        case 'Name':
            sort_value=".info .title";
            break;
        case 'Type':
            sort_value=".info .type";
            break;
        case 'Price_Ascend':
            sort_value=".info .price";
            price=true;
            break;
        case 'Price_Descend':
            sort_value=".info .price";
            price=true;
            descend = true;
            break;
        default:
            break;
    }

    /*************************************************************************
    Took advantage of James Padolsey's extremely elegent sortElements function here.
    It appears to use a bubble sort or some other n^2 sorting algorithm, which is not ideal
    for large amounts of data, but makes up for it with it's extremely small code size.

    The actual sorting function passed in is very low level,
    so creating the sort parameter is totally customizable.

    The JS (included in merch.php) can be found here:
    http://james.padolsey.com/javascript/sorting-elements-with-jquery/
    *************************************************************************/
    $('.merchitem').sortElements(function(a, b){

        var a_value = $(a).find(sort_value).text();
        var b_value = $(b).find(sort_value).text();

        if(price) //convert strings to floats, so that they can be sorted properly
        {
            a_value = parseFloat(a_value);
            b_value = parseFloat(b_value);
        }

        if (!descend)
        {
            return a_value > b_value ? 1 : -1;
        }
        else //If we are sorting on descending price we must reverse sort comparison
        {
            return b_value > a_value ? 1 : -1;
        }
    });

    $(this).selectButton(); //Highlight button and deselect siblings
}



/****** Filter Click Event - Callback *****/
var merchFilter = function (e)
{
    e.preventDefault();

    $(this).toggleButtonClasses();

    var filter = $(this).data("filter");

    if (filter === "soldout") //Special logic for the soldout button
    {
        $('.merch').toggleClass("show_soldout");
        refreshSoldOutItems(true); //Perform fade effect here, since user clicked the button
    }
    else
    {
        filterMerchToggle(filter);
        $(".merchselect").deselectButton(); //deselect "select only" section button
    }

}

/****** Select Click Event - Callback *****/
var merchSelect = function (e)
{
    e.preventDefault();

    $(this).selectButton();

    var filter = $(this).data("filter");

    setToggleButtons(filter);

    filterMerchSelect(filter);
}

/************************************************************************************
These two mouseleave events are included due to an awkward issue with the buttons:

Black buttons are white on hover, and white buttons are black on hover.

When the user selects a button, if the button switches immediately,
it is in the hover state of the button it switched to,
so it appears to the user that the button did not respond.

The solution I found was to not update button color until mouse leaves button.
This is why we use the "new" class as a flag to make this happen.

In the end it looks a lot smoother and less awkward that an instant toggle.
*************************************************************************/

var toggle_mouseleave = function (e)
{
    $(this).removeClass("new").toggleClass("whitelink").toggleClass("blacklink");
}

var select_mouseleave = function (e)
{
    $(this).removeClass("new").addClass("whitelink").removeClass("blacklink");
}




/*********** Main Code ***********/
$(document).ready(function(){

    //Don't let aside past top of main area
    $('aside.merchoptions').followTo(295,20);

    //Grab JSON data from getmerch.php
    $.ajax(
    {
        dataType: "json",
        url: "getmerch.php",
        success: function(result)
        {
            parseMerchData(result); //on success, parse data and display on page
            refreshSoldOutItems(false); //Sold Out Items are hidden by default, refresh them on page load.

            /****** Bind Click Events *****/
            $('a.itemdetail').click(openModal);
            $('a.merchsort').click(merchSort);
            $('a.merchfilter').click(merchFilter);
            $('a.merchselect').click(merchSelect);

            /******* Delegate Mouseleave Events ******\
            (These must be delegated because the "new"
            class is added dynamically later on)
            ******************************************/
            /*
            $('.merchoptions').on('mouseleave','.merchselect.new',select_mouseleave);
            $('.merchoptions').on('mouseleave','.merchfilter.new',toggle_mouseleave);
            $('.merchoptions').on('mouseleave','.merchsort.new',select_mouseleave);
*/
            $('.item_add').on('click',animateOnAdd);

            $('.merchoptionsnew').on('mouseleave','.merchselect.new',select_mouseleave);
            $('.merchoptionsnew').on('mouseleave','.merchfilter.new',toggle_mouseleave);
            $('.merchoptionsnew').on('mouseleave','.merchsort.new',select_mouseleave);
            /** Select Specific Type from dropdown link **/
            var $_GET = getGetArguments();

            /*****************************************************************************
            If "type" was passed into the URL, simulate a click of the requested button.
            If the type is invalid, nothing will be selected and thus page will behave normally.
            ************************************************************************/
            if ($_GET['type'])
            {
                var selectedButton=$('a.merchselect[data-filter="'+ $_GET['type'] +'"]');
                selectedButton.trigger('click').trigger('mouseleave');
            }

        },
        error: function(xhr, ajaxOptions, thrownError)
        {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
});



Handlebars.registerHelper('splitoptions', function(options) {
  //console.log(options);
  var optionlist = options.split("|");
  //console.log(optionlist);

  if (optionlist.length > 0)
  {
    var optionselect='<select class="c-select select-item item_size">';
    $.each(optionlist, function(i, val)
    {
      optionselect+='\n<option value="'+val+'">'+val+'</option>\n'
    });
    optionselect+='\n</select>';
    return optionselect;
  }
  else {
    return "";
  }
});

/*
Handlebars.registerHelper("splitString", function(context, options){
    if(context){
      var ret = "";

      var tempArr = context.trim().split(options.hash["delimiter"]);

      for(var i=0; i < tempArr.length; i++)
      {
        ret = ret + options.fn(tempArr[i]);
      }

      return ret;
    }
  });*/
