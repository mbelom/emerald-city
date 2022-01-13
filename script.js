var $dayOf = $("#dayOf");
var $timeBlock = $(".time-block");
var $schedule = $(".schedule");
//each object time and text area
var toDoItems = [];
var presentHour = moment().format('H');
var todaysDate = moment().format('MMMM Do YYYY, h:mm:ss a');


function initializeSchedule(){
    $timeBlock.each(function(){
        //each block
        var $thisBlock = $(this);
        var thisHrBlock = parseInt($thisHrBlock.attr("data-hour"));
        var toDoObj = {
            hour: thisHrBlock,
            text: "",
        }
        toDoItems.push(toDoObj);

    });
localStorage.setItem("todos", JSON.stringify(toDoItems));
//loop thru timeblocks and save and stringify objects to local storage   
}


function setUpTimeTimeBlocks(){
    $timeBlock.each(function(){
        var $thisBlock = $(this);
        var thisHrBlock = parseInt($thisBlock.attr("data-hour"));

        //time blocks styled according to status of the day
            if(thisHrBlock == presentHour) {
                $thisHrBlock.addclass("present").removeClass("past future");
            }
            if(thisHrBlock < presentHour) {
            $thisBlock.addclass("past").removeClass("present future");
            }
            if(thisHrBlock > presentHour) {
                $thisBlock.addclass("future").removeClass("past present")
            }
    });
}

function renderSchedule(){
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);


    for (var i=0; i < toDoItems.length; i++){
        var HourItem = toDoItems[i].hour;
        var TextItem = toDoItems[i].text;

        $("[data-hour=" + HourItem + "]").children("textarea").val(TextItem);
    }
console.log(toDoItems);
}

// be able to save event on calendar | by comparing time/hour
function saveHandler(){

    var $thisHrBlock = $(this).parent();
    var appendItem = (($this).parent()).children("textarea").val;
    var refreshHour = $(this).parent().attr("data-hour");


// matches items by hr that need to be refreshed 
    for (var j = 0; j <toDoItems.length; j++){
        if (toDoItems[i].hour == refreshHour){
            toDoItems[i].text = appendItem;
            //textarea
        }
    }
localStorage.setItem("todos", JSON.stringify(toDoItems));
renderSchedule();
  
}

$document.ready(function(){
    setUpTimeTimeBlocks();

    //no todo in local storage
    if(!localStorage.getItem("todos")){
        initializeSchedule();
        //onjects in the array initialize
    }
}

$dayOf.text($todaysDate);
//current day shown

renderSchedule();
$schedule.on("click", "button", saveHandler);
});