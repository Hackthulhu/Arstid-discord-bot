var Discord = require('discord.io');

var logger = require('winston');
var auth = require('./auth.json');


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


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it needs to execute a command
    // for this script it will listen for messages that will start with `!`
    if (message.substring(0, 7) == 'arstid.') {
        var args = message.substring(7).split(' ');
        var cmd = args[0];
        var season = ["summer", "fall", "winter", "spring"];
        var currentSeason = 3;

        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({ to: channelID, message: 'Pong!' });
            break;
            case 'summer':
                currentSeason = 0;
                bot.sendMessage({ to: channelID, message: "its summer"});
            break;
            case 'fall':
                currentSeason = 1;
                bot.sendMessage({ to: channelID, message: "its fall"});
            break;
            case 'winter':
                currentSeason = 2;
                bot.sendMessage({ to: channelID, message: "its winter"});
            break;
            case 'spring':
                currentSeason = 3;
                bot.sendMessage({ to: channelID, message: "its spring"});
            break;
            case 'what':
                bot.sendMessage({ to: channelID, message: "arstid." + season[currentSeason]})
            break;
            default:
                bot.sendMessage({ to: channelID, message: 'Unknown command.' });

        }
    }
})
