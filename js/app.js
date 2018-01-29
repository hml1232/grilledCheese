var playerScore = 0;

$(document).ready(function(){
//define player score variable starts at 0;

//on click of radio buttons
$('input[type=radio]').on('click', function(){
	//apply 'selected' class 
	$(this).addClass('selected');
	//target siblings
		//remove 'selected' class if they have it
	$(this).siblings().removeClass('selected');

	//grab the parent of the parent and get it's class
	var questionClass = $(this).parents().parents("div[class^='questionGroup'] ").attr('class');
	//and return the last character in the class
	var questionClassNumber = questionClass[13];
	//changing the last value of the class to be the NEXT questionGroup class
	var newQuestionGroup = '.questionGroup' + (parseInt(questionClassNumber) + 1);
	$(newQuestionGroup).show("fast");

	//on click of last question
	var grandParents = $(this).parents().parents().attr('class');
		//submit form
		if (grandParents == 'questionGroup6') {
			//show the overlay
			$('.main__formContainer').hide("fast", function() {
				$('.quizHeader').hide();
				$('.answerHeader').show();
				$('.answer').show("fast");
				$('body').css("background-color", "#F5A623");
			})
			//submit the form to process data
			$('form').submit();
		} // end of if statement
		$(this).parent().parent().css("background-color", "#D39124");
}); //end of radio.onClick

$('.backButton').on('click', function() {
	$(this).parent().parent().hide("fast");
	$(this).parent().parent().prev().css("background-color", "#F5A623");
}); //end of backButton.onClick

//on submit
$('.form').on('submit', function(e){
	//Grab the input with the class selected
	e.preventDefault();
	var selectedArray = $('.selected');

	playerScore = grabData();

// then take playersScore and pair it with a grilled cheese
	var gcChoice = grilledCheese[playerScore];


	//creating a title and adding it the screen
	var title = gcChoice.title;
	titleString = "<h4 class=\"grilledCheese__title\">\" " + title +" \"</h4>";

	$('.answer__gcTitleContainer').html(titleString);

	//finding the image and adding it the screen
	var image = gcChoice.img;
	var imageString = '<img class="imageContainer__image" src=" '+ image +' " alt="'+ title + ' grilled cheese sandwich."><button class="overlayButton"><img src="./assets/icons/infoIcon.svg"></button>';
	imageString += '<div class="image__infoOverlay"><h3>Ingredients</h3><h4>~ cheese ~</h4><p>' + gcChoice.cheese + '</p>';
	imageString += '<h4> ~ bread ~ </h4><p>' + gcChoice.bread + '</p>';
	imageString += '<h4> ~ toppings ~ </h4><p>' + gcChoice.toppings + '</p>';

	$('.answer__imageContainer').html(imageString);
	//finding the description and adding it to the screen
	var description = gcChoice.description;
	var descriptionString = '<p> '+ description +'</p>';
	$('.answer__description').html(descriptionString);


}); // end of onClick submit

$('.resetButton').on('click', function() {
	location.reload().fadeOut();
}) //end of resetButton.onClick

$('body').on('click', ".overlayButton", function() {
	console.log('button clicked!')
	$(".image__infoOverlay").toggle();
})


function grabData() {
	var scoreData = 0;
		//grab the radio button with the class selected
	$('.selected').each( function(){
		//take the data() from that radiobutton
		scoreData += $(this).data('score');
	}); //end of each.Selected
	//add data to player score
	console.log(scoreData);
	return scoreData;
}
});