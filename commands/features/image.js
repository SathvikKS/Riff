const Scraper = require('images-scraper');
var {color} = require('../core/color.js');
const isImageURL = require('valid-image-url');
const path = require('path');
var ext = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
var image_result, image;

const google = new Scraper({
  puppeteer: {
    args: ['--no-sandbox'],
    headless: true
  }
});

module.exports = {
    name: 'image',
    aliases: ['img', 'i'],
    description: 'Searches for images on Google',
    async execute(client, message, args, Discord){
        const image_query = args.join(' ');
        if(!image_query){
            const error = new Discord.MessageEmbed()
            .setDescription("[<@"+message.author.id+">] Please enter an image name.");
            return message.channel.send(error);
        }
        var i, j, prev, done = false;
        for(i=5,prev=0 ; done == false ; i+=5){
            image_result = await google.scrape(image_query, i);
            if(!image_result){
                const error = new Discord.MessageEmbed()
                .setColor(color.red)
                .setDescription("[<@"+message.author.id+">] Unable to search the image.");
                return message.channel.send(error);
            }
            for(j=prev;j<=i;j++){
                if(ext.indexOf(path.extname(image_result[j].url)) !== -1){
                    done = true;
                    image = image_result[j];
                    break;
                }
            }
        } 
        var isImage = await isImageURL(image.url);
        if(isImage === true){
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setTitle(image.title)
            .setDescription("[<@"+message.author.id+">]")
            .setURL(image.source)
            .setImage(image.url);
            message.channel.send(feature);
        } else {
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] Unable to get a valid url.");
            return message.channel.send(error);
        }
    }
}