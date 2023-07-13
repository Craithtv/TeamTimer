const { TeamsActivityHandler } = require("botbuilder");
const { notificationApp } = require("./internal/initialize");
const messageHandler = require("./internal/messageHandler");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
    this.isBotActive = true; // Flag to control the bot's activity status
  }

  async handleTeamsMessage(context) {
    const messageText = context.activity.text.toLowerCase();

    if (messageText === 'stop') {
      await this.stopBot(context); // Custom method to handle the "stop" command
    } else if (messageText === 'start') {
      await this.startBot(context); // Custom method to handle the "start" command
    } else if (this.isBotActive) { // Check if the bot is active
      await super.handleTeamsMessage(context);
    }
  }

  async stopBot(context) {
    this.isBotActive = false; // Set the bot's activity status to inactive
    console.log("Stopped");
    await context.sendActivity('Bot stopped');
  }

  async startBot(context) {
    this.isBotActive = true; // Set the bot's activity status to active
    await context.sendActivity('Bot started');
   
    // Start the timer trigger
    console.log("Started");
    
  }
}

const teamsBot = new TeamsBot(); // Create an instance of the TeamsBot class

module.exports = { TeamsBot }; // Export the instance of the TeamsBot

