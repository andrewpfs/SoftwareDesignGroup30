/*
Note: This script will be shared between both volunteer_history and volunteer_matching_form.
As of 11/25/25 at 7:12 PM, this is still a work-in-progress. NodeJS and React have yet to be implemented.
Also, the structure of classes and objects may change based on how they have been implemented in Assignment 4.
*/

/*
Constructor: Create volunteering event object
An event object will include its name, urgency, location, date, description, and required skills.
An ID will also be assigned to make finding the event easier.
For Assignment 3, the attendance list will be a boolean. In the final project, the list will be an array of volunteer IDs.
Also, the final project will have IDs automatically assigned.
*/
function VolEvent(id, name, urgency, location, date, desc, skills, attendees) {
    this.id = id;
    this.name = name;
    this.urgency = new Int(urgency); // 0 = Low, 1 = Medium, 2 = High
    this.location = location;
    this.date = new Date(date);
    this.desc = desc;
    this.skills = new Array(skills); // Can hold up to 3 skills.
    this.attendees = new Boolean(attendees);
}

/*
Constructor: Create volunteer skills profile
A volunteering profile needs a name, an array of skills, and availability range.
Possible skills include Communication, Teamwork, Organized, Adaptaility, Driving, English, and Spanish.
It may be better to assign each skill an integer ID.
In the complete project, a volunteer profile can be taken from the data from an existing volunteer account.
*/
function Volunteer(nameF, nameL, skills, preferences, dates) {
    this.nameF = nameF;
    this.nameL = nameL;
    this.skills = new Array(skills);
    this.preferences = preferences;
    this.dates = new Array[3](dates);
}

/*
Function: Fetch volunteer history
This is used for volunteer_history. It gathers past events to include in displaying volunteering history.
*/
function getHistory(volevents){
    this.volevents = new Array(volevents);
    if (this.volevents.length() === 0) return 0;
    else
        this.volevents.forEach(function(x) {
            if (x.attendees) then (console.log('ATTENDED ${x.name}'));
        });
}

/*
Function: Fetch matches to existing volunteer events. Return array of available matches, or 0 if no matches were found.
Look at preexisting future events and see if the volunteer will be a match.
This is used for volunteer_matching_form.
For Assignment 3, a hardcoded set of events will be used.
*/
function getMatches(volprofile, list, thing){
    // volprofile = Volunteer Obj., list = every array, thing = extrenal array
    if (volprofile.length() === 0) return 0;
    else
        thing.length = 0; // Clear the array of available events to start anew.
        // Step 1: Filter events by date. Only include events that the person would likely be available for.
        for (let i = 0; i < list.length(); i ++){
            if(list[i].date in volprofile.dates) thing.push(list[i]);
        }
        // Step 2: Sort by skill. Prioritize events a volunteer would do best in.
        if(volprofile.profile.dates.length() >= 0){
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
            thing = skill3 + skill2 + skill1 + skill0;
        }
        return thing;
};

/*
Below are some hard-coded events for Assignment 3.
Note: Starting with Assignment 4, these will need to be changed from const variables to let variables.
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
    [1, 4, 5], true);

let eventList = [event1, event2, event3, event4, event5];

// Below is a hard-coded volunteer for Assignment 3.
let Mii = new Volunteer('Jason', 'Adams', [1, 4]); // Jason Adams has skills 1 and 4.