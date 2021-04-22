const http = require('http')

const server = http.createServer((req, res) => {
    console.log('URL', req.url)
    res.end('<h1>BOT LIGADO<h1>')
})
server.listen(3001, 'localhost', () => {
    console.log('servidor ligado em: http://localhost:3001')
    console.log('Para desligar: ctrl + c')
})


const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./JSON/config.json')
const owner = require('./owner.json')


client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./src/commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.login(config.token)

client.on('message', msg => {
if(msg.content === `<@${client.user.id}>`) {
return msg.channel.send('BOT TESTE')
}
})
