//Set the date below to the first Monday of the Pathway term
const termStart = new Date('3/2/2025').getTime();
const termNumber = '2025_2'
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

//Scour the html document for all classes that begin with 'date' all lowercase
let listOfDeadlines = document.querySelectorAll('[class^="date"]');
//console.log(listOfDeadlines)

//loop through all the dates in the listOfDeadlines array
listOfDeadlines.forEach(deadLine => {
    let thisClassName = deadLine.className
    //console.log("loop through all the dates in the listOfDeadlines array")
    let currentElement = document.querySelector(`.${thisClassName}`)
    //remove all alpha characters from the string (leave negative numbers)
    let daysAfterStart = thisClassName.replace(/[a-zA-Z]/g, '');
    //console.log(daysAfterStart)

    //add the number appended to the class name to the term start date
    let dateToInsert = new Date(termStart + (daysAfterStart * 86400000)-1)

    //Grab just the Week Day Name
    let day = dayList[dateToInsert.getDay()]
    //console.log(day)

    //Grab just the month number
    let m = monthList[dateToInsert.getMonth()]
    //console.log(m)

    //grab just the day number
    let d = dateToInsert.getDate()
    //console.log(d)

    //grab just the 4 digit year
    let y = dateToInsert.getFullYear()
    //console.log(y)

    //insert a human readable date into the html page.
    currentElement.innerHTML = `${day}, ${m} ${d}, ${y}`
});






//--------------------------------------------------------

//Scour the html document for all classes that begin with 'wk'
const firstTime = localStorage.getItem(termNumber)

if (firstTime === null) {
    //console.log('creating the local storage item for the first time')
    let listOfTasks = document.querySelectorAll('[class^="wk"]');
    //console.log(listOfTasks)
    let taskObj = {}
    listOfTasks.forEach(task => {
        //BUILD key:value pairs. Each button has a className which we use as the key, the value is assigned to 0
        taskObj[task.className] = 'no'
    })
    localStorage.setItem(termNumber, JSON.stringify(taskObj));
} // end of first time



function colorBtns() {
    //console.log('Style the buttons LOOP')
    let retrieved = localStorage.getItem(termNumber)
    let taskObj = JSON.parse(retrieved)
    //console.log(taskObj)
    Object.entries(taskObj).forEach(([key, value]) => {
        const thebtn = document.querySelector(`.${key}`)
        thebtn.addEventListener('click', () => checkOff(key));
        //console.log(`${key} ${value}`); 
        if (value != 'no') {
            //console.log(key)
            thebtn.classList.add("checked")
        } // end if
    });
}
colorBtns()


function checkOff(x) {
    //console.log('Check Off Function Called')
    let retrieved = localStorage.getItem(termNumber)
    let taskObj = JSON.parse(retrieved)

    //console.log(x)
    const myclick = document.querySelector(`.${x}`)
    myclick.classList.add("checked")

    taskObj[x] = 'yes'
    //console.log(Object.keys(taskObj));
    //console.log(Object.values(taskObj));
    localStorage.setItem(termNumber, JSON.stringify(taskObj));

} // end checkoff






