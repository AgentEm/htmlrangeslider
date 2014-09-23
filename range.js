$(document).ready(function(){
	
	var $slider = $('input[type=range]');
 
    function convertTouchXToFraction(touchX) {
        //Figure out where it will be on the slider
        var sliderOffset = $slider.offset();
        var normalizedX = touchX - sliderOffset.left;
        return normalizedX / $slider.width();
    }


    function setRangeFill(event) {
        console.log("setRangeFill, val is", $slider.val());
        $slider.hide().show(0);
        if (event.which === 1 || event.which === 0){
            var touchX = event.originalEvent.changedTouches[0].clientX;
            var frac = convertTouchXToFraction(touchX);
            var rangeWidth = (frac * 100) + "%";
            $('.range-fill').css("width", rangeWidth);
            $(this).val(frac * stepCount);

        }
    }

    function ohSnap(event) {
        $slider.hide().show(0);

        // Get the max
        if(event.type === 'touchend') {
            //Get the touch location
            var touchX = event.originalEvent.changedTouches[0].clientX;
            var frac = convertTouchXToFraction(touchX);

            inputValue = Math.round(frac * stepCount);
        }
        console.log("snap setting input", inputValue)
        $(this).val(inputValue);
        setRangeFill(event);
    }

    var stepCount = parseInt($slider.attr('max'));
    // Snap to closest value
	$slider.on("touchend mousedown click", ohSnap);

    // $slider.on("mousemove", function(event){
    //     console.log("mouse moved", event);
    //     $slider.hide().show(0);
    // });
    // $slider.on("touchmove", function(event){
    //     console.log("touch moved", event);
    //     $slider.hide().show(0);
    // });

    // Modify range-fill as ball move.
	$slider.on("touchmove mousemove click", setRangeFill);
});