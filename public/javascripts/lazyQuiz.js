(function($){

/* 
 * EASY ASSESSMENT PLUGIN  
 */

$.fn.lazyQuiz = function(options){    
	 
	// Merge defaults with options and apply
	return this.each(function() { 
		var $this			=		$(this);
		var $rows			=		$this.children();
		var $startTotal		=		$this.children().length;	       
		if(options){ 
			var settings = $.extend({}, $.fn.lazyQuiz.settings,options);						
			buildScrollContainer($this,settings);
			buildProgressBar($this,settings);
			formatRows($rows);
			initFocusQuestion($this);
		};
		
		$("a").click(function(){
			iterateRow($this,settings,$startTotal);
			$(this).addClass("pick");
		});
	});
};  

// Specify default settings
$.fn.lazyQuiz.settings = {
	'height' 				:	'300px',  
	'overflow' 				:	'hidden',  
	'color'					:	'#999999',
	'focusFieldZindex'		:	1,
	'progressBarWidth'		:	'500px',
	'progressBarHeight'		:	'50px',
	'progressBarColor'		:	'red',
	'progressBarLangPercent':	'percent'	
	
};


// Build the container for the list, allowing scrolling
function buildScrollContainer($this,settings,$focusRow,$choiceTemplate){
	var $viewportWidth		=	$this.width();
	var $focusFieldDims		=	$this.children("li").eq(1);
	$($this).wrap("<div id='viewport'>");
	$("#viewport").css({
		"height"	:	settings.height,
		"overflow"	:	settings.overflow,
		"width"		:	$viewportWidth
	}).prepend("<div id='focus_field'></div>");
	$("#focus_field").css({
		"height"	:	$focusFieldDims.height(),
		"width"		:	$focusFieldDims.width(),
		"position"	:	"absolute",
		"z-index"	:	settings.focusFieldZindex
	});
};


// Build the progress bar
function buildProgressBar($this,settings){
	$("#viewport").before("<div id='progress_bar'><span id='status'></span><span id='status_text'></span><div class='meter'></div></div>");
	$("#progress_bar").css({
		"width"		:	settings.progressBarWidth,
		"height"	:	settings.progressBarHeight
	});
	$("#progress_bar .meter").css({
		"height"	:	settings.progressBarHeight,
		"background":	settings.progressBarColor,
		"width"		:	0
	});
	$("#status").html(0);
	$("#status_text").html("&nbsp;" + settings.progressBarLangPercent);
};


// Format the rows on page load
function formatRows($this){
	$this.addClass("upcoming");
};


// Determine the first question and format it
function initFocusQuestion($this){
	var $focusQuestion	=	$this.children("li").eq(0);
	$($focusQuestion).removeClass("upcoming").addClass("focus").find("a").css({
		"display"	:	"block"
	});
};


// Iterate the list after each click
function iterateRow($this,settings,$startTotal){
	var $focusQuestion = findFocusQuestion($this);
	var $nextUpcoming  = $focusQuestion.next();
	$nextUpcoming.find("a").fadeIn(850);
	$focusQuestion.find("a").fadeOut(200);
	$focusQuestion.animate({
		"margin-top"	:	"-" + $focusQuestion.outerHeight() + "px"
	}, function(){
		$nextUpcoming.removeClass("upcoming").addClass("focus");
		$(this).detach();	
	});
	updateProgressBar($this,$focusQuestion.attr("id"),settings,$startTotal);
};

// Find the new focus after each click
function findFocusQuestion($this){
	var $focusQuestion	=	$this.children("li").eq(0);
	return $focusQuestion;
};

// Update the progress indicators after each click
function updateProgressBar($this,$latest,settings,$startTotal){
	var $remaining			=	$this.children().length - 1;
	var $newTotal			=	$startTotal - $remaining;
	var $percentComplete	=	1 - $remaining/$startTotal;
	var $progressBarWidth	=	$percentComplete * ($("#progress_bar").width());	
	$("#progress_bar .meter").animate({
		"width"	:	$progressBarWidth
	});
	$("#status").html(Math.round(100 * $percentComplete));
};
 
})(jQuery);