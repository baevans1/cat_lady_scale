// Main JS File for Cat Lady Scale
$(document).ready(function(){


    /*
     * Behavior Class
     * constructor - needs the description and pointValue to construct
     * listItem function - returns the behavior as an html string
     */
    function Behavior (description, pointValue) {
        this.description = description;
        this.pointValue = pointValue;
    }
    Behavior.prototype = {
        getListItem: function () {
            return '<div class="behavior-item">' +
                '<div class="description">' + this.description + '</div>' +
                '<div class="points">' + this.pointValue + '</div>' +
                '</div>';
        },
    }
    /*
     * Status Class
     * constructor - needs the title for the status and a corresponding image
     * imagePath function - returns local path to the image (for using in the src attr)
     */
    function Status (title, image) {
        this.title = title;
        this.image = image;
    }
    Status.prototype = {
        imagePath: function (){
            return "images/" + this.image;
        }
    }

    var catLadyBehaviors = [
        new Behavior("I remember the cat's name in Homeward Bound.", 1),
        new Behavior("I own one cat.", 2),
        new Behavior("I agree that there's a cat gif for everything.", 3),
        new Behavior("I own more than one cat.", 4),
        new Behavior("I take selfies with cats.", 5),
        new Behavior("I need to keep lint rollers everywhere.", 6),
        new Behavior("There's nothing but Fancy Feast in my pantry.", 7),
        new Behavior("I have used the hashtag Caturday.", 8),
        new Behavior("I have tasted cat food.", 9),
        new Behavior("I have left my house to my cats when I die.", 10),
        new Behavior("I own one dog.", -1),
        new Behavior("I own more than one dog.", -5)

    ];

    /*
     * Cat Lady Scale
     * description: the cat lady scale is indexed by the number on the scale. Each
     * scale number has an object with a title and image name associated with it.
     */
    var CAT_LADY_SCALE = {
        10: new Status("Cat-sylum", 'cat_lady.jpg' ),
        9: new Status("ALL OF THE CATS", 'all_kittens.jpg' ),
        8: new Status("Takin Selfies With Cats", 'cat_selfie.jpg' ),
        7: new Status("A One-Cat Kind of Human", 'one_cat.jpg' ),
        6: new Status("Cat Gifs Are...Alright", 'grumpy.jpg' ),
        5: new Status("Indifferent", 'cat_dog_friends.jpg' ),
        4: new Status("Ehh, Dogs Greater...", 'cat_backseat.jpg' ),
        3: new Status("Dogs are where it's at", 'dogs.jpg' ),
        2: new Status("I wish I were allergic", 'allergic.jpg' ),
        1: new Status("Cats...like, the musical?", 'cats.jpg' ),
        0: new Status("What's a cat? Never heard of 'em", 'dog_heaven.jpg' ),
    };

    /*
     * Cat Lady Object
     * behaviors - array of behavior objects
     * addBehavior - function that adds behavior and updates cat lady object as necessary
     * status - the current cat lady status object
     * updateStatus - function that updates the cat lady objects status
     */
     var changeDot = function (idItem) {
       $('.dot').css({
         'background-color' : 'white',
         'font-weight' : 'normal'
       });
       $('#'+ idItem).css({
         'background-color' : 'pink',
         'font-weight' : 'bold'
       });
     }
    var catLady = {
        behaviors: [],
        addBehavior : function (newBehavior) {
         this.behaviors.push(newBehavior);
         this.updateStatus();

        },
        status: CAT_LADY_SCALE[5],  // just the inital status... INDIFFERENT
        updateStatus: function () {
          var sum = 5;
          for( var i = 0; i < catLady.behaviors.length; i++) {
            sum = sum + catLady.behaviors[i].pointValue;
          }

          if (sum <= 0) {
              catLady.status = CAT_LADY_SCALE[0];
              // changeDot(0);

          } else if (sum >= 10) {
              catLady.status = CAT_LADY_SCALE[10];
            
              // changeDot(10);

          } else {
              catLady.status = CAT_LADY_SCALE[sum];
              // changeDot(testArray[sum]);
          }

          return catLady.status;

        }
    }; /*end of the cat Lady object*/

    /*
     * Add Behavior Click Event
     * handles when the user adds a behavior
     */
    $('#add-behavior').click(function(e){
        e.preventDefault();
        var indexBehavior = $("#behavior-select option:selected").index()-1;
          catLady.addBehavior(catLadyBehaviors[indexBehavior]);
          displayNewBehavior(catLadyBehaviors[indexBehavior]);
          displayStatus(catLady.updateStatus());

    });
    /*
     * Display New Behavior
     * add the passed in behavior to the display in the behavior list in the html
     */
    function displayNewBehavior (behavior) {

      $('.behavior-list').append(behavior.getListItem());

    }

    /*
     * Update Status Display
     * updates the cat lady status display in the html with the cat status object it was passed
     */
    function displayStatus (catLadyStatus) {

      $(".status-image").html("<img width='100%' src='" + catLadyStatus.imagePath() + "'/>");
      $(".status-title").html(catLadyStatus.title);
      for( var i = 0; i < testArray.length; i++) {
        if(CAT_LADY_SCALE[i] == catLady.status){
        changeDot(i);
        }
      }

    }

    /*
     * Fill Behavior Drop Down
     * adds all behaviors from the catLadyBehaviors array as options in the html dropdown
     */
    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
            var description = catLadyBehaviors[i].description;
            var points = catLadyBehaviors[i].pointValue;
            var option = '<option value="' + i +'">' + description + '</option>';
            $('#new-behavior-form .behaviors').append(option);
        }
    }

    $('<div />', {
      'class': 'dotScale'
    }).appendTo('.status-section');

  var testArray =[];
  for (var Status in CAT_LADY_SCALE) {
    testArray.push(Status);
  }
  testArray.forEach(function(index) {

  $('.dotScale').append("<div class = 'dot hoverBox' id = " + index + ">" +
        "<p>" + index + "</p>" +
        "<p class = 'hoverText'>" + CAT_LADY_SCALE[index].title + "</p>" +
      "</div>");
  });
  $('.dotScale').css({
    'display' : 'flex',
    'justify-content' : 'space-between',
    'margin' : '10px',
    'height' : '40px'

  });
  $('.dot').css({
    'display' : 'flex',
    'justify-content' : 'center',
    'align-items' : 'space-between',
    'line-height' : '5rem',
    'border': '2px solid black',
    'border-radius' : '100%',
    'width' : '20px',
    'height' : '20px'
  });


    /*
     * Updates the selected options in the add behavior drop down
     * the current selected option, will have a select attribute associated with it.
     */
    $('body').on('change', 'select', function(){
        $('option[selected]').removeAttr('selected');
        $("option[value=" + this.value + "]").attr('selected', true);
    });

    // initial setup
    fillBehaviorDropDown(); // fill drop down
    displayStatus(catLady.status); // display initial cat lady status

});
