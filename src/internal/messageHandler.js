const { TeamsBot } = require("../teamsBot");
const { notificationApp } = require("./initialize");
const { ResponseWrapper } = require("./responseWrapper");
const { TeamsActivityHandler } = require("botbuilder");

// Create an instance of the TeamsBot class
const teamsBot = new TeamsBot();

let timerTrigger = true;; // Variable to hold the timer trigger reference

module.exports = async function (context, req) {
  const res = new ResponseWrapper(context.res);
  await notificationApp.requestHandler(req, res, async (context) => {
    // Extract the message text from the context
    const messageText = context.activity.text.toLowerCase();

    if (messageText === 'stop') {
      stopTimerTrigger(); // Stop the timer trigger
      console.log("stopped please");
      await teamsBot.stopBot(context); // Call the stopBot method of the teamsBot instance
    } else if (messageText === 'start') {
      startTimerTrigger(); // Start the timer trigger
      TeamsBot.isBotActive = true;
      console.log("started please");
      await teamsBot.startBot(context); // Call the startBot method of the teamsBot instance
    } else {
      await teamsBot.run(context); // Handle other messages using the existing bot logic
    }
  });

  return res.body;
};

// Function to start the timer trigger
function startTimerTrigger() {
  if (TeamsBot.isBotActive === false) {
    // Set the schedule for the timer trigger in function.json
    const schedule = "*/5 * * * * *"; // Replace with the desired schedule
    console.log("Start Timer");
    // Start the timer trigger
    //TeamsBot.isBotActive = true;
    timerTrigger = notificationApp.startTimerTrigger(schedule);
  }
}

// Function to stop the timer trigger
function stopTimerTrigger() {
  if (TeamsBot.isBotActive === true) {
    // Stop the timer trigger
   TeamsBot.isBotActive = false;
    console.log("Stop Timer");
    timerTrigger = undefined;
  }
}