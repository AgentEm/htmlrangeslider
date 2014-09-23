$(document).ready(function(){
	
	var $slider = $('input[type=range]');

	$slider.on("mousedown click", function() {
	    var $this = $(this);
	    $(this).val(parseInt(Math.round($this.val())));
	});

	$slider.on("touchend mousemove click", function(event){
	  $slider.hide().show(0);
        console.log(event);
	  if (event.which === 1 || event.which === 0){
	    var maxValue = $slider.prop('max');
	    var $this = $(this);
	    var rangeWidth = ($this.val() / maxValue * 100) + "%";
	    $('.range-fill').css("width", rangeWidth);
	  }
	});
});