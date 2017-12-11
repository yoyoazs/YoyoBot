const Discord = require("discord.js");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const shopadapter = new FileSync('shop.json')
const config = new FileSync('config.json')
const db = low(adapter);
const shopdb = low(shopadapter)
const purge = '!clearMessages';

db.defaults({ blagues: [], xp: [], inventory: []}).write()

var bot = new Discord.Client();
var prefix = ("y/");
var randnum = 0;

var blaguenumber = db.get('blagues').map('blague_value').value();

bot.on("ready", () => {
	bot.user.setPresence({ game: { name: '[y/help] Bot en développement', type: 0}})
  console.log("Je suis pres a l'utilisation!");
})

bot.login(bot.login(process.env.TOKEN));

bot.on("guildMemberAdd", member =>{
	member.guild.channels.find("name","welcome").channel.send(message,`Bienvenue a ${member.user.username} sur le serveur !`)
})

bot.on("guildMemberRemove", member =>{
	member.guild.channels.find("name","welcome").channel.send(`:rocket: ${member.user.username} viens de quitter le serveur !`)
})

bot.on("message", (message) => {

	const arg = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = arg.shift().toLowerCase();

	let cont = message.content.slice(prefix.length).split("" );
	let ars = cont.slice(1);

	var msgauthor = message.author.tag;
	var args = message.content.substring(prefix.length).split(" ")

	if(message.author.bot)return;

	if(!db.get("inventory").find({user : msgauthor}).value()){
		db.get("inventory").push({user : msgauthor, items: "vide"}).write();
	}

	if(!db.get("xp").find({user : msgauthor}).value()){
		db.get("xp").push({user : msgauthor, xp: 1}).write();
	}else{
		var userxpdb = db.get("xp").filter({user: msgauthor}).find("xp").value();
		console.log(userxpdb);
		var userxp = Object.values(userxpdb)
		console.log(userxp);
		console.log(`Nombre d'xp : ${userxp[1]}`)

	db.get("xp").find({user: msgauthor }).assign({user: msgauthor, xp: userxp[1] +=1}).write();

	}

	if(message.content === prefix+ "help"){
		message.delete()
		message.channel.send('', { embed: {
			corlor: 543756,
			author: {
			  name: message.author.tag,
			  icon_url: message.author.avatarURL,
		   },
		   title: 'Tout ce que le bot rajoute !',
		   url: '',
		   fields: [
			  {
				name: 'Les commandes', 
				value: `-help : Affiche les commandes du bot \n -up : Voir depuis combien de temps le bot est démarer ! \n -info : Voir les info du bot ! \n -newblague (text) : Ajoute une blague a la base de donné ! \n -raconteuneblague : Le bot raconte une blagues aléatoire (en dévellopement) !\n-niveau : Affiche votre xp !\n-kick : Pour kick une personne !\n-ban : Pour ban une personne !\n-shop : Pour voir les objetc que vous pouvez acheté avec votre XP !\n-buyitem (ID): Pour acheté un objet disponible dans le shop !\n-nouveauté : Pour voir les nouveauté du bot !\n-invitation : Pour voir l'invitation du bot !\n-stats : Pour voir vos stats !\n-créateur : Pour voir le créateur du bot !\n-flip : Permet de lancé une pièce !\n-8ball : Pense a une question et la ball te réponderas !\n-fetenoel (speudo) : Fete noel a quelqu'un !\n-Say (text): Permet de faire dire quelque chose au bot !\n-purge : Permet de supprimé 50 messages !\n-mute (@exemple#0000) (raison) : Permet de mute une personne !\n-unmute (@exemple#0000) : Permet d'unmute une personne !`,
			  },
			  {
				name: 'Les intéractions',
				value: `ping : Le bot répond pong et dit les ms du bot\nComment vas-tu bot ? : Le bot choisit entre deux réponse aux hasard (en dévellopement) !`,
				 },
				 {
					 name: 'Les ajouts',
					 value: `Message de bienvenue et d'en revoir`,
				 }
			],
			footer: {
			  icon_url: bot.user.avatarURL,
			  text: bot.user.username		
		  },
	  }})
		console.log("Commande help demandée !");
	}

	if (message.content =="comment vas tu ?") {
		console.log("message comment vas tu initialisé");
		var result = Math.floor((Math.random() * 2) + 1);
		console.log(result);
		if (result == 1){
			message.reply("Merci, je vais très bien !");
		}else if (result == 2){
	  	message.reply("Je ne vais pas très bien, merci de te soucier de moi !");
	 		}
		}
	
	if(message.content === prefix + "info") {
		message.delete()
		var s = (Math.round(bot.uptime / 1000) % 60)
		var m = (Math.round(bot.uptime / (1000 * 60)) % 60)
		var h = (Math.round(bot.uptime / (1000 * 60 * 60)))
		var j  = Math.round(bot.uptime / (1000 * 60 * 60 * 24));
		m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
	message.channel.send('', { embed: {
	corlor: 543756,
	author: {
		name: message.author.tag,
		icon_url: message.author.avatarURL,
	 },
	 title: `Information du bot`,
	 url: '',
	 fields: [
		{
		name: `Nombres de serveurs !`, 
		value: `${bot.guilds.size}`
		},
		{
		name: 'Nombres de personne utilisant ce bot !',
		value: `${bot.users.size}`
		},
		{
		name: `Nombres de channels que le bot peut utilisé !`,
		value: `${bot.channels.size}`
		},
		{
		name: 'RAM !',
		value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)}`
		},
		{
		name: 'Uptime !',
		value: `${j} Jours ${h} Heures ${m} Minutes ${s} Secondes`
		},
	],
	footer: {
		icon_url: bot.user.avatarURL,
		text: bot.user.username			
	},
}})
}

	  if(message.content === prefix + 'up') {
			message.delete()
        var name = message.author.tag;
        var icon = message.author.avatarURL;
        var s = (Math.round(bot.uptime / 1000) % 60)
        var m = (Math.round(bot.uptime / (1000 * 60)) % 60)
		var h = (Math.round(bot.uptime / (1000 * 60 * 60)))
		var j  = Math.round(bot.uptime / (1000 * 60 * 60 * 24));
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        message.channel.send('', { embed: {
          color: 543756,
          author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL,
          },
          title: '',
          url: '',
          fields: [
            {
              name: 'YoyoBot UpTime',
              value: `${j} Jours ${h} Heures ${m} Minutes ${s} Secondes`,
              inline: true
            },
          ],
          footer: {
            icon_url: bot.user.avatarURL,
            text: bot.user.username
        },
    }})
    }

	if (message.content === prefix + "niveau") {
		message.delete()
		var name = message.author.tag;
		var icon = message.author.avatarURL;
		var xp = db.get("xp").filter({user: msgauthor}).find("xp").value()
		var xpfinal = Object.values(xp);
		message.channel.send('', { embed: {
		  corlor: 543756,
		  author: {
			name: message.author.tag,
			icon_url: message.author.avatarURL,
		 },
		 title: '',
		 url: '',
		 fields: [
			{
			  name: 'XP', 
			  value: `${xpfinal[1]}`
			},
		  ],
		  footer: {
			icon_url: bot.user.avatarURL,
			text: bot.user.username		
		},
	}})
	}

	if (message.content === prefix + "nouveauté"){
		message.delete()
		message.channel.send('', { embed: {
			corlor: 543756,
			author: {
			  name: message.author.tag,
			  icon_url: message.author.avatarURL,
		   },
		   title: 'Nouveauté !',
		   url: '',
		   fields: [
			  {
				name: 'Version du bot: Alpha.', 
				value: `Auqu'une amélioration de commande !`
				},
				{
					name: 'Ajout :',
					value: `Ajout de la commande 'flip' !\nAjout de la commande '8rall' !\nAjout de la commande 'fetenoel' !\nAjout de la commande 'say' !\nAjout de la commande 'purge' !\nAjout de la commande 'mute' !\nAjout de la commande 'unmute' !`
				}
			],
			footer: {
			  icon_url: bot.user.avatarURL,
			  text: bot.user.username			
		    },
		}})
	}

	if(message.content === prefix + "invitation"){
		message.delete()
		message.channel.send('', { embed: {
			color: 543756,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL,
			},
			title: "Invitation du bot !",
			url: '',
			fields: [
				{
				name: `Voici l'invitation du bot !`,
				value: `https://discordapp.com/api/oauth2/authorize?client_id=387669133304528897&permissions=2146958583&scope=bot`,
				},
			],
			footer:{
				icon_url: bot.user.avatarURL,
				text: bot.user.username
			},
		}})
	}

	if(message.content === prefix + "créateur"){
		message.delete()
		message.channel.send('', { embed: {
			color: 543756,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL
			},
			title: "Créateur du bot !",
			url: '',
			fields: [
				{
				name: `Le créateur du bot est :`,
				value: 'Yoyoazs#6197'
				},
			],
			footer:{
				icon_url: bot.user.avatarURL,
				text: bot.user.username
			},
		}})
	}
	
		if (message.content === prefix + "rollprems") {
		var result = Math.floor((Math.random() * 100000000) + 1);
		var result2 = Math.round(result / 2)
		var result3 = Math.round(result / 3)
		var result4 = Math.round(result / 4)
		var result5 = Math.round(result / 5)
		var result6 = Math.round(result / 6)
		var result7 = Math.round(result / 7)
		var result8 = Math.round(result / 8)
		var result9 = Math.round(result / 9)
		var result10 = Math.round(result / 10)
		message.channel.send('', { embed: {
			corlor: 543756,
			author: {
			  name: message.author.tag,
			  icon_url: message.author.avatarURL,
		   },
		   title: 'Gérérateur de chiffre pour avoir la chance de trouvé un chiffre premier !',
		   url: '',
		   fields: [
			  {
				name: 'Ton chiffre:',
				value: result 
			  },
			  {
				name: 'Ton chiffre divisé par 2:',
				value: result2
			  },
			  {
				name: 'Ton chiffre divisé par 3:',
				value: result3
			  },
			  {
				name: 'Ton chiffre divisé par 4:',
				value: result4
			  },
			  {
			  name: 'Ton chiffre divisé par 5:',
			  value: result5
			  },
			  {
				  name: 'Ton chiffre divisé par 6:',
				  value: result6
			  },
			  {
				  name: 'Ton chiffre divisé par 7:',
				  value: result7
			  },
			  {
				  name: 'Ton chiffre divisé par 8:',
				  value: result8
			  },
			  {
				  name: 'Ton chiffre divisé par 9:',
				value: result9
			  },
			  {
				  name: 'Ton chiffre divisé par 10:',
				  value: result10
			  },
			],
			footer: {
			  icon_url: bot.user.avatarURL,
			  text: bot.user.username			
		    },
		}})
	}

	if (message.content === prefix + "roll") {
		var result = Math.floor((Math.random() * 100) + 1);
		message.reply("Tu est tombé sur  " + result);
	}

	if (message.content === prefix + "flip") {
		var result = Math.floor((Math.random() * 2) + 1);
		if (result == 1) {
			message.reply("La pièce est tombé sur pil !");
		} else if (result == 2) {
			message.reply("La pièce est tombé sur face !");
		}
	}

var msg = message;
if(msg.content.startsWith(prefix + 'mute')){
		if(msg.channel.type === 'dm') return;
		if(!msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')){
		return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
		}
		if(msg.mentions.users.size === 0){
		return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez mute**")
		}
		if(!msg.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')){
		return msg.reply("**:x: Je n'ai pas la permission `MANAGE_MESSAGES` pour mute cet utilisateur**").catch(console.error);
		}
		let muteMember = msg.guild.member(msg.mentions.users.first());
		if(!muteMember){
		return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
		}
		msg.channel.overwritePermissions(muteMember, {SEND_MESSAGES: false}).then(member => {
		msg.channel.send(`:speak_no_evil: **${muteMember.displayName}** a bien été mute ! :speak_no_evil:`);
		})
		}
		if(msg.content.startsWith(prefix + 'unmute')){
		if(msg.channel.type === 'dm') return;
		if(!msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')){
		return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
		}
		if(msg.mentions.users.size === 0){
		return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez unmute**")
		}
		if(!msg.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')){
		return msg.reply("**:x: Je n'ai pas la permission `MANAGE_MESSAGES` pour unmute cet utilisateur**").catch(console.error);
		}
		let unmuteMember = msg.guild.member(msg.mentions.users.first());
		if(!unmuteMember){
		return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
		}
		msg.channel.overwritePermissions(unmuteMember, {SEND_MESSAGES: true}).then(member => {
		msg.channel.send(`:monkey_face: **${unmuteMember.displayName}** a bien été unmute ! :monkey_face:`);
		})
		}

		if(msg.content.startsWith(prefix + 'say')){
		const sayMessage = arg.join(" ");
		message.delete().catch(O_o=>{});
		message.channel.send(sayMessage);
	}

//	bot.on('message', function(message) {
//		if(msg.content.startsWith(prefix + 'clear')){
 //       if (message.member.hasPermission("MANAGE_MESSAGES")) {
  //          message.channel.fetchMessages()
   //            .then(function(list){
    //                message.channel.bulkDelete(list);
     //           }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
      //  }
   // }

//});

  if (message.content.startsWith("ping")) {
		message.channel.send(`:ping_pong: pong! Mon ping est de : ${Date.now() - message.createdTimestamp} ms`);
	  console.log("ping pong");
	
	}
 
	if (!message.content.startsWith(prefix)) return;

	switch (args[0].toLowerCase()){

        case "newblague":
		var value = message.content.substr(12);
		var author = message.author.username;
		var number = db.get('blagues').map('id').value();
		console.log(value);
		message.reply("ajout de la blague à la base de données");

		db.get('blagues')
			.push({ blague_value: value, blague_author: author })
			.write();
		break;

		case "raconteuneblague":
		console.log('blague');

		var result = Math.floor((Math.random() * blaguenumber) + 1);
		var blague = db.get(`blagues[${result}].blague_value`).toString().value();
		var author_blague = db.get(`blagues [${result}].blague_author`).toString().value();
		message.channel.send(`Voici une blague : ${blague} \n(Blague de ${author_blague}) `);

		break;

		case "kick":
		message.delete()

		if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
			message.reply("Tu n'as pas le droit de kick ! :P")
		}else{
			var memberkick = message.mentions.members.first();
			if(!memberkick){
				message.reply("L'utilisateur n'exite pas !");
			}else{
				if(!message.guild.member(memberkick).kickable) {
					message.reply("L'utilisateur est imposible a kick !");
				}else{
					memberkick.guild.member(memberkick).kick().then((member) => {
					message.channel.send(`${member.displayName} a été kick !`);
				}).catch(() => {
					message.channel.send("Kick refusé !");
				})
			}
		}
		}
		break;

		case "ban":
		message.delete()

		if(memberban.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous ban.");
		
		if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
			message.reply("Tu n'as pas le droit de ban ! :P")
		}else{
			var memberban = message.mentions.members.first();
			if(!memberban){
				message.reply("L'utilisateur n'exite pas !");
			}else{
				if(!message.guild.member(memberban).bannable) {
					message.reply("L'utilisateur est imposible a ban !");
				}else{
					memberban.guild.member(memberban).ban().then((member) => {
					message.channel.send(`${member.displayName} a été banni !`);
				}).catch(() => {
					message.channel.send("Ban refusé !");
				})
			}
		}
		}
		break;

		case "shop":
		message.delete()
		message.channel.send('', { embed: {
			corlor: 543756,
			author: {
			  name: message.author.tag,
			  icon_url: message.author.avatarURL,
		   },
		   title: 'YoyoBot Shop - Money utilisé : XP !',
		   url: '',
		   fields: [
			  {
				name: 'Salut, ici tu trouveras des items et des badges a acheté !',
				value: `Item:\nTEST [2XP][ID: item0001] Description: Ceci est un test non certifié !` 
			  },
			],
			footer: {
			  icon_url: bot.user.avatarURL,
			  text: bot.user.username			
		    },
		}})

		break;

		case "buyitem":
		message.delete()
		
			var itembuying = message.content.substr(10);
			if (!itembuying){
				itembuying = "Identerminé";
			}else{
				console.log(`Shoplogs: Demmande d'achat d'item ${itembuying}`)
				if (shopdb.get("shop_items").find({itemID: itembuying}).value()){
					console.log("Item trouvé")
					var info = shopdb.get("shop_items").filter({itemID: itembuying}).find("name", "desc").value();
					var iteminfo = Object.values(info);
					console.log(iteminfo);
					message.author.send('', { embed: {
						corlor: 543756,
						author: {
						  name: message.author.tag,
						  icon_url: message.author.avatarURL,
					   },
					   title: `YoyoBot | Facture D'achat!`,
					   url: '',
					   fields: [
						  {
							name: `*Attention, ceci n'est pas rembousable !*`, 
							value: `Info:,*ID:* ***${iteminfo[0]}*** \n *Nom:* ***${iteminfo[1]}*** \n *Description:* ***${iteminfo[2]}*** \n *Prix:* ***${iteminfo[3]}***`
						  },
						],
						footer: {
						  icon_url: bot.user.avatarURL,
						  text: bot.user.username			
					  },
				  }})
					var useritem = db.get("inventory").filter({user: msgauthor}).find("items").value();
					var itemsdb = Object.values(useritem);
					var userxpdb = db.get("xp").filter({user: msgauthor}).find("xp").value();
					var userxp = Object.values(userxpdb);

					if (userxp[1] >= iteminfo[3]){
						message.reply(`***Information: *** Votre achat (${iteminfo[1]}) a été accepté. Retrais de ${iteminfo[3]} XP`)
						if (!db.get("inventory").filter({user: msgauthor}).find({items: "vide"}).value()){
							console.log("inventaire pas vide !");
							db.get("xp").filter({user: msgauthor}).find("xp").assign({user: msgauthor, xp: userxp[1] -= iteminfo[3]}).write();
							db.get("inventory").filter({user: msgauthor}).find("items").assign({user: msgauthor, items: itemsdb[1] + "," + iteminfo[1]}).write();
						}else{
							console.log("inventaire vide !");
							db.get("xp").filter({user: msgauthor}).find("xp").assign({user: msgauthor, xp: userxp[1] -= iteminfo[3]}).write();
							db.get("inventory").filter({user: msgauthor}).find("items").assign({user: msgauthor, items: iteminfo[1]}).write();
						}
					}else{
						message.reply("Erreur ! Achat impossible, nombre d'xp insufisant !");
						}
					}
				}
			
					break;

					case "roulette":
					var result1 = Math.floor((Math.random() * 2) + 1) 
					if (result1 == 1){
					var sayings1 = ["noir",
					"rouge",
					"vert",
					"noir",
					"rouge",
					"noir",
					"rouge"]
					}
var result = Math.floor((Math.random() * sayings1.length) + 0);
message.channel.send(sayings1[result1]);
					
					break;

					case "8ball":

					var sayings = [":8ball: ***Il est certain***",
					":8ball: ***| Il est décidément alors*** ",
					":8ball: ***| Sans auqu'un doute***",
					":8ball: ***| Oui, définitivement***",
					":8ball: ***| Vous pouvez y répondre***",
					":8ball: ***| Comme je le vois oui***",
					":8ball: ***| probablement***",
					":8ball: ***| Les perspectives sont bonnes***",
					":8ball: ***| Oui***",
					":8ball: ***| Les signes pointent vers Oui***",
					":8ball: ***| Réponse brumeusse réessayer***",
					":8ball: ***| Réassayez ultérieurement***",
					":8ball: ***| Mieux vaut ne pas vous le dire maintenant***",
					":8ball: ***| Je ne peux pas prédire maintenant***",
					":8ball: ***| Concentrez-vous et demandez à nouveau***",
					":8ball: ***| Ne comptez pas dessus***",
					":8ball: ***| Ma réponse est non***",
					":8ball: ***| Mes sources disent non***",
					":8ball: ***| Les perspectives ne sont pas si bonnes***",
					":8ball: ***| Très douteux***"];

var result = Math.floor((Math.random() * sayings.length) + 0);
message.channel.send(sayings[result]);

				break;

		case "stats":
		message.delete()

			var userXpDB = db.get("xp").filter({user: msgauthor}).find("xp").value();
			var userxp = Object.values(userXpDB);

			message.channel.send('', { embed: {
				corlor: 543756,
				author: {
				  name: message.author.tag,
				  icon_url: message.author.avatarURL,
			   },
			   title: `Vos stats !`,
			   url: '',
			   fields: [
				  {
					name: `Votre XP !`, 
					value: `${userxp[1]} XP`,
				  },
				  {
					name: 'Votre ID',
					value: `message.author.id`,
				  },
				],
				footer: {
				  icon_url: bot.user.avatarURL,
				  text: `bot.user.username`,		
			  },
			}})
			break;
			
			case "fetenoel":
			message.delete()
				var speudo = message.content.substr(11);
						message.channel.send('', { embed: {
			color: 543756,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL
			},
			title: '',
			url: '',
			fields: [
				{
				name: `Souhaite un joyeux noel a`,
				value: speudo,
				},
			  {
				name: `Si vous voullez faire de même`,
				value: `faite y/fetenoel @` + message.author.username,
				},
			],
			footer:{
				icon_url: bot.user.avatarURL,
				text: bot.user.username
			},
		}})

			break;

	}})

function random(min, max) {
	min = Math.ceil(0);
	max = Math.floor(blaguenumber);
	randum = Math.floor(Math.random() * (max - min + 1) + min);
}
