


$(document).ready(function(){

    // 16:9 dimensions calculator
    $("input.high_definition").keyup(function () {
        var value = $(this).val();
        value *= 1;
        if(value != 0){
            var valueHeight = Math.round((value/16)*9);
        }else{
                valueHeight = 0;
        }

        $('.actual_dimensions').css('width',value + 'px').css('height',valueHeight +'px');
        $('.dimensions_holder').css('width',value + 'px');

        // append to defined inputs
        $('.this_height').val(valueHeight);

        // print to browser final widths and heights
        $('.final_height').text(valueHeight);
        $('.final_width').text(value);

    }).keyup();

    // 4:3 dimensions calculator
    $("input.standard_definition").keyup(function () {
        var value = $(this).val();
        value     *= 1;
        if(value != 0){
            var valueHeight = Math.round((value/4)*3);
        }else{
            valueHeight = 0;
        }

        $('.actual_dimensions').css('width',value + 'px').css('height',valueHeight +'px');
        $('.dimensions_holder').css('width',value + 'px');

        // append to defined inputs
        $('.this_height').val(valueHeight);

        // print to browser final widths and heights
        $('.final_height').text(valueHeight);
        $('.final_width').text(value);

    }).keyup();

    // aspect ratio calculator
    $("input#aspect_width, input#aspect_height").keyup(function () {
        // something
        return this(get_aspectRatio());
    }).keyup();
});


// Reset input fields
$('button.reset').on('click', function () {
    return this(reset_aspectRatio());
});

// Calculate Aspect Ratio
$('button.calculate').on('click', function () {
    return this(get_aspectRatio());
});

// Auto - calculate aspect ratios based given width
$('input#aspect_width').on('select', function() {
   return this(get_aspectRatio());
});

// Auto - calculate aspect ratios based given height
$('input#aspect_height').on('select', function() {
   return this(get_aspectRatio());
});

// Generate default Aspect Ratio Options
$('select.presets').on('change', function() {
    var optionSelected = $("option:selected", this);
    //var valueSelected = this.value;
    var valueSelected  = optionSelected.val();   // or $(this).val()
    var textSelected   = optionSelected.text();  // or $(this).text()

    w=0;
    h=0;
    val = valueSelected;
    if(val==1){
        w=320;
        h=240;
    }else if(val==2){
        w=640;
        h=360;
    }else if(val==3){
        w=854;
        h=480;
    }else if(val==4){
        w=1280;
        h=720;
    }else if(val==5){
        w=1920;
        h=1080;
    }else if(val==6){
        w=320;
        h=240;
    }

    var resTd=document.getElementById('msg_status');
        resTd.innerHTML = null;
    document.getElementById('aspect_height').value=h;
    document.getElementById('aspect_width').value=w;

    // Automatically calculate results if values are not empty!
    if(w != 0 && h != 0){
         get_aspectRatio();
    }
});



// Perform string validation
String.prototype.isNumber = function(){ return /^\d+$/.test(this); };

// Calculate the Aspect Ratios of given values
function get_aspectRatio(){

    var resTd = document.getElementById("msg_status");
        resTd.innerHTML = '';

    if( (!document.getElementById('aspect_width').value.isNumber()) || (!document.getElementById('aspect_height').value.isNumber()) ){

        resTd.innerHTML =
            " <div class='alert alert-warning fade in' role='alert'> Invalid width or height entered </div>";
        return;
    }

    var w=parseInt(document.getElementById('aspect_width').value);
    var h=parseInt(document.getElementById('aspect_height').value);

    if(h == 0 && w == 0){

        resTd.innerHTML =
            " <div class='alert alert-warning fade in' role='alert'> Please enter valid width and height values! </div>";
        return;
    }
    if(h == 0 && w != 0){

        resTd.innerHTML =
            " <div class='alert alert-warning fade in' role='alert'> Please enter a valid height value! </div>";
        return;
    }
    if(h!= 0 && w == 0){

        resTd.innerHTML =
            " <div class='alert alert-warning fade in' role='alert'> Please enter width </div>";
        return;
    }

    if(h == w){
        aspectRatio = '1 : 1';
    }else{
        var mode = null;
        if(h>w)
        {
            dividend  = h;
            divisor   = w;
            mode      ='potrait';
        }

        if(w>h){
            dividend   = w;
            divisor    = h;
            mode       = 'landscape';
        }

        var gcd = -1;
        while(gcd == -1){
            remainder = dividend%divisor;
            if(remainder == 0){
                gcd = divisor;
            }else{
                dividend  = divisor;
                divisor   = remainder;
            }
        }

        var hr         = w/gcd;
        var vr         = h/gcd;
        aspectRatio    = (hr + ' : ' + vr);

    }

    $('.screen_mode').text(mode);
    $('.final_aspect_ratio').text( aspectRatio );
    $('.final_width').text(w);
    $('.final_height').text(h);
    $('.final_dimensions').text(w + ' × ' + h);
}

function reset_aspectRatio(){
    var resTd=document.getElementById('msg_status');
        resTd.innerHTML = '';
    parseInt(document.getElementById("aspect_height").value = '0');
    parseInt(document.getElementById("aspect_width").value = '0');
}