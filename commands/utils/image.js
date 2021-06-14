const Scraper = require('images-scraper');
const isImageURL = require('valid-image-url');
const path = require('path');
const errormsg = require('../../botUtils/error');
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
    aliases: ['img'],
    category: 'Util',
    utilization: '{prefix}image <query>',
    args: true,
    description: 'Searches for images on Google',
    async execute(client, message, args, Discord){
        const image_query = args.join(' ');
        
        var i, j, prev, done = false;
        for(i=5,prev=0 ; done == false ; i+=5){
            image_result = await google.scrape(image_query, i);
            if(!image_result) return errormsg.display(message, 'Unable to search for the image');

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
            .setColor(client.color.green)
            .setTitle(image.title)
            .setDescription("[<@"+message.author.id+">]")
            .setURL(image.source)
            .setImage(image.url);
            message.channel.send(feature);
        } else return errormsg.display(message, 'Unable to get a valid image URL');
    }
}