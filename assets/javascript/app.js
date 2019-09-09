//need countdown timer
//when timer runs out reveal answers
//questions need t/f answers / multiple choice answers


    //defining onclick functions that run in the window
window.onload = function() {
    $("#start-button").on("click", stopwatch.start);
    $(".choice").on("click", stopwatch.correctCount);
    $("#check-button").on("click", stopwatch.stop);
    $("#restart-button").on("click", stopwatch.reset);
};

//creating the initial glabal variables
var intervalId;

//wtiting out more to explain for myself, this is set as a boolean 
var clockGoing = false; 
var correctAnswers = 0;

// stopwatch object which contains the clock functions
var stopwatch = {

    // setting clock to 1:30 aka 90 seconds 
    time: 90,

    // function that checks for correct answers and updates score
    correctCount: function() {
        
        //checks the selection that is clicked on for the value "correct"
        if (clockGoing) {
            var selection = $(this).val().trim();
            if (selection === "correct" && correctAnswers < 8) {
                correctAnswers++
            }

            //if player gets all 8 questions correct, the game ends
            else if (correctAnswers > 8) {
                stopwatch.stop();
            }
        }

    },

    //reset function from yt tutorial, find link 
    reset: function() {

        //the time and score reset, clock stops, and choices are deselected
        stopwatch.stop();
        stopwatch.time = 90;
        correctAnswers = 0;
        $("#time-left").text("1:30");
        $("input[type='radio']").prop('checked', false);
    },

    //function that starts the countdown clock
    start: function() {
        if (!clockGoing) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockGoing = true;
        }
    },

    //function that stops the countdown clock and ends the game
    stop: function() {
        clearInterval(intervalId);
        clockGoing = false;

        //changes remaining time to score out of /8
        $("#time-left").html("Score:" + correctAnswers + "/8");
    },
//could add a pop up gif message 
   
//function initialized in the start function, counts down in intervals of 1000 ms
    count: function() {

        //keeps counting if time on clock remains 
        if (stopwatch.time > 0) {
            stopwatch.time--;
            var converted = stopwatch.timeConverter(stopwatch.time);

            //time remaining displays in the header
            $("#time-left").text(converted);
        }

        //clock stops at 0
        else {
            stopwatch.stop();
        }
    },
//could add sound when clock runs out
//have to add sound file, or maybe youtube clip 

    // Had to make function so time displayed in mins/sec
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
        }
};   
