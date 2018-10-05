$.fn.trivia = function() {   
    var ThisThing = this;    
    ThisThing.userPick = null;  
    ThisThing.answers = {   
        correct: 0,
        incorrect: 0
    };
    ThisThing.images = 0;  
    ThisThing.count = 43; 
    ThisThing.current = 0; 

    ThisThing.questions = [ {
        question: "Who won the NBA title in the 2016-17 season ? ",
        choices: ["Celtics", "Warriors", "Lakers", "Cavaliers"],
        correct: 1
    
    }, {  
        question: "Which NBA team has won the most NBA titles ? ",
        choices: ["Heat", "Warriors", "Lakers", "Celtics"],
        correct: 3
    },
     {
        question: "Who won the NBA NVP in the 2017-2018 season?",
        choices: ["Harden", "Westbrook", "Durant", "Lebron"],
        correct: 0
    
    }, 
    {
        question: "Which player lead the league in rebounding in the 2017-2018 season?",
        choices: ["Karl Anthony Towns", "Deandre Jordan", "Andre Drummond", "Anthony Davis"],
        correct: 2
    
    }, 
    {
        question: "Which player lead the league in assists in the 2017-2018 season?",
        choices: ["Chris Paul", "Lebron James", "James Harden", "Russell Westbrook"],
        correct: 3
    
    }, 
    {
        question: "Which player lead the league in blocks in the 2016-2017 season?",
        choices: ["Rudy Gobert", "Hassan Whiteside", "Dwight Howard", "Deandre Jordan"],
        correct: 0
    
    }, 
    {
        question: "Which player lead the league in free throw percentage in the 2016-2017 season?",
        choices: ["Steph Curry", "CJ McCollum", "Kevin Durant", "Kyrie Irving"],
        correct: 1
    
    }, 
    {
        question: "Which player lead the league in 3 point percentage in the 2016-2017 season?" ,
        choices: ["Otto Porter", "Klay Thompson", "Steph Curry", "Kyle Korver"],
        correct: 3
    
    },
    {
        question: "Which player won Six man of the Year in the 2015-2016 season?" ,
        choices: ["Jamal Crawford", "Eric Gordon", "Jeff Teague", "Gerald Green"],
        correct: 0
    
    },
    {
        question: "Which player has won the most NBA championships?" ,
        choices: ["Michael Jordan", "Bill Russell", "Steph Curry", "Magic Johnson"],
        correct: 1
    
    },
    ];

    ThisThing.ask = function() {
        if (ThisThing.questions[ThisThing.current]) { // starts at 
            $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
            $("#question_div").html(ThisThing.questions[ThisThing.current].question);
            var choicesArr = ThisThing.questions[ThisThing.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(ThisThing.timer, 1000); // count down in one sec interval 
        } else {
            $('.card-body').append($('<div />', {
                text: 'Unanswered: ' + (
                    ThisThing.questions.length - (ThisThing.answers.correct + ThisThing.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('.card-body').show();
        }
    };
    ThisThing.timer = function() {   //Makes the time
        ThisThing.count--;  // count down from 20 
        if (ThisThing.count <= 0) { 
            setTimeout(function() { // Display an alert box after ThisThing.next + 1000 (in ThisThing.next func)  :
                ThisThing.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + ThisThing.count + " secs");
        }
    };
    ThisThing.nextQ = function() {
        ThisThing.current++;
        clearInterval(window.triviaCounter); //stops the timer 
        ThisThing.count =43 ;
        $('#timer').html("");
        setTimeout(function() {
            ThisThing.cleanUp();
            ThisThing.ask();
        }, 3000)
    };
    ThisThing.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + ThisThing.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + ThisThing.answers.incorrect);
    };
    ThisThing.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        ThisThing.answers[string]++;
        $('.' + string).html(string + ' answers: ' + ThisThing.answers[string]);
    };
    return ThisThing;
};
 

var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
   
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var right = $('<img>');
    var wrong = $('<img>');
    var userPick = $(this).data("id"),
        ThisThing = Trivia || $(window).trivia(),
        index = ThisThing.questions[ThisThing.current].correct,
        correct = ThisThing.questions[ThisThing.current].choices[index];

    if (userPick !== index) {
        wrong.attr('src', 'https://thesportsdaily.com/2018/05/31/this-lebron-james-angry-reaction-when-he-was-whining-goes-viral/');
        $('#result').append(wrong);
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        ThisThing.answer(false);
    } else {
        right.attr('src', 'https://s.yimg.com/ny/api/res/1.2/YcJt4asTKcawGoaW1XpOnA--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAwO2lsPXBsYW5l/http://media.zenfs.com/en_US/Sports/AP_General/201407131224446808129-p5.jpg');
        $('#result').append(right);
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        ThisThing.answer(true);
    }
    ThisThing.nextQ();
});