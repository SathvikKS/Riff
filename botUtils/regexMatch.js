module.exports = async (string) => {
    if(string.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/gmi)) return "youtube"
    if(string.match(/^(?:spotify:|https:\/\/[a-z]+\.spotify\.com\/(track||userplaylist\/))(.*)$/gm)) return "spotify"
    if(string.match(/^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/gm)) return "soundcloud"
}