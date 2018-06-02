const request = require('request')

module.exports = {
  // Find Stats off of the args sent
  ftn: function(msg, args){
    let platform = args[0]
    if(platform) platform = platform.toLowerCase()
    const username = args.slice(1,args.length).join('%20')

    if(platform !== 'psn' && platform !== 'pc' && platform !== 'xbl' || platform === undefined){
      msg.reply(`
      La platforme n'est pas correcte.
      éssaye comme ceci:
      y/ftn pc yoyoazs
      y/ftn xbl kopejordan23
      y/ftn psn yoyoazs
      `)
      return null;
    }
    else if(username === undefined){
      msg.reply(`
      Speudo non défini.
      éssaye comme ceci:
      y/ftn platform username
      y/ftn pc yoyoazs
      `)
      return null;
    }

    const options = {
      'uri': `https://api.fortnitetracker.com/v1/profile/${platform}/${username}`,
      'headers': {
        'TRN-Api-Key': process.env.FTOKEN,
        'Content-Type': 'application/json'
      }
    }

    request(options, (err, res, body) => {
      if(err){
        console.error(err)
        msg.reply(`There was a problem getting stats for ${username.replace('%20', ' ')} on ${platform}.`)
        return null
      }
      else if(res.statusCode === 200){
        data = JSON.parse(body)

        let soloWins = 0
        let soloKd = 0
        let soloKill = 0
        let soloMatch = 0
        let duoWins = 0
        let duoKd = 0
        let duoKill = 0
        let duoMatch =0
        let squadWins = 0
        let squadKd = 0
        let squadKill = 0

        // Player Not Found
        if(data.error){
          msg.reply(`${data.error}`)
          return null
        }

        // Solo
        if(data.stats.p2){
          soloWins = data.stats.p2.top1.displayValue
          soloKd = data.stats.p2.kd.valueDec
          soloKill = data.stats.p2.kills.displayValue
          soloMatch = data.stats.p2.matches.displayValue
        }

        // Duos
        if(data.stats.p10){
          duoWins = data.stats.p10.top1.displayValue
          duoKd = data.stats.p10.kd.valueDec
          duoKill = data.stats.p10.kills.displayValue
          duoMatch = data.stats.p10.matches.displayValue
    } 
        
        // Squad 
        if(data.stats.p9){
          squadWins = data.stats.p9.top1.displayValue
          squadMatch = data.stats.p9.matches.displayValue
          squadKd = data.stats.p9.kd.valueDec
          squadKill = data.stats.p9.kills.displayValue
        }

        // The most important line of code.
        const user = username.replace(/b/ig, '🅱').replace('%20', ' ')

        msg.channel.send('', { embed: {
            corlor: 543756,
            author: {
                name: msg.author.tag,
                icon_url: msg.author.avatarURL,
            },
            title: `Stats de ${user} sur ${platform}`,
            url: '',
            fields: [
                {
                name: `Solo:`, 
                value: `${user} a fait ${soloWins} top1 pour un K/D r de ${soloKd} (${soloKill} kills pour ${soloMatch} parties)`
                },
                {
                name: 'Duo:',
                value: `${user} a fait ${duoWins} top1 pour un K/D r de ${duoKd} (${duoKill} kills pour ${duoMatch} parties)`
                },
                {
                name: `Squad:`,
                value: `${user} a fait ${squadWins} top1 pour un K/D r de ${squadKd} (${squadKill} kills pour ${squadMatch} parties)`
                },
            ],
            footer: {
                icon_url: msg.author.avatarURL,
                text: msg.author.tag			
            },
        }})
    }else {
        msg.reply(`Une erreur inconue a étais rencontré !`)
        return null
      }
    })
  }
}
