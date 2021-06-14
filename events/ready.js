require('dotenv').config();

module.exports = (client) => {
    client.user.setPresence({
        status: "online",  
        activity: {
            name: process.env.prefix+"help",  
            type: "LISTENING", 
        }
    });
    console.log(`Logged in as ${client.user.tag}!`);
}