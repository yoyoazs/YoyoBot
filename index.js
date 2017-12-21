	const Discord = require("discord.js"),
	low = require('lowdb'),
	FileSync = require('lowdb/adapters/FileSync'),
	weather = require("weather-js"),
	Wiki = require("wikijs"),
	AuthDetails = require("./auth.json"),
	fs = require("fs"),
	express = require("express"),
	app = express(),
	yt = require("./youtube_plugin"),
	youtube_plugin = new yt(),
	Music = require("./Music.js"),
	functionHelper = require('./functionHelpers.js'),
	ffmpeg = require("ffmpeg"),
	search = require('youtube-search'),
	music = new Music(),
	con = console.log,

	adapter = new FileSync('database.json'),
	shopadapter = new FileSync('shop.json'),
	config = new FileSync('config.json'),
	db = low(adapter),
	shopdb = low(shopadapter),

	idéeadapter = new FileSync('idéebase.json'),
	dbi = low(idéeadapter)

	dbi.defaults({ idées: []}).write()

	db.defaults({ blagues: [], xp: [], inventory: []}).write()

	var bot = new Discord.Client();
	var prefix = ("y/");
	var randnum = 0;
	const opts = {
		maxResults: 3,
		key: AuthDetails.youtube_api_key
	  };

	var blaguenumber = db.get('blagues').map('blague_value').value();

	bot.on(("ready"), ()=> {
		console.log("☻Bot démarré !!☻")
		function jeux() {
			
			
			  var answers = ['y/help', 'En développement', `${servercount} Serveurs`, `${bot.users.size} Users`, "Créé par yoyoazs77"];
			
				return answers[Math.floor(Math.random()*answers.length)];
			}
			var servercount = bot.guilds.size;
				var servers = bot.guilds.array().map(g => g.name).join(',');
			
			setInterval(() => {
			bot.user.setGame(jeux(), "http://twitch.tv/URL%22")     }, 5000)
	})
	
bot.login(process.env.TOKEN);

	bot.on("message", (message) => {
		if (message.channel.type === "dm") 
			return;

		if (message.author.id === "392942526551818241") {
			message.channel.send("Tu est ban du bot.")
			return;
		}

		if (message.content.startsWith(prefix + "eval")){
		if (message.author.id == "285345858348646400") {
		let input = message.content.substr(7)
		let color = 0xFFFFFF;
		let output = "No output was defined";
		try {
		let result = eval(input);
		color = 0x00E676;
		output = result;
		} catch (error) {
			color = 0xFF5252;
			output = error;
			}
		const eval33 = new Discord.RichEmbed()
			.setAuthor("✅ Evaluation de la commande réusi! ✅")
			.setColor(0x1b6bd3)
			.addField(':inbox_tray: Le code', "```js\n" + input + "```", true)
			.addField(':outbox_tray: Le résultat', "```js\n" + output + "\n```", false)
			.setTimestamp()
		message.channel.send({ embed: eval33 })
	}else{
		message.channel.send("Tu n'est pas mon créateur.")
	}
}


		const arg = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = arg.shift().toLowerCase();

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

		if (message.content.startsWith(prefix + "wiki")){
			if(!message.content.substr(5)) {
				console.log(Date.now(), "DANGER", "Vous devez fournir un terme de recherche.");
				message.reply("Vous devez fournir un terme de recherche.");
				return;
			}
			var wiki = new Wiki.default();
			wiki.search(message.content.substr(5)).then(function(data) {
				if(data.results.length==0) {
					console.log(Date.now(), "DANGER","Wikipedia ne trouve pas ce que vous avez demandée : " + message.content.substr(5));
					message.reply("Je ne peut trouvé ce que vous voulez dans Wikipedia :(");
					return;
				}
				wiki.page(data.results[0]).then(function(page) {
					page.summary().then(function(summary) {
						if(summary.indexOf(" may refer to:") > -1 || summary.indexOf(" may stand for:") > -1) {
							var options = summary.split("\n").slice(1);
							var info = "Selectioné une options parmis celle-ci :";
							for(var i=0; i<options.length; i++) {
								info += "\n\t" + i + ") " + options[i];
							}
							message.reply(info);
							selectMenu(message.channel, message.author.id, function(i) {
								commands.wiki.process(Client, message, options[i].substring(0, options[i].indexOf(",")));
							}, options.length-1);
						} else {
							var sumText = summary.split("\n");
							var count = 0;
							var continuation = function() {
								var paragraph = sumText.shift();
								if(paragraph && count<3) {
									count++;
									message.reply(message.channel, paragraph, continuation);
								}
							};
							message.reply("**Trouvé " + page.raw.fullurl + "**", continuation);
						}
					});
				});
			}, function(err) {
				console.log(Date.now(), "ERREUR","Impossible de se connecté a Wikipédia");
				message.reply("Uhhh...Something went wrong :(");
			})}

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
		
		if(message.content === prefix + "infobot") {
			message.delete()
			var s = (Math.round(bot.uptime / 1000) % 60)
			var m = (Math.round(bot.uptime / (1000 * 60)) % 60)
			var h = (Math.round(bot.uptime / (1000 * 60 * 60)))
			var j = (Math.round(bot.uptime / (1000 * 60 * 60 * 48)))
			var M = (Math.round(bot.uptime / (1000 * 60 * 60 * 48 * 30 )))
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
			name: `Nombres de serveurs :`, 
			value: `${bot.guilds.size}`
			},
			{
			name: 'Nombres de personne utilisant ce bot :',
			value: `${bot.users.size}`
			},
			{
			name: `Nombres de channels que le bot peut utilisé :`,
			value: `${bot.channels.size}`
			},
			{
			name: 'RAM :',
			value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)}`
			},
			{
			name: 'Uptime !',
			value: `${M} Mois ${j} Jours ${h} Heures ${m} Minutes ${s} Secondes`
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
			var j = (Math.round(bot.uptime / (1000 * 60 * 60 * 48)))
			var M = (Math.round(bot.uptime / (1000 * 60 * 60 * 48 *30)));
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
								value: `${M} Mois ${j} Jours ${h} Heures ${m} Minutes ${s} Secondes`,
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
			var userXpDB = db.get("xp").filter({user: msgauthor}).find("xp").value();
			var userxp = Object.values(userXpDB);
			var value = message.content.substr(9);
			var name = value;
			var icon = message.author.avatarURL;
			message.channel.send('', { embed: {
				corlor: 543756,
				author: {
				name: name,
				icon_url: message.author.avatarURL,
			},
			title: '',
			url: '',
			fields: [
				{
					name: 'XP', 
					value: `${userxp[1]}`
				},
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

		if (message.content === prefix + "roll"){
			var result = Math.floor((Math.random() * 100 ) + 1);
			message.reply(result)
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
				if(message.author.id == "285345858348646400"){
			const sayMessage = arg.join(" ");
			if (!sayMessage) return;
			message.delete().catch(O_o=>{});
			message.channel.send(sayMessage);
			}else{
				message.channel.send("**erreur** Tu n'est pas mon créateur")
			}	
	}
		
		if (message.content.startsWith("ping")) {
			message.channel.send('Pong...').then((msg) => {
				msg.edit(`Pong! La latence est de ${msg.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(client.ping)}ms`);
		
		})
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

			case "idée":	
			var value = message.content.substr(7);
			var author = message.author.username;
			var number = dbi.get('idées').map('id').value();
			message.reply("Votre idée a bien étais ajouté a liste, merci de votre participation pour amélioré le bot.")

			dbi.get('idées')
				.push({ idée_value: value, idée_author: author })
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
					itembuying = "Indeterminé";
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
						"noir",
						"rouge"]
	var result = Math.floor((Math.random() * sayings1.length) + 0);
	message.channel.send(sayings1[result1]);
						}
							if (result1 == 2){
								var sayings2 = ["noir",
								"rouge",
								"vert",
								"noir",
								"noir",
								"rouge"]
			var result = Math.floor((Math.random() * sayings2.length) + 0);
			message.channel.send(sayings2[result1]);
							}
						
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

				case "fetenoel":
				message.delete()
					var speudo = message.content.substr(11);
				if (!speudo) return;
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

			case "méteo":
					var location = message.content.substr(6);
					var unit = "C";
					
					try {
						weather.find({search: location, degreeType: unit}, function(err, data) {
							if (data.length === 0) {
								message.channel.send('**Veuillez entrer une localisation valide**') 
								return; 
							}
							if(err) {
								message.channel.send("\n" + `Je ne peut pas trouvé d'information pour la méteo de  ${location}`);
								} else {
								data = data[0];
			
								message.channel.send("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
							}
						});
					} catch(err) {
						console.log(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
						message.reply("Idk pourquoi c'est cassé tbh :(");
						}
					}


		var msgauthor = message.author.tag;
		const msgc = message.content;
		

	if(message.content === prefix +"info") {
		var userXpDB = db.get("xp").filter({user: msgauthor}).find("xp").value();
		var userxp = Object.values(userXpDB);
		var inventoryDb = db.get("inventory").filter({user: msgauthor}).find("items").value();
		var inventory = Object.values(inventoryDb);
		var userCreateDate = message.author.createdAt.toString().split(' ');
			var memberavatar = message.author.avatarURL
			var membername = message.author.username
				var mentionned = message.mentions.users.first();
				var getvalueof;
				if(mentionned){
						var getvalueof = mentionned;
				} else {
						var getvalueof = message.author;
				}

				if(getvalueof.bot == true){
						var checkbot = "L'utilisateur est un bot";
				} else {
						var checkbot = "N'est pas un bot";
				}
				if(getvalueof.presence.status == 'online'){
					var status = "En ligne"; 
				}else {
					var status = "Hors ligne";
				}

			message.channel.sendMessage({
					embed: {
						type: 'rich',
						description: '',
						fields: [{
							name: 'Pseudo',
							value: getvalueof.username,
							inline: true
						}, {
							name: 'User id',
							value: getvalueof.id,
							inline: true
						},{
							name: 'Discriminateur',
							value: getvalueof.discriminator,
							inline: true
	},{
							name: 'Status',
							value: status,
							inline: true
	},{
							name: 'Bot',
							value: checkbot,
				inline: true
	},{
		name: 'Inventaire :',
		value: inventory[1],
		inline: true
	},{
		name: `Date de création de l'utilisateur :`,
		value: userCreateDate[1] + ', ' + userCreateDate[2] + ', ' + userCreateDate[3] ,
		inline: true
	},{
		name: `Votre XP :`, 
		value: `${userxp[1]} XP`,
		inline: true
	}],
					image: {
				url: getvalueof.avatarURL
					},
						color: 0xE46525,
						footer: {
							text: bot.user.username,
							proxy_icon_url: ' '
						},

						author: {
							name: membername,
							icon_url: memberavatar,
							proxy_icon_url: ' '
						}
			}
		})}

	if (message.content.startsWith(prefix +"clear")) {
		let modRole = message.guild.roles.find("name", "Mod");
				if(!message.guild.roles.exists("name", "Mod")) {
			return  message.channel.sendMessage("", {embed: {
			title: "Erreur:",
			color: 0xff0000,
			description: " :no_entry_sign: Le rôle **Mod** n'existe pas dans ce serveur veuillez le créer pour Clear! :no_entry_sign: ",
			footer: {
				text: "Message par "+ bot.user.username
			}
			}}).catch(console.error);
		} 
		if(!message.member.roles.has(modRole.id)) {
			return   message.channel.sendMessage("", {embed: {
			title: "Erreur:",
			color: 0xff0000,
			description: " :no_entry_sign: Vous n'avez pas la permissions d'utiliser cette commande ! :no_entry_sign: ",
			footer: {
				text: "Message par "+ bot.user.username
			}
			}}).catch(console.error);
		}
		var args = message.content.substr(7);
		if(args.length === 0){
			message.channel.sendMessage("", {embed: {
			title: "Erreur:",
			color: 0xff0000,
			description: " :x: Vous n'avez pas précisser le nombre :x: ",
			footer: {
				text: "Message par "+bot.user.username
			}
			}});
		}
		else {
			var msg;
			if(args.length === 1){
			msg = 2;
		} else {
			msg = parseInt(args[1]);
		}
		message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
		message.channel.sendMessage("", {embed: {
			title: "Success!",
			color: 0x06DF00,
			description: "Messages Suprimé!",
			footer: {
			text: "Message par "+bot.user.username
			}
		}});
		}

		}else if (msgc.startsWith(prefix +'google')){
		const google = require("google");
		const unirest = require("unirest");
		
			if(msgc.substr(9)) {
			let query = msgc.substr(9);
				con(query);
			let num = (msgc.substr(9).lastIndexOf(" ") + 1);
			if(!query || isNaN(num)) {
				query = msgc.substr(9);
				num = 0;
			}
			if(num < 0 || num > 2) {
				num = 0;
			} else {
				num = parseInt(num);
			}
			unirest.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(query)}&key=${AuthDetails.youtube_api_key}&limit=1&indent=True`).header("Accept", "application/json").end(res => {
				const doSearch = () => {
				google(query, (err, res) => {
					if(err || res.links.length == 0) {
					message.channel.sendMessage("🙅 Pas de resultas!");
					} else {
					const results = [];
					if(num == 0) {
						num = 1;
					}
					for(let i=0; i < Math.min(res.links.length, num); i++) {
						if([`News for ${query}`, `Image pour ${query}`].indexOf(res.links[i].title)>-1) {
						res.links.splice(i, 1);
						i--;
						continue;
						}
					message.channel.sendMessage({
				embed: {
					type: 'rich',
					description: '',
					fields: [{
					name: 'Resulta Google',
					value: `[${res.links[i].title}](`+`${res.links[i].href})`,
					inline: true
					},{
					name: '** **',
					value: `${res.links[i].description}`,
					inline: true
					}],
					thumbnail: {
					url: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
						},
					color: 3447003,
					footer: {
					text: bot.user.username,
					proxy_icon_url: ' '
					}
				}
		});
					}
		
					}
				});
				};
				
				if(res.status == 200 && res.body.itemListElement[0] && res.body.itemListElement[0].result && res.body.itemListElement[0].result.detailedDescription) {
				message.channel.sendMessage(`\`\`\`${res.body.itemListElement[0].result.detailedDescription.articleBody}\`\`\`<${res.body.itemListElement[0].result.detailedDescription.url}>`).then(() => {
					if(num > 0) {
					doSearch();
					}
				});
				} else {
				doSearch();
				}
			});
			} else {
			con(`Parameters not provided for y/google command`);
			message.channel.sendMessage(` ❓❓❓`);
			}
		}
		if (message.content === prefix +'dog'){
			const randomPuppy = require("random-puppy");
			
					randomPuppy().then(url => {
					message.channel.sendMessage({
						embed: {
							author: {
								name: bot.user.username,
								icon_url: bot.user.avatarURL,
								url: "http://takohell.com:3000"
							},
							color: 0x00FF00,
							image: {
								url: url
							}
						}
					});
				});
			}

	if (message.content.startsWith(prefix + "logout")) {
		
				if(message.author.id == "285345858348646400"){
		
					message.channel.send("Arrêt en cour");
		
						console.log('/ Je suis désormais offline /');
		
						bot.destroy();
		
						process.exit()
		
				} else {
		
					message.channel.send("**Erreur** ! Tu n'es pas mon créateur")
		
				}
			}
		
			let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
			if (message.content.startsWith(prefix + "remafk")){
			if (afk[msg.author.id]) {
			delete afk[msg.author.id];
			if (msg.member.nickname === null) {
			msg.channel.send(" re, j'ai enlever votre afk ^^");
			}else{
			msg.channel.send(" re, j'ai enlever votre afk ^^");
			}
			fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
			}else{
			msg.channel.send("Erreur ! Tu es déjà afk");
			}
			}
			
			
			if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
			if (afk[msg.author.id]) {
			return message.channel.send("Erreur ! Tu es déjà afk -_-");
			}else{
			let args1 = msg.content.split(" ").slice(1);
			if (args1.length === 0) {
			afk[msg.author.id] = {"reason" : true};
			msg.delete();
			msg.channel.send(`tu es désormais afk, fait **${prefix}remafk** pour enlever ton afk`);
			}else{
			afk[msg.author.id] = {"reason" : args1.join(" ")};
			msg.delete();
			msg.channel.send(`tu es désormais afk, fait **${prefix}remafk** pour enlever ton afk`);
			}
			fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
			}
			}
					
					var mentionned = message.mentions.users.first();
			if(msg.mentions.users.size > 0) {
			if (afk[msg.mentions.users.first().id]) {
			if (afk[msg.mentions.users.first().id].reason === true) {
			message.channel.send(`@${mentionned.username} iest AFK: pas de raison`);
			}else{
			message.channel.send(`@${mentionned.username}  est AFK, réson : ${afk[msg.mentions.users.first().id].reason}`);
			}
			}
			}

			if(message.content.startsWith(prefix + "nouveauté")){
				
				(async function() {
				
				 const mainMessage = await message.channel.send("**Version du bot:**\n V.1.0.5");
				
				await mainMessage.react("✏");
				await mainMessage.react("🔨");
				await mainMessage.react("🔧");
				await mainMessage.react("🛑");
				
				const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
				 
				panier.on('collect', async(reaction) => 
				{
				 if (reaction.emoji.name === "✏") {
				
				mainMessage.edit("**Version du bot**:\n V.1.0.5");
				
				 }
				if (reaction.emoji.name === "🔨") {
				
				mainMessage.edit("**Ajout:**\nLa commande 'logout' a étais ajouté mais n'est disponible que pour le créateur du bot.\La commande 'eval' a étais ajouté mais n'est disponible que pour le créateur du bot.");
				 
				}
				if (reaction.emoji.name === "🔧") {

					mainMessage.edit("**Amélioration:**\nLa commande nouveauté a étais amélioré.\nLa commande help a étais amélioré.\La commande 'afk' est maintenant disponible.\nLa commande 'say' est disponible que pour le créateur du bot.")
				}
				if (reaction.emoji.name === "🛑") {
				
				mainMessage.delete()
				
				 }
				
				 await reaction.remove(message.author.id);
				
				});
				 }());
				}

				if(message.content.startsWith(prefix + "help")){
					
					(async function() {
					
					 const mainMessage = await message.channel.send("Voici la commande Help, clique sur les différent réaction pour voir les commandes !");
					
					await mainMessage.react("🔨");
					await mainMessage.react("📡");
					await mainMessage.react("💻");
					await mainMessage.react("🎰");
					await mainMessage.react("🎒");
					await mainMessage.react("📻");
					await mainMessage.react("➕");
					await mainMessage.react("🎉");
					await mainMessage.react("🛑");
					
					const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
					 
					panier.on('collect', async(reaction) => 
					{
					if (reaction.emoji.name === "🔨") {
					
					mainMessage.edit("**Les commandes pour les modérateurs:**\nLa commande 'mute <speudo>' qui permet de mute une personne spécifié.\nLa commande 'unmute <speudo>' qui permet d'unmute une personne spécifié.\nLa commande 'kick <speudo>' qui permet de kick une personne spécifié.\nLa commande 'ban <speudo>' qui permet de ban une personne spécifié.\nLa commande 'clear <nombre>' qui permet de supprimé un nombre de messages spécifié.");				
					 }
					if (reaction.emoji.name === "📡") {
					
					mainMessage.edit("**Les commandes de recherche:**\nLa commande 'google <recherche>' sert a faire une recherche sur google.\nLa commande 'wiki <recherche>' sert a faire une recherche sur wikipédia.\nLa commande 'méteo <ville> <pays>' sert a regardé la vidéo de votre ville.");					 
					}
					if (reaction.emoji.name === "💻") {
	
						mainMessage.edit("**Les intéractions:**\nSi vous dit 'Comment vas-tu bot ?', le bot vous répond (en dévellopement).\nSi vous dit 'ping', le bot vous répond pong + les ms du bot.")
					}
					if (reaction.emoji.name === "🎰") {

					mainMessage.edit("**Les commandes de jeux:**\nLa commande 'roll': Le bot choisit un nombre entre 1 et 100 et vous le dit.\nLa commande 'flip': Le bot lance la piece et vous dit si elle est tombé sur pile ou sur face.\nLa commande 'roulett': Le bot fait tourner la roulette et vous dit si la boulle est tombé sur le rouge, le noir ou le vert.")
					}
					if (reaction.emoji.name === "🎒") {
						
					mainMessage.edit("**Les commandes qui ont besoin d'être stocker:**\nLa commande 'newblague' qui permet d'ajouté une blague a la base de donnée.\nLa commande 'raconteuneblague', le bot raconte un blague.\nLa commande 'shop' pour voir les items disponible dans le shop.\nLa commande 'buyitem' qui permet d'acheté un objet disponible.")
					}
					if (reaction.emoji.name === "📻") {
						
					mainMessage.edit("**Les commandes informations:**\nLa commande 'info' permet de voir vos information.\nLa commande 'infobot' permet de voir les irformations du bot.\nLa commande 'niveau' pour voir votre niveau.\nLa commande 'up' pour voir depuis quand le bot est démaré.")
					}
					if (reaction.emoji.name === "➕") {
						
					mainMessage.edit("**Les commandes non répertorié**\nLa commande 'nouveauté' qui permet de voir les nouveautés.\nLa commande 'help' qui permet de voir les commandes.\nLa commande 'invitation' qui permet de voir l'invitation du bot.\nLa commande 'créateeur' qui permet de voir le créateur du bot.\nLa commande '8ball <question>' qui permet de poser une question au bot.\nLa commande 'dog', le bot envoi une image d'un chien.")
					}
					if (reaction.emoji.name === "🎉") {

					mainMessage.edit("**La commande spécial:**\nLa commande 'fetenoel <speudo>' permet de fêté noël a une personne spécifier.")
					}
					if (reaction.emoji.name === "🛑") {
					
					mainMessage.delete()
					
					 }
					
					 await reaction.remove(message.author.id);
					
					});
					 }());
					}

					if (msgc.startsWith(prefix + "infoserve")) {
						message.channel.send("", {
							embed: {
								color: 0xE15306, //La couleur que l'on voit sur le côté gauche de l'embed
								author: message.author.name,
				
								title: 'Informations sur le serveur', //Le titre de l'embed
								description: '', //La description, dans ce cas-ci mieux vaut la laisser vide
								fields: [
									{
										name: '**Nom**',
										value: message.guild.name,
										inline: true
					}, {
										name: '**Membres**',
										value: message.guild.memberCount,
										inline: true
					}, {
										name: '**Propriétaire**',
										value: message.guild.owner.user.tag,
										inline: true
					}, {
										name: '**Région**',
										value: message.guild.region,
										inline: true
					}, {
										name: '**ID**',
										value: message.guild.id,
										inline: true
								   }],
								thumbnail: {
									url: message.guild.iconURL //l'avatar du bot
								},
								timestamp: new Date(), //La date d'aujourd'hui
							}
						});
					};

					bot.on('guildMemberAdd', member => {
						member.guild.defaultChannel.send(":tada: Hey " + member + " ! Bienvenue sur " + member.guild.name + "!");
					});
					bot.on('guildMemberRemove', member => {
						member.guild.defaultChannel.send(":frowning: " + member.user.tag + " a quitté le serveur...");
					});

						function clean(text) {
							if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
							else return text;
	}
});

var messages = [];
bot.on('message', message => {
  const msgc = message.content;
   music.setVoiceChannel(message.member.voiceChannel);
    var array_msg = msgc.split(' ');
            messages.push(message);
            switch (array_msg[0]) {
        case (prefix +"play") :
            con("Play");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.voice();
            break;
        case (prefix +"pause") :
            con("Pause");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.pause();
            break;
        case (prefix + "resume") :
            con("Resume");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.resume();
            break;
        case (prefix + "stop") :
            con("Stop");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.stop();
            message.reply("La queue à était vidé !");
            break;
        case (prefix +"add") :
            con("Add");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            search(link, opts, function(err, results) {
                if(err) return con(err);
                for (var y = 0; results[y].kind == 'youtube#channel'; y++);
                message.channel.sendMessage(results[y].link);
                music.setTabEnd(results[y].link);
            });
            break;
        case (prefix +"link") :
            con("Link");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            con(link);
            music.setTabEnd(link);
            break;
        case (prefix +"volume") :
            con("Volume");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            music.volume(link/100);
            message.reply("le volume et maintenant à :" + link);
            break;
        case (prefix +"next") :
            con("Next");
            message.delete(message.author);
            if (music.getI() < music.getLengthTab()) music.setI(this.i + 1);
            if (music.getI() >= music.getLengthTab()) music.setI(0);
            music.next();
            break;
	} 
	/////////////////////////////////////

	if (msgc.startsWith('!youtube')){
		youtube_plugin.respond(message.content, message.channel , client);
	}
})
