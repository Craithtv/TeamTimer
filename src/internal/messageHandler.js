const { TeamsBot } = require("../teamsBot");
const { notificationApp } = require("./initialize");
const { ResponseWrapper } = require("./responseWrapper");

// Create an instance of the TeamsBot class
const teamsBot = new TeamsBot();

let timerTrigger; // Variable to hold the timer trigger reference

module.exports = async function (context, req) {
  const res = new ResponseWrapper(context.res);

  await notificationApp.requestHandler(req, res, async (context) => {
    // Extract the message text from the context
    const messageText = context.activity.text.toLowerCase();

    if (messageText === 'stop') {
      stopTimerTrigger(); // Stop the timer trigger
      await teamsBot.stopBot(context); // Call the stopBot method of the teamsBot instance
    } else if (messageText === 'start') {
      startTimerTrigger(); // Start the timer trigger
      await teamsBot.startBot(context); // Call the startBot method of the teamsBot instance
    } else {
      await teamsBot.run(context); // Handle other messages using the existing bot logic
    }
  });

  return res.body;
};

// Function to start the timer trigger
function startTimerTrigger() {
  if (!timerTrigger) {
    // Set the schedule for the timer trigger in function.json
    const schedule = "*/30 * * * * *"; // Replace with the desired schedule

    // Start the timer trigger
    timerTrigger = notificationApp.startTimerTrigger(schedule);
  }
}

// Function to stop the timer trigger
function stopTimerTrigger() {
  if (timerTrigger) {
    // Stop the timer trigger
    //timerTrigger.stop(); define stop
    timerTrigger = undefined;
  }
}