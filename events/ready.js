
module.exports = {
    name: 'ready',
    once: 'true',
    execute(client) {
        client.user.setPresence({
            status: "away",  
            activity: {
                name: "/help",  
                type: "LISTENING", 
            }
        });
        console.log(`Logged in as ${client.user.tag}!`);
    }
}