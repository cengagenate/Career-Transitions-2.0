// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

(function($){


/* Add striping to selected element. 
 * Alternating class is "alt" 
 * Acts on odd numbered children
 */
 
$.fn.zebraMe = function() {
	return this.each(function(){
		var $me	=	$(this);
		$me.children(":odd").addClass("alt");
		/*
		$me.children().hover(function(){
			$(this).toggleClass("hover");
		});
		*/
	});
};
 
})(jQuery);



/*
 * INIT SCRIPTS
 */

$(document).ready(function() {
	// $("#questions").zebraMe();
	$("#questions").lazyQuiz({
		'height'				:	'200px',
		'dimFieldTextColor'		:	'#999999',
		'focusTextStyle'		:	'italic',
		'focusBoxBackground'	:	'white',
		'focusFieldZindex'		:	5,
		
		'progressBarWidth'		:	'200px',
		'progressBarHeight'		:	'20px',
		'progressBarColor'		:	'#cccccc',
		'progressBarLangPercent':	'% done'
		
		
	});
});