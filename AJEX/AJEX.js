
// عشان اقدر اطلب بيانات من السيرفر من غير ماعمل ريفريش
var xhr = new XMLHttpRequest();

//  هتابع حالة الطلب واتأكد ان الطلب ناجح او لا
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
        // النص اللي رجعلي json فابحول النص دا ل object اشتغل عليه
        var data = JSON.parse(xhr.responseText);

        var bandSelect = document.getElementById("bandSelect");
        var artistSelect = document.getElementById("artistSelect");

        // بضيف الباند في ال dropdown
        Object.keys(data).forEach(function (band) {
            var option = document.createElement("option");
            option.value = band;
            option.textContent = band;
            bandSelect.appendChild(option);
        });

        // كل مابختار باند جديد
        bandSelect.addEventListener("change", function () {
            artistSelect.innerHTML = "";
            var defaultOption = document.createElement("option");
            defaultOption.textContent = "Please select";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            artistSelect.appendChild(defaultOption);

            // الجزء الخاص بال artist
            data[this.value].forEach(function (artist) {
                var option = document.createElement("option");
                option.value = artist.name;
                option.textContent = artist.name;
                artistSelect.appendChild(option);
            });
        });

        // عند اختيار Artist
        artistSelect.addEventListener("change", function () {
            var selectedBand = bandSelect.value;
            var selectedArtist = data[selectedBand].find(a => a.name === this.value);
            if (selectedArtist) {
                location.assign(selectedArtist.value);
            }
        });

    }
};

xhr.open("GET", "rockbands.json");
xhr.send();