/**
 * Note: This script will be shared between both volunteer_history and volunteer_matching_form.
 * As of 11/17/25 at 4:51 PM, this is still a work-in-progress. NodeJS and React have yet to be implemented.
 */

/**
 * Constructor: Create volunteering event object
 * An event object will include its name, urgency, location, date, description, and required skills.
 * For Assignment 3, the attendance list will be a boolean. In the final project, the list will be an array of volunteer IDs.
 */
function VolEvent(name, urgency, location, date, desc, skills, attendees) {
    this.name = name;
    this.urgency = new Int(urgency); // 0 = Low, 1 = Medium, 2 = High
    this.location = location;
    this.date = new Date(date);
    this.desc = desc;
    this.skills = new Array(skills);
    this.attendees = new Boolean(attendees);
}

/**
 * Constructor: Create volunteer skills profile
 * A volunteering profile needs a name, an array of skills, and availability range.
 * Possible skills include Communication, Teamwork, Organized, Adaptaility, Driving, English, and Spanish.
 * It may be better to assign each skill an integer ID.
 * In the complete project, a volunteer profile can be taken from the data from an existing volunteer account.
 */
function Volunteer(nameF, nameL, skills, preferences, dates) {
    this.nameF = nameF;
    this.nameL = nameL;
    this.skills = new Array(skills);
    this.preferences = preferences;
    this.dates = new Array[3](dates);
}

/**
 * Function: Fetch volunteer history
 * This is used for volunteer_history. It gathers past events to include in displaying volunteering history.
 */
function getHistory(volevents){
    this.volevents = new Array(volevents);
    if (this.volevents.length() === 0) return 0;
    else
        this.volevents.forEach(function(x) {
            if (x.attendees) then (console.log('ATTENDED ${x.name}'));
        });
}

/**
 * Function: Fetch matches to existing volunteer events
 * Look at preexisting future events and see if the volunteer will be a match.
 * This is used for volunteer_matching_form.
 * For Assignment 3, a hardcoded set of events will be used.
 */
function getMatches(volprofile){
    this.profile = new Array(volprofile);
    if (this.volprofile.length() === 0) return 0;
    else
        this.volprofile.forEach(function(x) {
            
        });
}

/**
 * Below are some hard-coded events for Assignment 3.
 */
const event1 = new VolEvent('Little League Baseball Game', 1, 'Houston, TX', '2025-10-17',
    'At 6:00 PM on October 17th, we will host a Little League baseball game for the Houston area.',
    [1, 4, 5], true);
const event2 = new VolEvent('Fun Run', 2, 'Houston, TX', '2025-10-18',
    'At 2:00 PM on October 18th, we will host a fun run for the Houston area for elementary school students.',
    [3, 2, 7], false);
const event3 = new VolEvent('Little League Baseball Game', 1, 'Houston, TX', '2025-10-17',
    'At 6:00 PM on October 17th, we will host a Little Leagua baseball game for the Houston area.',
    [1, 4, 5], true);

/**
 * Below is a hard-coded volunteer for Assignment 3.
 */
const Mii = new Volunteer('Jason', 'Adams', [1, 4]);