// fetch("https://restcountries.com/v3/all")
//   .then(function (jsondata) {
//     return jsondata.json();
//   })
//   .then(function (data) {
//     data.forEach(function (obj) {
//         var text = document.createElement("div");
//         var card = document.getElementById("countryCard");
//         text.innerText = obj.name.common;
//         card.appendChild(text);
//     });
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

fetch("https://restcountries.com/v3/all")
  .then(function (jsondata) {
    return jsondata.json();
  })
  .then(function (data) {
    data.forEach(function (obj) {
      setTimeout(function () {
        var container = document.getElementById("main_row"); //main element
        var box = document.createElement("div");
        box.setAttribute("class", "col-lg-4 col-sm-12");
        var card = document.createElement("div");
        var cap = obj.capital[0];
        // card.setAttribute("id", cap);
        card.setAttribute("class", "card");
        card.setAttribute(
          "style",
          "width: 18rem; background-image: linear-gradient(to right, rgba(199,185,152,255), rgba(81,95,90,255));"
        );
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        var imageBox = document.createElement("img");
        imageBox.setAttribute("class", "mt-3 card-img-top");
        imageBox.setAttribute(
          "style",
          "height : 150px ; width:100% ; border : 2px solid black"
        );
        imageBox.src = obj.flags[1];
        var title = document.createElement("p");
        title.setAttribute("class", "card-title");
        title.setAttribute(
          "style",
          "text-align: center ; background-color : black ; color : white"
        );
        title.innerText = obj.name.common;
        var capital = document.createElement("p");
        capital.setAttribute("class", "card-capital mt-4");
        capital.setAttribute("style", "text-align: center ; color : white");
        capital.innerText = "Capital : " + obj.capital[0];
        var region = document.createElement("p");
        region.setAttribute("class", "card-region");
        region.setAttribute("style", "text-align: center ; color : white");
        region.innerText = "Region : " + obj.altSpellings[1];
        var countryCode = document.createElement("p");
        countryCode.setAttribute("class", "card-countrycode");
        countryCode.setAttribute("style", "text-align: center ; color : white");
        countryCode.innerText = "Country Code : " + obj.altSpellings[0];
        var buttondiv = document.createElement("div");
        buttondiv.setAttribute(
          "style",
          "display : flex ;align-items: center ; justify-content: center"
        );
        var weather = document.createElement("button");
        var buttonId = obj.altSpellings[0];
        weather.setAttribute("id", buttonId);
        var lat = obj.latlng[0];
        var lng = obj.latlng[1];
        var modal = document.createElement("div");
        modal.setAttribute("class", "modal fade");
        modal.setAttribute("id", obj.name.common);
        modal.setAttribute("data-bs-backdrop", "static");
        modal.setAttribute("data-bs-keyboard", "false");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("aria-labelledby", "staticBackdropLabel");
        modal.setAttribute("aria-hidden", "true");
        var modalDialog = document.createElement("div");
        modalDialog.setAttribute("class", "modal-dialog");
        var modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modal-content");
        var modalHeader = document.createElement("div");
        modalHeader.setAttribute("class", "modal-header");
        var modalTitle = document.createElement("h5");
        modalTitle.setAttribute("class", "modal-title");
        modalTitle.setAttribute("id", obj.altSpellings[1]);
        var modalClose = document.createElement("button");
        modalClose.setAttribute("class", "btn-close");
        modalClose.setAttribute("data-bs-dismiss", "modal");
        modalClose.setAttribute("aria-label", "Close");
        var modalBody = document.createElement("div");
        modalBody.setAttribute("class", "modal-body");
        modalHeader.append(modalTitle, modalClose);
        modalContent.append(modalHeader, modalBody);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        weather.onclick = function () {
          fetch(
            "https://api.openweathermap.org/data/2.5/find?lat=" +
              lat +
              "&lon=" +
              lng +
              "&cnt=1&appid=2b69e66a23fbc2452f128704ca9193a8"
          )
            .then(function (jsonData) {
              return jsonData.json();
            })
            .then(function (res) {
              var temperature = res.list[0].main.temp;
              var name = document.getElementById(obj.altSpellings[1]);
              name.innerHTML =
                "<div>Current Temperature is</div>" + temperature + " F";
              console.log(temperature);
            })
            .catch(function (err) {
              console.log(err);
            });
        };
        // weather.onclick = tempFun(lat, lng);
        var modalId = "#" + obj.name.common;
        weather.setAttribute("data-bs-toggle", "modal");
        weather.setAttribute("data-bs-target", modalId);
        weather.setAttribute(
          "style",
          "text-align : center ; background-image: linear-gradient(to right, rgba(199,185,152,255), rgba(81,95,90,255)) ; border: 2px solid white ; color: white"
        );
        weather.innerText = "Click For Weather";
        buttondiv.appendChild(weather);
        cardBody.append(
          title,
          imageBox,
          capital,
          region,
          countryCode,
          buttondiv
        );
        card.appendChild(cardBody);
        box.appendChild(card);
        container.appendChild(box);
        document.body.appendChild(modal);
      }, 1000);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
