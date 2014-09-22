$(document).ready(function(){
	
	var $slider = $('.slider');

	$slider.on("change click", function(event){
		event.preventDefault();
		$('.slider').hide().show(0);
		if (event.which === 1){
			var maxValue = $('.slider').prop('max');
			var $this = $(this);
			var rangeWidth = ($this.val() / maxValue * 100) + "%";
			$('.range-fill').css("width", rangeWidth);
		}
	});

	$slider.on("mouseup click", function() {
			var $this = $(this);
			$(this).val(parseInt(Math.round($this.val())));
	});
});

//mousedown is no b/c you need to click down and off before it renders
//mouseup is no b/c nothing changes until you unclick BUT this is also the closest to what we want
//change is no because it breaks it
//mousemove is no becuase the range-fill will just go wherever I put my mouse last
