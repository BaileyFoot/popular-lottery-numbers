

let table;
//these keep track of what row in the CSV the program is on at any time and the numbers that were in that lottery draw.
let currentNumbers = [];
let currentRow = 1 ;

//this is a list of how many times each number has been drawn in the lottery.
//the numbers are placed into the list at their corresponding index. eg: number 5 is 5th element of the list.
timesOccurred = [];
numbers = [];

//this will be populated with the 6 most common numbers from all the draws so far.
let mostCommonNumbers = [];


//reads the table before starting the program.
function preload(){
    table = loadTable("/Lottery_Powerball_Winning_Numbers__Beginning_2010.csv","csv","header");
}

//populates the lists so the number of times a number has been drawn can be placed at its corresponding place in the list.
//eg: 5 appears twice, so put a "2" as the 5th item of the list.
function populateList() {
    for(let i=0; i<69; i++) {
        append(timesOccurred,0);
        append(numbers,i+1);
    }

}
//this takes the numbers that have been drawn and places them into a list that we can reference later.
function separateCurrentDrawNumbers() {
    currentNumbers = [];
    let num = table.getString(currentRow,"Winning Numbers");
    append(currentNumbers,(num[0] + num[1]));
    append(currentNumbers,(num[3] + num[4]));
    append(currentNumbers,(num[6] + num[7]));
    append(currentNumbers,(num[9] + num[10]));
    append(currentNumbers,(num[12] + num[13]));
    append(currentNumbers,(num[15] + num[16]));
  }

//takes in the numbers drawn in the lottery and adds them to the list of how many each of the numbers have been drawn.
function checkNumbers() {
    for(let i = 0; i<currentNumbers.length; i++) {
        let numDrawn = currentNumbers[i]; 
        timesOccurred[numDrawn-1] = (int(timesOccurred[numDrawn-1]) + 1);
    }
}

function findMostCommonNumbers() {
    mostCommonNumbers = []; 

    for(let i=0; i<6;i++) {
        let currentBiggest = 0;
        for(let x=0; x<timesOccurred.length;x++) {
            //if the number has been drawn more times than the previous one then it is saved as the current most common number.
            //the number also needs to not already have been added to the mostCommonNumbers list (this frame).
            //the number left saved at the end of the loop (as currentBiggest) is saved into the list.
            if(timesOccurred[x]>timesOccurred[currentBiggest] && mostCommonNumbers.indexOf(x+1)<0) { 
                currentBiggest = x;
            }
        }
        //this adds one of the most commonly drawn numbers to the mostCommonNumbers list.
        append(mostCommonNumbers,currentBiggest+1);
    }
}

//draws the numbers to the canvas and draws a circle around them that is representative of how many times it has been drawn in the lottery.
function outputMostCommons(){
    for(let i=0;i<6;i++) {
        textSize(18);
        stroke(2);
        fill(200);
        circle(windowWidth/5.8 + (200*i),windowHeight/2.24,(timesOccurred[mostCommonNumbers[i]-1])+20);
        fill(0);
        text(mostCommonNumbers[i],windowWidth/6 + (200*i),windowHeight/2.2);
        
    }
}


function setup() {
    noStroke();
    frameRate(20);
    createCanvas(windowWidth-20,windowHeight-20);
    //background(200);

    //just makes enough elements in the list to be able to place the number of occurrances of a number at its corresponding position in the list...
    populateList();

}

function draw() {
    //if statement to stop the program crashing when it runs out of data.
    //there are 1575 rows in the dataset.
    //should be changed to something that allows for more data to be added...
    if(currentRow < 1575) {
        background(255);
        //turns the drawn numbers into an array.
        separateCurrentDrawNumbers();

        //adds numbers in the current draw to the times occured list. 
        checkNumbers();



        findMostCommonNumbers();

        //changes the row/lottery draw that we are looking at for next time the program loops.
        currentRow++;
        console.log(currentRow);

        outputMostCommons();
    }
    
}

