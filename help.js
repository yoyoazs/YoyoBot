const commands = module.exports = {
    'help': `
~help [command]
   Entré y/help plus le nom d'une commande pour plus d'information.`,

    'choose': `
~choose <arg1> | [arg2] ...
Choisit aléatoirement entre le (s) choix fourni (s).`,

    'prune': `
~prune <amount> [options]
   Supprimes <amount> de messages.
   Options:
      [--bots]            : Seulement les messages du bot.
      [--user <name>]     : Seulement les messages d'un utilisateur.
      [--filter <string>] : Seulement les messages avec un mot spécifier.
      [--pinned | -p]     : Suprimen aussi les messages épinglé.
      [--silent | -s]     : Supprime la commande et n'affiche pas les résultats.`,

    'role': `[Role Help]
~role give <role[,...]>  : Donne role(s).
~role take <role[,...]>  : Enleve role(s).
~role modify <role>      : Modifie un role.
#Options
give|take
   [--bots]              : Changer uniquement les rôles pour les bots.
   [--users]             : Changer uniquement les rôles pour les utilisateurs.
   [--user <user[,...]>] : Modifier uniquement les rôles pour les utilisateurs spécifiés.
   [--inrole <role>]     : Changer les rôles pour tout le monde avec ce rôle.
   [--notinrole <role>]  : Changer les rôles pour tout le monde sans ce rôle.
   [--noroles]           : Changer les rôles pour tout ceux qui n'ont pas de rôle.
modify
   [--name <name>]       : Rename un role.
   [--color <color>]     : Change de couleur un role. (6 digit HEX)`,

    'music': `
[Music Help]
~music | m <function>
   play <url> | <search> : Ajouté une musique/playlist a la liste.
   skip                  : Passé la musique.
   pause                 : Mêtre en pause la musique.
   resume                : Reprendre la musique.
   queue                 : Affiché la liste des musiques.
   purge                 : Clear la liste des musiques.
   np                    : Afficher la liste de la musique jouer.
   vol | v <0-100>       : Définit le volume.
   join                  : Le bot rejoin votre salon vocal.
   leave                 : Le bot quitte votre salon vocal.
Requires a #music text channel.`,

    'ban': `
~ban <mention> [options]
  Bannir l'utilisateur mentionné.
  Vous ne pouvez pas bannir les utilisateurs qui posséde un rôle supérieur a vous.
   Options:
      [--days <number>]   : Supprime l'historique des messages de l'utilisateur.
      [--reason <reason>] : Spécifie une raison pour bannir l'utilisateur.`,

    'kick': `
~kick <mention> [options]
   Kick l'utilisateur mentionné.
   Vous ne pouvez pas kick les utilisateurs qui posséde un rôle supérieur a vous.
   Options:
      [--reason <reason>] : Spécifie une raison pour kick l'utilisateur.`
}
