import React from 'react';
/*
Note: This script will be shared between both volunteer_history and volunteer_matching_form.
As of 11/26/25 at 8:01 PM, this is still a work-in-progress.
The structure of classes and objects may change based on how they have been implemented in Assignment 4.
*/


/*
Constructor: Create volunteering event object
An event object will include its name, urgency, location, date, description, and required skills.
An ID will also be assigned to make finding the event easier.
For Assignment 3, the attendance list will be a boolean. In the final project, the list will be an array of volunteer IDs.
Also, the final project will have IDs automatically assigned.
*/
function VolEvent(id, name, urgency, location, date, desc, skills, attendees, review, include, exclude) {
    this.id = new Int(id);
    this.name = new String(name);
    this.urgency = new Int(urgency); // 0 = Low, 1 = Medium, 2 = High, 3 = Critical
    this.location = new String(location);
    this.date = new Date(date);
    this.desc = new String(desc);
    this.skills = new Array(skills); // Can hold up to 3 skills.
    this.attendees = new Boolean(attendees);
    this.review = new Array(review); // Auto-matched volunteers to be reviewed by an admin. 
    this.include = new Array(include); // Volunteers matched by an admin.
    this.exclude = new Array(exclude); // Volunteers rejected by an admin.
}


/*
Constructor: Create volunteer skills profile
A volunteering profile needs a name, an array of skills, and availability range.
Possible skills include Communication, Teamwork, Organized, Adaptaility, Driving, English, and Spanish.
It may be better to assign each skill an integer ID.
In the complete project, a volunteer profile can be taken from the data from an existing volunteer account.
*/
function Volunteer(id, nameF, nameL, skills, preferences, dates) {
    this.id = new Int(id);
    this.nameF = new String(nameF);
    this.nameL = new String(nameL);
    this.skills = new Array(skills);
    this.preferences = new String(preferences);
    this.dates = new Array[Date](dates);
}


/*
Below are some hard-coded events for Assignment 3.
Note: Starting with Assignment 4, these will need to be taken from a database.
*/
let event1 = new VolEvent(0, 'Little League Baseball Game', 1, 'Houston, TX', '2025-10-17',
    'At 5:00 PM on October 17th, we will host a Little League baseball game for the Houston area.',
    [1, 4, 5], true);
let event2 = new VolEvent(1, 'Fun Run', 2, 'Houston, TX', '2025-10-18',
    'At 2:00 PM on October 18th, we will host a fun run for the Houston area for elementary school students.',
    [3, 2, 7], false);
let event3 = new VolEvent(2, 'Food Bank', 1, 'Houston, TX', '2025-10-19',
    'At 10:00 AM on October 19th, we will work with the Houston Food Bank to assist and guide their volunteers.',
    [2, 1, 7], true);
let event4 = new VolEvent(3, 'Unknown', 0, 'Houston, TX', '2025-10-20',
    'At 12:00 PM on October 20th, a low urgency event will occur.',
    [1, 4, 5], true);
let event5 = new VolEvent(4, 'Little League Baseball Game', 1, 'Houston, TX', '2025-10-24',
    'At 5:00 PM on October 24th, we will host a Little League baseball game for the Houston area.',
    [1, 4, 5], false);

let eventList = [event1, event2, event3, event4, event5];

// Below is a hard-coded volunteer for Assignment 3.
let Mii1 = new Volunteer(1234, 'Jason', 'Adams', [1, 4], null, ['2025-10-18', '2025-10-19']); // Jason Adams, user ID 1234, has skills 1 and 4.
// Starting with Assignment 4, this will be replaced with a logged in user.



/*
Function: Fetch volunteer history
This is used for volunteer_history. It gathers past events to include in displaying volunteering history.
The current assumed approach here is to check with the database to see if a user attended.
*/
function getHistory(){
    if (eventList.length() === 0) return 0;
    let hist = [];
    for(let i = 0; i < eventList.length(); i ++){
        if (eventList[i].attendees){
            (console.log('ATTENDED ${x.name}'))
            hist.push(eventList[i]);
        };
    };
}


/*
Function: Fetch matches to existing volunteer events. Return array of available matches, or 0 if no matches were found.
Look at preexisting future events and see if the volunteer will be a match.
This is used for volunteer_matching_form on the volunteer's end.
For Assignment 3, a hardcoded set of events will be used.
*/


/*
Function: Provide a list of auto-matched volunteers to be matched or rejected.
Look at preexisting future events and see if the volunteer will be a match. If so, add them to the event.
This is used for volunteer_matching_form on the admin's end.
For Assignment 3, a hardcoded set of events will be used.
*/
function setMatches(){
    // This is where you need to learn how JavaScript can be incorporated into HTML.
    // Load each event as an element. Each event will have its own sub elements for each voluteer.
    for (let i = 0; i < eventList.length(); i ++){
        if(eventList[i].review.length() > 0){
            // Create Event element
            let a = document.createElement("div")
            for(let j = 0; j < eventList[i].review.length(); j ++){
                // Create Volunteer Element
            }
        }
    }
    // The Match and Reject buttons should give a confirmation message.
    // Upon confirmation, move the volunteer from review to include/exclude. Then, remove the volunteer element.
        // If there are no volunteer elements left, Replace it with a message.
        // "No auto-matched voluteers. Looking for others..."
    // Note: Have it load new volunteers every so often.
    // Maybe make the events a drop-down menu?
}

export default function addItemH(name, urg, loc, day, desc, skill){
    return (<>
        <div
            style={{
                borderRadius: 5,
                border: "1px solid aquamarine",
                backgroundColor: "rgb(225, 255, 245)",
                marginTop: 0,
                marginBottom: 30
            }}
        >
            {/* Add image here. */}
            <div style={{ display: "flex" }}>
                {" "}
                {/* A row depicting event name and urgency. Urgency should be in bold. */}
                <div
                    style={{
                        backgroundColor: "aquamarine",
                        flex: 3,
                        padding: 15,
                        fontWeight: "bold",
                        borderTopLeftRadius: 5
                    }}
                >
                    {name}
                </div>
                <div
                    style={{
                        backgroundColor: "aquamarine",
                        flex: 2,
                        padding: 15,
                        fontWeight: "bold",
                        borderTopRightRadius: 5
                    }}
                >
                    {getUrg(urg)}
                </div>
            </div>
            <div>
                {" "}
                {/* Holds the location, date, description, and required skills of the event. */}
                {/* Should display with location on the left and a date and time on the right. */}
                <p className="text1">{loc}</p>
                <p className="text1">{day}</p>
                <div style={{ display: "flex" }}>
                    {/* Description goes here. */}
                    <div style={{ padding: 15, flex: 3, borderBottomLeftRadius: 5 }}>
                        {desc}
                    </div>
                    {/* Required Skills go here. They should be depicted as a list. */}
                    <div style={{ padding: 15, flex: 2, borderBottomRightRadius: 5 }}>
                        Required Skills:<p>text</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default function noHist(){
    return (
        <div>
            {" "}
            {/* This will only show if the volunteer has no volunteering history.
            It is only there for demonstration purposes. */}
            <p style={{ textAlign: "center", fontSize: "larger" }}>
                You haven't volunteered at any COMPANY NAME events yet.
            </p>
        </div>
    )
}
function addItems(){
    if(eventList.length() === 0){
        noHist();
        return 0;
    }
    for(let i = 0; i < eventList.length(); i ++){
        if(eventList[i].attendees) addItemH(
            eventList[i].name,
            eventList[i].urgency,
            eventList[i].location,
            eventList[i].date,
            eventList[i].desc,
            eventList[i].skills.join(", ")
        )
    }
}

/*
*/
//Possible skills include Communication, Teamwork, Organized, Adaptaility, Driving, English, and Spanish.
function getSkills(x){
    switch(x){
        case 1: return "Communication";
        case 2: return "Teamwork";
        case 3: return "Organized";
        case 4: return "Adaptability";
        case 5: return "Driving";
        case 6: return "English";
        case 7: return "Spanish";
    }
    return "N/A";
}

function getUrg(x){
    switch(x){
        case 0: return "Low";
        case 1: return "Medium";
        case 2: return "High";
        case 3: return "CRITICAL";
    }
    return "N/A";
}