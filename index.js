const Discord = require("discord.js"),
	low = require('lowdb'),
	FileSync = require('lowdb/adapters/FileSync'),
	weather = require("weather-js"),
	Wiki = require("wikijs"),
	fs = require("fs"),
	express = require("express"),
	app = express(),
	con = console.log;
	adapter = new FileSync('database.json'),
	config = new FileSync('config.json'),
	db = low(adapter),
	apiController = require('./api-controller.js');
	const Yoyo = require('kaori');
	const yoyo = new Yoyo();
	LESVRAIS = "LESVRAIS";


	idéeadapter = new FileSync('idéebase.json'),
	dbi = low(idéeadapter)

	dbi.defaults({ idées: []}).write()
	

	const bot = new Discord.Client();
	var prefix = ("y/");
	var randnum = 0;

	bot.on(("ready"), ()=> {
		bot.user.setPresence({ game: { name: '[y/help] créé par yoyoazs77'}})
		console.log("☻Bot démarré !!☻")
	});
	

	bot.login(process.env.TOKEN);

	bot.on("message", message => {
		if (message.channel.type === "dm") 
			return;

		if (message.author.id === "392942526551818241") {
			message.channel.send("Tu est ban du bot.")
			return;
		}
		const logd = bot.channels.get('507533548606193666');
		const arg = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = arg.shift().toLowerCase();
		var args = message.content.substring(prefix.length).split(" ")

		var msgauthor = message.author.tag;

		if(message.author.bot)return;

		if(message.content.startsWith(prefix + "rule34")) {
			if(message.channel.name ==='nsfw'){
				let r34 = args[1]
				yoyo.search('rule34', { tags: [r34], limit: 1, random: true })
				.then(images => message.channel.send(images[0].common.fileURL))
	
			} else{
				message.channel.send("Cette commande est interdite dans tout salons sauf nsfw")
			}

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
					value: 'Yoyoazs77#6197'
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
				logd.sendMessage( message.author.id + "a utilisé la commande **flip** et il est tombé sur pil !")
				message.reply("La pièce est tombé sur pil !");
			} else if (result == 2) {
				logd.sendMessage( message.author.id + "a utilisé la commande **flip** et il est tombé sur face !")
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
		
		if (message.content.startsWith(prefix + "ping")) {
			message.channel.send('Pong...').then((msg) => {
				msg.edit(`Pong! La latence est de ${msg.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(bot.ping)}ms`);
		
		})
	}
	
		if (!message.content.startsWith(prefix)) return;

		switch (args[0].toLowerCase()){

			case "idée":	
			var value = message.content.substr(7);
			var author = message.author.username;
			var number = dbi.get('idées').map('id').value();
			message.reply("Votre idée a bien étais ajouté a liste, merci de votre participation pour amélioré le bot.")

			dbi.get('idées')
				.push({ idée_value: value, idée_author: author })
				.write();
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



			case "météo":
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
								logd.sendMessage( message.author.id + "a utilisé la commande **météo** mais le bot ne peut pas trouvé d'information pour la ville" + location)
								} else {
								data = data[0];
								message.channel.send("\n" + "**" + data.location.name + " Maintenant : **\n" + data.current.temperature + "°" + unit + " " + data.current.skytext + ", ressentie " + data.current.feelslike + "°, " + data.current.winddisplay + " Vent\n\n**Prévisions pour demain :**\nHaut: " + data.forecast[1].high + "°, Bas: " + data.forecast[1].low + "° " + data.forecast[1].skytextday + " avec " + data.forecast[1].precip + "% de chance de precipitation.");
							}
						});
					} catch(err) {
						console.logd(Date.now(), "ERREUR", "Weather.JS a rencontré une erreur");
						message.reply("Idk pourquoi c'est cassé tbh :(");
						}
					}


		var msgauthor = message.author.tag;
		const msgc = message.content;
		

	if(message.content === prefix +"info") {
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
		name: `Date de création de l'utilisateur :`,
		value: userCreateDate[1] + ', ' + userCreateDate[2] + ', ' + userCreateDate[3] ,
		inline: true
	},
],
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

 if (msgc.startsWith(prefix +'google')){
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
			message.channel.send(`@${mentionned.username} est AFK: pas de raison`);
			}else{
			message.channel.send(`@${mentionned.username}  est AFK, réson : ${afk[msg.mentions.users.first().id].reason}`);
			}
			}
			}

			if(message.content.startsWith(prefix + "nouveauté")){
				(async function() {
				
				 const mainMessage = await message.channel.send("**Version du bot:**\n V.1.3.0");
				
				await mainMessage.react("✏");
				await mainMessage.react("🔨");
				await mainMessage.react("🔧");
				await mainMessage.react("🛑");
				
				const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
				 
				panier.on('collect', async(reaction) => 
				{
				 if (reaction.emoji.name === "✏") {
				
				mainMessage.edit("**Version du bot**:\n V.1.3.0");
				
				 }
				if (reaction.emoji.name === "🔨") {
				
				mainMessage.edit("**Ajout:**\nLa commande 'ftn' a étais ajouté.\nLa 'plateforme' a étais ajouté.");
				 
				}
				if (reaction.emoji.name === "🔧") {

					mainMessage.edit("**Amélioration:**\nPlusieur commande ont étais supprimé.")
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
					await mainMessage.react("🎮");
					await mainMessage.react("📻");
					await mainMessage.react("➕");
					await mainMessage.react("🎉");
					await mainMessage.react("🛑");
					
					const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
					 
					panier.on('collect', async(reaction) => 
					{
					if (reaction.emoji.name === "🔨") {
					
					mainMessage.edit("**Les commandes pour les modérateurs:**\nLa commande 'mute <speudo>' qui permet de mute une personne spécifié.\nLa commande 'unmute <speudo>' qui permet d'unmute une personne spécifié.\nLa commande 'kick <speudo>' qui permet de kick une personne spécifié.\nLa commande 'ban <speudo>' qui permet de ban une personne spécifié.");				
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
					if (reaction.emoji.name === "🎮") {
						
					mainMessage.edit("**Les commandes qui conserne les jeux vidéo:\nLa commande 'ftn' <plateforme> <speudo> permet de voir les stats fornite d'une personne.\mLa commande 'plateforme' pertmet de vous assigné un rôle qui correspond a votre plateforme de jeu")
					}
					if (reaction.emoji.name === "📻") {
						
					mainMessage.edit("**Les commandes informations:**\nLa commande 'infoserve' permet de voir les infos du serveur sur le quel vous êtes.\nLa commande 'info' permet de voir vos information.\nLa commande 'infobot' permet de voir les irformations du bot.\nLa commande 'niveau' pour voir votre niveau.\nLa commande 'up' pour voir depuis quand le bot est démaré.")
					}
					if (reaction.emoji.name === "➕") {
						
					mainMessage.edit("**Les commandes non répertorié**\nLa commande 'nouveauté' qui permet de voir les nouveautés.\nLa commande 'help' qui permet de voir les commandes.\nLa commande 'invitation' qui permet de voir l'invitation du bot.\nLa commande 'créateeur' qui permet de voir le créateur du bot.\nLa commande '8ball <question>' qui permet de poser une question au bot.\nLa commande 'dog', le bot envoi une image d'un chien.\nLa commande 'rule34' utilisable que dans un salon nfsw.")
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
						logd.sendMessage( message.author.id + "a utilisé la commande **infoserve**")
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

						if(msg.content.startsWith('y/')){
						  // Removes the ! from the command
						  let command = msg.content.slice(2,msg.content.length)
					  
						  // Separate out the command from arguments
						  let args = command.split(' ')
						  command = args[0]
						  args = args.slice(1, args.length)
					  
						  switch(command){
							case 'ftn':
							  apiController.ftn(msg, args)
							  break; 
						  }
						}	


if (message.content.startsWith(prefix + "idés")){

	var idée = message.content.substr(9);
    var num = Math.floor((Math.random() * 9999999) + 1);
    var author = message.author.tag
	var plt = bot.channels.get('507533548606193666');
	message.delete
	plt.sendMessage('', { embed: {
		color: 16711680,
		author: {
			name: bot.user.username,
			icon_url: bot.user.avatarURL,
		},
		title: '',
		url: '',
		fields: [
			{
				name: `Idée déposser par ${author}`,
				value: `${idée}`,
			},
		],
		footer: {
			icon_url: '',
			text: `Idée numéro ${num}`
	},
	}})
		message.reply("Votre idée a bien étais prise en compte.")
		
}

if (message.content.startsWith(prefix + "plateforme")){
	let platform = args[1]

	if(!platform) {
		return message.channel.send("Cette commande vous permet de vous ajouté un grade qui correspond a votre plateforme sur la quelle vous jouez !\n Pour le grade PC: y/plateforme PC\n Pour le grade PS4: y/plateforme PS4\n Pour le grade Xbox: y/plateforme Xbox\n Pour le grade Switch: y/plateforme Switch\n Pour le grade Mobil: y/plateforme Mobil.");
	}

	if (platform == 'PC'){
		let PC = message.guild.roles.find('name','PC💻');
		if(message.member.roles.find('name', 'PC💻')){
			message.member.removeRole(PC)
			message.reply("Le role PC💻 vous a bien étais retiré !")
			return;
		}else{
			message.member.addRole(PC)
			message.reply("Le role PC💻 vous a bien étais attribué")
			return;
		}
	
	}
	if (platform == 'PS4'){
		let PS4 = message.guild.roles.find('name', 'PS4🎮');
		if(message.member.roles.find('name', 'PS4🎮')){
			message.member.removeRole(PS4)
			message.reply("Le role PS4🎮 vous a bien étais retiré !")
			return;
		}else{
			message.member.addRole(PS4)
			message.reply("Le role PS4🎮 vous a bien étais attribué")
			return;
		}
	
	}
	if (platform == 'Xbox'){
		let Xbox = message.guild.roles.find('name', 'XBOX🕹');
		if(message.member.roles.find('name', 'XBOX🕹')){
			message.member.removeRole(Xbox)
			message.reply("Le role XBOX🕹 vous a bien étais retiré !")
			return;
		}else{
			message.member.addRole(Xbox)
			message.reply("Le role XBOX🕹 vous a bien étais attribué")
			return;
		}
	
	}
	if (platform == 'Switch'){
		let Switch = message.guild.roles.find('name', 'Switch 🖲');
		if(message.member.roles.find('name', 'Switch 🖲')){
			message.member.removeRole(Switch)
			message.reply("Le role Switch 🖲 vous a bien étais retiré !")
			return;
		}else{
			message.member.addRole(Switch)
			message.reply("Le role Switch 🖲 vous a bien étais attribué")
			return;
		}
	}
	if (platform == 'Mobil'){
		let Mobil = message.guild.roles.find('name', 'Tel📱')
		if(message.member.roles.find('name', 'Tel📱')){
			message.member.removeRole(Mobil)
			message.reply("Le role Tel📱 vous a bien étais retiré !")
			return;
		}else{
			message.member.addRole(Mobil)
			message.reply("Le role Tel📱 vous a bien étais attribué")
			return;
		}
	}

	if (platform  ===! 'PC'||'PS4'||'Xbox'||'Mobil'||'Switch'){
		return message.channel.send("Vous avez peut-être fait une faute de frappe ? Les seulles plateforme disponibles sont: PC, PS4, Xbox, Switch et Mobil.")
	}
}

 })					  
