$(document).ready(function(){
	
	var $slider = $('input[type=range]');
    var max = parseInt($slider.attr('max'));
    var lastChangeHandled;
 
    function convertTouchXToFraction(touchX) {
        //Figure out where it will be on the slider
        var sliderOffset = $slider.offset();
        var normalizedX = touchX - sliderOffset.left;
        return normalizedX / $slider.width();
    }

    function changeHandler(event) {
        var value = $slider.val();
        console.log("change handled", value);
        if (lastChangeHandled !== value) {
            lastChangeHandled = value;
            var frac = value / max;
            var rangeWidth = (frac * 100) + "%";
            $('.range-fill').css("width", rangeWidth);
            $slider.hide().show(0);
        }
    }
    var lastSnap;

    function setLastSnap() {
        lastSnap = (new Date()).getTime();
    };
    setLastSnap();

    function syncValToXCreator(snap) {
        return function(event) {
            var epoch = (new Date()).getTime();
            var timeDiff = epoch - lastSnap;
            // We don't handle any move events for THIS NUMBER of milliseconds after a snap.
            // This is required because on iPad you get:
            //  touchEnd -> 300ms delay -> mouseMove
            var throttleMs = 400;
            console.log("timeDiff", timeDiff)
            if (timeDiff > throttleMs &&
                  (event.which === 1 || event.which === 0)) {

                console.log("move event", event)
                var touchX = event.originalEvent.clientX || event.originalEvent.changedTouches[0].clientX;
                var frac = convertTouchXToFraction(touchX);
                var inputValue;

                inputValue = frac * max
                if (snap) {
                    inputValue = Math.round(inputValue);
                    setLastSnap();
                }
                // console.log("syncing val", inputValue)
                $slider.val(inputValue);
                // jQuery does not trigger change for non-user interactions.
                changeHandler(event);
            }
        }
    }

    // Snap to closest value
	$slider.on("touchend mouseup click", syncValToXCreator("snap"));

    // $slider.on("mousemove", function(event){
    //     console.log("mouse moved", event);
    //     $slider.hide().show(0);
    // });
    // $slider.on("touchmove", function(event){
    //     console.log("touch moved", event);
    //     $slider.hide().show(0);
    // });

    // Modify range-fill as ball move.
	$slider.on("touchmove mousemove click", syncValToXCreator());
});