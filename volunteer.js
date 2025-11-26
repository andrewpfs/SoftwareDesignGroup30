import React from 'react';
/*
Note: This script will be shared between both volunteer_history and volunteer_matching_form.
As of 11/26/25 at 4:56 PM, this is still a work-in-progress. NodeJS and React have yet to be implemented.
Also, the structure of classes and objects may change based on how they have been implemented in Assignment 4.
*/

/*
Constructor: Create volunteering event object
An event object will include its name, urgency, location, date, description, and required skills.
An ID will also be assigned to make finding the event easier.
For Assignment 3, the attendance list will be a boolean. In the final project, the list will be an array of volunteer IDs.
Also, the final project will have IDs automatically assigned.
*/
function VolEvent(id, name, urgency, location, date, desc, skills, attendees, review, include, exclude) {
    this.id = id;
    this.name = name;
    this.urgency = new Int(urgency); // 0 = Low, 1 = Medium, 2 = High, 3 = Critical
    this.location = location;
    this.date = new Date(date);
    this.desc = desc;
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
    this.id = id;
    this.nameF = nameF;
    this.nameL = nameL;
    this.skills = new Array(skills);
    this.preferences = preferences;
    this.dates = new Array[3](dates);
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
function getMatches(volprofile, list, thing){
    // volprofile = Volunteer Obj., list = every array, thing = extrenal array
    if (volprofile.length() === 0) return 0;

    thing.length = 0; // Clear the array of available events to start anew.
    // Step 1: Filter events by date. Only include events that the person would likely be available for.
    for (let i = 0; i < list.length(); i ++){
        if(~(volprofile.id() in (list[i].exclude)) & volprofile.dates.some((val) => val in list[i].date)) {
            thing.push(list[i]);
            list[i].review.push(volprofile.id);
        }
    }
    // Step 2: Sort by skill. Prioritize events a volunteer would do best in.
    if(volprofile.profile.dates.length() > 0){
        let x = thing.length();
        let skill3 = []; // All three skills in the event.
        let skill2 = []; // 2 of three skills.
        let skill1 = []; // 1 of three skills.
        let skill0 = []; // No skills matched.
        for (let i = 0; i < x; i ++){
            // Count the number of skills matched.
            let y = 0;
            if (thing.skills.length() > 0){
                for(let j = 0; j < thing.skills.length(); j ++){
                    if(things.skills[j] in volprofile.skills) y ++;
                }
            }
            switch(y){
                case 0:
                    skill0.push(thing[i])
                case 1:
                    skill1.push(thing[i])
                case 2:
                    skill2.push(thing[i])
                case 3:
                    skill3.push(thing[i])
            }
        }
        thing = skill3.concat(skill2, skill1, skill0);
    }
    // Step 3: Sort by instant match.
    let matched = [];
    for (let i = 0; i < thing.length(); i ++){
        if(volprofile.id() in (thing[i].include)){
            matched.push(thing.splice(i, 1));
            thing = thing.splice(i, 1);
            i --;
        }
    }
    if (matched.length() > 0){
        thing = matched.concat(thing);
    }
    return thing;
};

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