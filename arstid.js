var Discord = require('discord.io');

var logger = require('winston');
var auth = require('./auth.json');
var season = require('./seasons.json')


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
function choose () {return Math.floor(Math.random() * 4)};

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 7) == 'arstid.') {
        var args = message.substring(7).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var seasonCommand = ["summer", "fall", "winter", "spring"];

        //random initalizer called via arstid.random chooses random season and sends season command
        if (cmd == "random"){
          var stuff = seasonCommand[choose()];
          bot.sendMessage({to: channelID, message: "arstid." + stuff});
        }

        //Commands for all seasons, if a season command comes in,
        //respond with randomized traits and flaws
        for (var i=0, len = seasonCommand.length; i < len; i++) {
          if (cmd == seasonCommand[i]){
            var pt = choose();
            var flaw = choose();
            bot.sendMessage({ to: channelID, message: "I am "+ cmd +"! \nPersonality Trait: " +
              eval("season."+seasonCommand[i]+".personalityTrait[pt]") + "\nFlaw: " +
              eval("season."+seasonCommand[i]+".flaw[flaw]")});
          }
        };
    }
})
