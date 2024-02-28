// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Achterkant.png?csf=1&web=1&e=6e7H0f"\
				alt="Nieuwsblad" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "kaart1",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_1.png?csf=1&web=1&e=h5zIzz",
			id: 1,
		},
		{
			name: "kaart2",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_2.png?csf=1&web=1&e=5eNBog",
			id: 2
		},
		{
			name: "kaart3",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_3.png?csf=1&web=1&e=heX7NE",
			id: 3
		},
		{
			name: "kaart4",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_4.png?csf=1&web=1&e=w5OjFU",
			id: 4
		}, 
		{
			name: "kaart5",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_5.png?csf=1&web=1&e=Fio8Ha",
			id: 5
		},
		{
			name: "kaart6",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_6.png?csf=1&web=1&e=gh6BUz",
			id: 6
		},
		{
			name: "kaart7",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_7.png?csf=1&web=1&e=RCteNT",
			id: 7
		},
		{
			name: "kaart8",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_8.png?csf=1&web=1&e=gXOHC0",
			id: 8
		},
		{
			name: "kaart9",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_9.png?csf=1&web=1&e=ayrngj",
			id: 9
		},
		{
			name: "kaart10",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_10.png?csf=1&web=1&e=shqv5M",
			id: 10
		},
		{
			name: "kaart11",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_11.png?csf=1&web=1&e=ub6xCL",
			id: 11
		},
		{
			name: "kaart12",
			/*img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",*/
      img: "https://mediahuis-my.sharepoint.com/:i:/r/personal/cynthia_dacosta_nieuwsblad_be/Documents/MEMORY/Kaart_12.png?csf=1&web=1&e=GspxxT",
			id: 12
		},
	];
    
	Memory.init(cards);


})();