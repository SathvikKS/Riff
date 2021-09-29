
module.exports = {
    name: 'ready',
    once: 'true',
    execute(client) {
        client.user.setPresence({
            status: "online",  
        })
        client.user.setActivity(`/help`, {
            type: "LISTENING"
        })
        console.log(`Logged in as ${client.user.tag}!`);
    }
}