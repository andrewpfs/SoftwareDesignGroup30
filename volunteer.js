/**
 * Note: This script will be shared between both volunteer_history and volunteer_matching_form.
 */

/**
 * Constructor: Create volunteering event object
 * An event object will include its name, urgency, location, date, description, and required skills.
 */
function VolEvent(name, urgency, location, date, desc, skills) {
    this.name = name;
    this.urgency = new Int(urgency);
    this.location = location;
    this.date = new Date(date);
    this.desc = desc;
    this.skills = new Array(skills);
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

/**
 * Function: Fetch match to existing volunteer events
 * Look at preexisting future events and see if the volunteer will be a match.
 * This is used for volunteer_matching_form.
 */

/**
 * Below are some hard-coded events for Assignment 3.
 */