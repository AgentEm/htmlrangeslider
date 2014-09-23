$(document).ready(function(){
	
	var $slider = $('input[type=range]');

	$slider.on("touchend mousedown click", function() {
	    var $this = $(this);
	    $(this).val(parseInt(Math.round($this.val())));
	});

	$slider.on("touchend mousemove click", function(event){
	  $slider.hide().show(0);
	  if (event.which === 1){
	    var maxValue = $slider.prop('max');
	    var $this = $(this);
	    var rangeWidth = ($this.val() / maxValue * 100) + "%";
	    $('.range-fill').css("width", rangeWidth);
	  }
	});
});
