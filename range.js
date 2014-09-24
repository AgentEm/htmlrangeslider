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
        if (value === "0") {
            $(".label").css("color", "grey");
            $(".label:nth-child(1)").css("color", "#f36f21");
        } else if (value === "1") {
            $(".label").css("color", "grey");
            $(".label:nth-child(2)").css("color", "#f36f21");
        } else if (value === "2") {
            $(".label").css("color", "grey");
            $(".label:nth-child(3)").css("color", "#f36f21");
        } else if (value === "3") {
            $(".label").css("color", "grey");
            $(".label:nth-child(4)").css("color", "#f36f21");
        } else if (value === "4") {
            $(".label").css("color", "grey");
            $(".label:nth-child(5)").css("color", "#f36f21");
        } else if (value === "5") {
            $(".label").css("color", "grey");
            $(".label:nth-child(6)").css("color", "#f36f21");
        }
        if (lastChangeHandled !== value) {
            lastChangeHandled = value;
            console.log(value);
            var frac = value / max;
            var rangeWidth = (frac * 100) + "%";
            $('.range-fill').css({"width": rangeWidth, "min-width": "3%", "max-width": "98%"});
            $slider.hide().show(0);
        }
    }
    var lastSnap;

    function setLastSnap() {
        lastSnap = (new Date()).getTime();
    };
    setLastSnap();

    var touchRegexp = /^touch/;

    function syncValToXCreator(snap) {
        return function(event) {
            var epoch = (new Date()).getTime();
            var timeDiff = epoch - lastSnap;
            // We don't handle any move events for THIS NUMBER of milliseconds after a snap.
            // This is required because on iPad you get:
            //  touchEnd -> 300ms delay -> mouseMove
            var throttleMs = 400;
            if (timeDiff > throttleMs &&
                  (event.which === 1 || touchRegexp.test(event.type))) {

                var touchX = event.originalEvent.clientX || event.originalEvent.changedTouches[0].clientX;
                var frac = convertTouchXToFraction(touchX);
                var inputValue;

                inputValue = frac * max
                if (snap) {
                    inputValue = Math.round(inputValue);
                    setLastSnap();
                }

                $slider.val(inputValue);
                // jQuery does not trigger change for non-user interactions.
                changeHandler(event);
            }
        }
    }

    // Snap to closest value
	$slider.on("touchend mouseup click", syncValToXCreator("snap"));
    $(".label").on("touchend mouseup click", syncValToXCreator("snap"));

    // Modify range-fill as ball move.
	$slider.on("touchmove mousemove click", syncValToXCreator());
    $(".label").on("touchend mouseup click", syncValToXCreator("snap"));
});