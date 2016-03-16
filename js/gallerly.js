$.getJSON("photos.json", function(json){
  var $gallerly = document.querySelector("#gallerly");
  var gallerly = new Gallerly($gallerly);
  var photoInfo = json.Sheet1;

  var peopleimg = [];
  var eventimg = [];
  var objimg = [];
  var placeimg = [];
  $.each(photoInfo, function(key, val) {
    if (val["Subject"] != null && val["Subject"].indexOf("People--") >= 0) {
      peopleimg.push(val);
    }
    if (val["Subject"] != null && val["Subject"].indexOf("Event--") >= 0) {
      eventimg.push(val);
    }
    if (val["Subject"] != null && val["Subject"].indexOf("Object--") >= 0) {
      objimg.push(val);
    }
    if (val["Subject"] != null && val["Subject"].indexOf("Place--") >= 0) {
      placeimg.push(val);
    }
  });

 function addImg(imgObj) {
    $("#images").append('<a class="col-xs-3 thumbnail"><img src="../photos/' + imgObj["File_Name"] + '" data-title="'+imgObj["Title"]+'" data-description="'+imgObj["Notes"]+'" data-names="Names: '+imgObj["Names"]+'" data-date="Date: '+imgObj["Date"]+'" data-photographer="Photographer: '+imgObj["Photographer"]+'" width="30%"></a>');                
 } 

  $.each(peopleimg, function(index, value) {
    addImg(value);
  });   

  $('#category input[type=radio]').change(function(){
    $(".thumbnail").remove();
    if ($(this).val()=='people') {
      $.each(peopleimg, function(index, value) {
        addImg(value);
      });   
    } else if ($(this).val()=='event') {
      $.each(eventimg, function(index, value) {
        addImg(value);
      });
    } else if ($(this).val()=='object') {
      $.each(objimg, function(index, value) {
        addImg(value);
      });
    } else  {
      $.each(placeimg, function(index, value) {
        addImg(value);
      });
    }
  });
});

var Gallerly = function($app) {
  this.$app = $app;
  this.thumbnail_height = 158;
  this.preview_height = 300;
  this.totalRows = 0;
  console.log("loading...");
  this.load();
};

Gallerly.fn = Gallerly.prototype;

Gallerly.fn.load = function() {
  this.calculateRowNumbers();
  this.events();
};

Gallerly.fn.calculateRowNumbers = function() {
  var thumbnails = this.$app.querySelectorAll(".image-viewer .thumbnail");
  var prevOffsetTop = 0;
  var rowNum = 0;

  for (var i = 0; i < thumbnails.length; i++) {
    if (thumbnails[i].offsetTop !== prevOffsetTop) {
      rowNum++;
      prevOffsetTop = thumbnails[i].offsetTop;
    }

    thumbnails[i].setAttribute("data-row", rowNum);
  }

  this.totalRows = rowNum;
};

Gallerly.fn.nextImageNode = function($img) {
  var nextSibling = $img.parentElement.nextSibling;
  while(nextSibling && nextSibling.nodeType != 1) {
      nextSibling = nextSibling.nextSibling
  }

  if (nextSibling && nextSibling.classList.contains("thumbnail")) {
      return nextSibling.querySelector('img');
  }
  else {
    return false;
  }
};

Gallerly.fn.prevImageNode = function($img) {
  var previousSibling = $img.parentElement.previousSibling;
  while(previousSibling && previousSibling.nodeType != 1) {
      previousSibling = previousSibling.previousSibling
  }

  if (previousSibling && previousSibling.classList.contains("thumbnail")) {
      return previousSibling.querySelector('img');
  }
  else {
    return false;
  }
};

Gallerly.fn.renderPreview = function($img) {
  var rowNum = +$img.parentElement.getAttribute('data-row');
  var preview = this.$app.querySelector('.preview');

  // place the .preview

  if (this.prevRowNum !== rowNum) {
    var thumbnails = this.$app.querySelectorAll('.thumbnail');

    for (var k = 0; k < thumbnails.length; k++) {
      thumbnails[k].classList.remove('move-down');
    }

    for (var i = rowNum + 1; i <= this.totalRows; i++) {
        var bottomRowElements = this.$app.querySelectorAll('.thumbnail[data-row="' + i + '"]');
        for (var j = 0; j < bottomRowElements.length; j++) {
            bottomRowElements[j].classList.add("move-down");
        }
    }

    this.prevRowNum = rowNum;
    preview.style.top = (this.thumbnail_height + 14) * rowNum + 'px';
  }

  // show or hide .next / .prev links

  if (this.nextImageNode($img)) {
    preview.querySelector('.next').classList.remove('hide');
  }
  else {
    preview.querySelector('.next').classList.add('hide');
  }

  if (this.prevImageNode($img)) {
    preview.querySelector('.prev').classList.remove('hide');
  }
  else {
    preview.querySelector('.prev').classList.add('hide');
  }

  // populate preview content

  preview.querySelector('img').setAttribute('src', $img.getAttribute("src"));
  preview.querySelector('.title').innerHTML = $img.getAttribute("data-title");
  preview.querySelector('.description').innerHTML = $img.getAttribute("data-description");
  preview.querySelector('.names').innerHTML = $img.getAttribute("data-names");
  preview.querySelector('.date').innerHTML = $img.getAttribute("data-date");
  preview.querySelector('.photographer').innerHTML = $img.getAttribute("data-photographer");

  // position the arrow

  preview.querySelector('.arrow').style.left = $img.parentElement.offsetLeft + $img.width / 2 - 15 + 'px';
};

Gallerly.fn.events = function() {
  var that = this;
  var $curImg;

  // On click of a thumbnail
  this.$app.querySelector(".image-viewer").addEventListener("click", function(event) {
    if (event.target.tagName === "IMG" && event.target.parentElement.classList.contains("thumbnail")) {
      // remove .movie-down class from .thumbnail class elements
      var thumbnails = that.$app.querySelectorAll('.thumbnail');
      var thumbnail = event.target.parentElement;
      var imgNode = event.target;
      $curImg = imgNode;
      for (var k = 0; k < thumbnails.length; k++) {
        thumbnails[k].classList.remove('move-down');
      }

      // add .move-down class to the bottom row elements
      var rowNumClicked = +thumbnail.getAttribute("data-row");
      for (var i = rowNumClicked + 1; i <= that.totalRows; i++) {
          var bottomRowElements = that.$app.querySelectorAll('.thumbnail[data-row="' + i + '"]');
          for (var j = 0; j < bottomRowElements.length; j++) {
              bottomRowElements[j].classList.add("move-down");
          }
      }
      that.prevRowNum = rowNumClicked;

      // place the .preview at the right place and populate the details accordingly
      var preview = that.$app.querySelector(".image-viewer .preview");
      var targetImage = event.target;

      preview.querySelector('img').setAttribute('src', targetImage.getAttribute("src"));
      preview.querySelector('.title').innerHTML = targetImage.getAttribute("data-title");
      preview.querySelector('.description').innerHTML = targetImage.getAttribute("data-description");
      preview.querySelector('.names').innerHTML = targetImage.getAttribute("data-names");
      preview.querySelector('.date').innerHTML = targetImage.getAttribute("data-date");
      preview.querySelector('.photographer').innerHTML = targetImage.getAttribute("data-photographer");

      preview.classList.remove("hide");
      // preview.style.top = (that.thumbnail_height + 14) * rowNumClicked + 'px';
      preview.querySelector('.arrow').style.left = targetImage.parentElement.offsetLeft + targetImage.width / 2 - 15 + 'px';

      // show or hide .next .prev links

      if (that.nextImageNode($curImg)) {
        preview.querySelector('.next').classList.remove('hide');
      }
      else {
        preview.querySelector('.next').classList.add('hide');
      }

      if (that.prevImageNode($curImg)) {
        preview.querySelector('.prev').classList.remove('hide');
      }
      else {
        preview.querySelector('.prev').classList.add('hide');
      }
    }
  });

  // on click of action buttons in .preview such as close, prev and next
  this.$app.querySelector(".preview").addEventListener("click", function(event) {
    var $nextImg;
    var $prevImg;
    var targetNode = event.target;
    var targetClassList = event.target.classList;
    var preview = that.$app.querySelector(".image-viewer .preview");

    if (targetClassList.contains("close-preview")) {
      var thumbnails = that.$app.querySelectorAll('.thumbnail');
      that.$app.querySelector('.preview').classList.add('hide');

      for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].classList.remove('move-down');
      }
    }
    else if (targetClassList.contains("prev")) {
      $nextImg = $curImg;
      $prevImg = that.prevImageNode($curImg);

      $curImg = $prevImg;
      that.renderPreview($curImg);
    }
    else if (targetClassList.contains("next")) {
      $nextImg = that.nextImageNode($curImg);
      $prevImg = $curImg;

      $curImg = $nextImg;
      that.renderPreview($curImg);
    }
  });

  window.addEventListener("keydown", function(event) {
    console.log(event.keyCode);

    // right - next
    if (event.keyCode === 39) {
      if (!that.nextImageNode($curImg)) {
        return false;
      }

      $nextImg = that.nextImageNode($curImg);
      $prevImg = $curImg;

      $curImg = $nextImg;
      that.renderPreview($curImg);
    }
    // left - prev
    else if (event.keyCode === 37) {
      if (!that.prevImageNode($curImg)) {
        return false;
      }

      $nextImg = $curImg;
      $prevImg = that.prevImageNode($curImg);

      $curImg = $prevImg;
      that.renderPreview($curImg);
    }

  });
};
