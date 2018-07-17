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

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({ to: channelID, message: 'Pong!' });
            break;
            case 'summer':
              var pt = choose();
              var flaw = choose();
              bot.sendMessage({ to: channelID, message: "I am Summer! \nPersonality Trait: " +
                season.summer.personalityTrait[pt] + "\nFlaw: " +
                season.summer.flaw[flaw]});
            break;
            case 'fall':
              var pt = choose();
              var flaw = choose();
              bot.sendMessage({ to: channelID, message: "I am Fall! \nPersonality Trait: " +
                season.fall.personalityTrait[pt] + "\nFlaw: " +
                season.fall.flaw[flaw]});
            break;
            case 'winter':
              var pt = choose();
              var flaw = choose();
              bot.sendMessage({ to: channelID, message: "I am Winter! \nPersonality Trait: " +
                season.winter.personalityTrait[pt] + "\nFlaw: " +
                season.winter.flaw[flaw]});
            break;
            case 'spring':
              var pt = choose();
              var flaw = choose();
              bot.sendMessage({ to: channelID, message: "I am Spring! \nPersonality Trait: " +
                season.spring.personalityTrait[pt] + "\nFlaw: " +
                season.spring.flaw[flaw]});
            break;
            default:
                bot.sendMessage({ to: channelID, message: 'Unknown command.' });

        }
    }
})
