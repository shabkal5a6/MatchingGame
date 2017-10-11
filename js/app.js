/*
 * Create a list that holds all of your cards
 */

var cards, deck; 	// take value of card class and deck class
var cardsArray = [];	// will contain the original arrangment of cards
var shuffeledArray = []; 	// will contain the shuffeled arrangment of cards
var nShArray = [];
var check = [];
var clicks = 0;		// count number of clicks
var compare = [];	//will take the selected cards to be compared 
var checking = false;	// used to be true while comparing the selected cards which take 500 ms
var moveCounter = 0, matched =0;		//count number of moves which present 2 clicks, // count number of matched cards
var star, halfStar, restart_button;		// used to hold classes star, halfstar, restart
var time = '0:0:00';

/**
* @description Represents jquery function
* @constructor
* no params
*/
$(document).ready(function () {
    

cards = $('.card');
deck = $('.deck');
star = $('#s');
restart_button = $('.restart');
//game_start_time();


$('.score-panel').css("font-size",24);

$('.score-panel').append('<span class=time-played>'+time+'</span>');

time = GameTimer();

cards.each(function(){		// used to add the elements of object cards into cardsArray in order to be shuffled
	cardsArray.push($(this).children());
});
console.log(cards.children().text());

shuffeledArray = shuffle(cardsArray);	// used to shuffle elements 
shuffeledArray.forEach(function(index){ 	// the elements of shuffledArray will be add to another array
	nShArray.push(index[0]);	//in order to add only the required element
	
});


cards.each(function (index) {		// will remove all cards and add the new shuffled cards
	$(this).children().remove();
	$(this).append(nShArray[index]);
});



cards.on('click',function(){	// executed when click on one card occur
	
		if(!checking ){		//if the code is checking previous selection, it won't allow for another click 
			
			if($(this).attr('class')!='card open show' && $(this).attr('class')!='card match'){	//to prevent user from choosing same selected card or a matched card
				
				$(this).attr('class','card open show');	
				$(this).css('animation-name','rotate-open');

				clicks += 1;



				if(clicks == 2){	// two cards are selected

					moveCounter+=1;
					$('.moves').text(moveCounter);
					checking  = true;	//to block clicking  another card 
			
					setTimeout(function() {
  					//below code to be executed after 500 mili second, which allow user to see what selected cards contain

						cards.each(function(){		//for each clicked card
							if($(this).attr('class')=='card open show'){		//check which of the cards are open
								compare.push($(this).children().attr('class'));		//add string of the class name
								
									/*$(this).css('animation-duration','0.5s');*/
							}

						});
						if(compare[0] == compare[1]){		// compare the two selected cards, if same make it match 
							cards.each(function(){
								if($(this).attr('class')=='card open show'){		
									$(this).attr('class','card match');
									$(this).css('animation-name','correct');

									matched +=1;
								}
								clicks = 0;
								compare.length = 0		// remove elements in compare array for next selection

							});
						}
						else{
							cards.each(function(){		// if not same, close the cards
								if($(this).attr('class')=='card open show'){
									$(this).css('animation-name','wrong');
									$(this).css('animation-duration','0.3s');
									check.push($(this).attr('class'));
									setTimeout(function() { 
										/*console.log('check');
										cards.children().find(check[0]).attr('class','card');
										cards.children().find(check[1]).attr('class','card');
										check.length = 0;*/
										cards.each(function(){
											if($(this).attr('class')=='card open show'){
												$(this).attr('class','card');
											}
										})
											
										
										
       
     								}, 300);
									
								}
								clicks = 0;
								compare.length = 0

							});
						}

			

						if(matched >= 16 ){			//if user got all cards match, which are 16 cards, winning display will be shown
				
							cards.remove();
				
							deck.append('<li class=card><i id=win>You Win!</i></li>');
						
							var n =time_value;
							const final_time = time;
							$('.time-played').remove();
							deck.append('<li class=card><i id=mark>'+ moveCounter + ' moves in '+n+'</i></li>');
				
				
				
							if(moveCounter<=14){		// to set how many stars user got at the end
								deck.append('<li class=card><i class="fa fa-star"></i>'+'<i class="fa fa-star"></i>'+'<i class="fa fa-star"></i>');
							}
							else if(14<moveCounter && moveCounter<=20){
								deck.append('<li class=card><i class="fa fa-star"></i>'+'<i class="fa fa-star"></i>');
							}
							else if(20<moveCounter){
								deck.append('<li class=card><i class="fa fa-star"></i>');
							}
							deck.append('</li>');

							deck.append('<li class=card style="background-color:black"><i id=restart>Play Again!</i></li>');


							deck.css('justify-content',' space-around');	// modify css code
							$('#win').css("font-size" , 48);
							$('#mark').css("font-size", 27);
							$('.card').css('width',400);
							$('.card').css('font-size',50);
							$('#restart').css('font-size',30);
							
							$('#restart').on('click',function(){ 		// for new restart button at the end
								location.reload();
							});


						}

				
		
				

					
				

			
						checking = false;	// end of processing, now user able to select again
						},500);	
								// 500 ms delay time, to show the user what he selected
				}		


				if(moveCounter<=14){		// set stars in the score panel while playing
					;
				}
				else if(14<moveCounter && moveCounter<=20){
					$('.stars').children().remove();$('.stars').append('<i class="fa fa-star"></i>');$('.stars').append('<i class="fa fa-star"></i>');
				}
				else if(20<moveCounter){
					$('.stars').children().remove();$('.stars').append('<i class="fa fa-star"></i>');
				}


				
			
			}
		}
});




restart_button.click(function(){		// for refresh button
	location.reload();
});


});





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
* @description calculate time taken 
* @source udacity reviewer
*/
function GameTimer(){
	const game_start_time = new Date().getTime();

	timer = setInterval(function(){

		let current_time = new Date().getTime();
		let current_time_played = current_time - game_start_time;
		let hrs = Math.floor((current_time_played % (1000*60*60*24))/(1000*60*60));
		let mins = Math.floor((current_time_played % (1000*60*60))/(1000*60));
		let secs = Math.floor((current_time_played %(1000*60))/1000);

		if(hrs==0 && mins == 0){
			time_value = secs+' secs  ';
		}
		else if (hrs == 0 ){
			time_value = mins+' mins  '+secs+' secs  ';

		}
		else{
			time_value = hrs + ' hours  '+mins+' mins  '+secs+' secs  ';
		}
		
		if(secs<10){
			secs = '0' +secs;
		}

		current_time_played = hrs+':'+mins+':'+secs;
		$('.time-played').text(current_time_played);

	}, 500);
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
