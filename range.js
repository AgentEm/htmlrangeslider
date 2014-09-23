$(document).ready(function(){
	
	var $slider = $('input[type=range]');
 
	$slider.on("touchend mousedown click", function(event) {
	    var $this = $(this);
        var inputValue = parseInt(Math.round($this.val()));
        // Get the max
        if(event.type === 'touchend') {
            var max = parseInt($slider.attr('max'));
            //Get the touch location
            var touchX = event.originalEvent.changedTouches[0].clientX;
            //Figure out where it will be on the slider
            var sliderOffset = $slider.offset();
            touchX = touchX - sliderOffset.left;
           
            var intervals = Math.round($slider.width() / (max + 1));
            var value = Math.floor(touchX / intervals);
            inputValue = value;
        }
       
    	$(this).val(inputValue);
        
	});
    $slider.on("change", function(event){
        console.log("moved", event);
        $slider.hide().show(0);
    });

	$slider.on("touchend mousemove click", function(event){
	  if (event.which === 1 || event.which === 0){
	    var maxValue = $slider.attr('max');
	    var $this = $(this);
	    var rangeWidth = ($this.val() / maxValue * 100) + "%";
	    $('.range-fill').css("width", rangeWidth);
	  }
	});
});