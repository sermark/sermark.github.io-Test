			"use strict";

			var popup = document.querySelector(".feedback-form");
			var close = document.querySelector(".feedback-btn-close");
			var link = document.querySelector(".feedback-login");
			var overlay = document.querySelector(".popup-overlay");
			var myMap;
			var myPlacemark;
			var feedbackUsername = popup.querySelector("[name=username]");
			var feedbackEmail = popup.querySelector("[name=email]");
			var feedbackComment = popup.querySelector("[name=comment]");
			var form = popup.querySelector("form");
			var storageUsername = localStorage ? localStorage.getItem("feedbackUsername") : false;
			var storageEmail = localStorage ? localStorage.getItem("feedbackEmail") : false;


			link.addEventListener("click", function(event){
				event.preventDefault();
				popup.classList.add("feedback-form-show");
				overlay.classList.add("popup-overlay-show");
				feedbackUsername.focus();

				if (storageUsername && storageEmail) {
			        feedbackUsername.value = storageUsername;
			        feedbackEmail.value = storageEmail;
			        feedbackComment.focus();
			    }
			})

			form.addEventListener("submit", function (event) {
			    if (!feedbackUsername.value || !feedbackEmail.value) {
			        event.preventDefault();
			        popup.classList.add("modal-error");
			    } else {
			        localStorage.setItem("feedbackUsername", feedbackUsername.value);
			        localStorage.setItem("feedbackEmail", feedbackEmail.value);
			    }
			});

			close.addEventListener("click", function(event){
				event.preventDefault();
				popup.classList.remove("feedback-form-show");
				overlay.classList.remove("popup-overlay-show");
				popup.classList.add("modal-error");
			});

			window.addEventListener("keydown", function(event){
				if(event.keyCode === 27){
					if(popup.classList.contains("feedback-form-show")){
						popup.classList.remove("feedback-form-show");
						overlay.classList.remove("popup-overlay-show");
					}
				}
			})

			overlay.addEventListener("click", function (event) {
   			popup.classList.remove("feedback-form-show");
   			overlay.classList.remove("popup-overlay-show");
			});


			ymaps.ready(function() {
    		myMap = new ymaps.Map('map', {
            center: [59.939000, 30.321375],
            zoom: 16,
            controls: ['zoomControl']
        	}, {
            searchControlProvider: 'yandex#search'
      	    }),
        	myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
            hintContent: 'Магазин Глейси',
            //balloonContent: 'img/pin.png'
        	}, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/pin.png',
            // Размеры метки.
            iconImageSize: [218, 142],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-45, -142]
        	});

		    myMap.geoObjects.add(myPlacemark);
		    // myMap.behaviors.disable('scrollZoom');
			});
			