const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});



require('dotenv').config();
const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const { Client, Intents, Application, DiscordAPIError } = require('discord.js');
const { restart } = require('pm2');
const { createProgram, nodeModuleNameResolver, ExitStatus } = require('typescript');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });




let prompt =`Marv is a chatbot who is very confident in his intetligence, but actually incredibly dumb. he says dumb stuff oftentimes.\n\
`;



client.on("message", function (message) {
    if (message.author.bot) return;
    prompt += `You: ${message.content}\n`;
    (async () => {
        const gptResponse = await openai.complete({
            engine: 'curie',
            prompt: prompt,
            maxTokens: 200,
            temperature: 2,
            topP: 0.5,
            presencePenalty: 1.5,
            frequencyPenalty: 3,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['\n', '\n\n']



            
        });



        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          
        sleep(100).then(() => {  //rec 2000
        client.channels.cache.get('956220942722408478').send(`${gptResponse.data.choices[0].text.substring(5)}`)
        prompt += `${gptResponse.data.choices[0].text}\n`;
    });
    })();
 });  



 const prefix = '--';
 client.on('message', message =>{
 if(!message.content.startsWith(prefix) || message.author.bot) return;
 
 const args = message.content.slice(prefix.length).split(/ +/);
 const command = args.shift().toLowerCase();
 
 if(command === 'kp'){
 
    // message.channel.send(`${gptResponse.data.choices[0].text.substring(5)}`);
    exit();

    
   
 }

 if(command === 'r'){
     
    console.log("restarting " + process.pid);
  
  
 }
 
 });
 

client.login(process.env.BOT_TOKEN);







client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});


