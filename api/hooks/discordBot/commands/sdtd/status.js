const Commando = require('discord.js-commando');
const findSdtdServer = require('../../util/findSdtdServer.js');

class Status extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'status',
      group: 'sdtd',
      memberName: 'status',
      description: '',
      details: "Show server status",
    });
  }

  async run(msg, args) {
    let sdtdServer = await findSdtdServer(msg);
    let serverInfo = await sails.helpers.loadSdtdserverInfo(sdtdServer.id);
    let playerInfo = await sails.helpers.loadPlayerData(sdtdServer.id)

    let onlinePlayers = playerInfo.players.filter(player => {
      return player.online
    })

    let onlinePlayersStringList = new String();

    onlinePlayers.forEach(player => {
      onlinePlayersStringList += `${player.name}, `
    });

    let embed = new this.client.customEmbed()

    embed.setTitle(`${serverInfo.name} - status`)
      .addField(`Gametime`, `${serverInfo.stats.gametime.days} days ${serverInfo.stats.gametime.hours} hours ${serverInfo.stats.gametime.minutes} minutes`, true)
      .addField(`${serverInfo.stats.hostiles} hostiles`, `${serverInfo.stats.animals} animals`, true)
      .addField(`${serverInfo.stats.players} players online`, onlinePlayersStringList.length > 0 ? onlinePlayersStringList : "None")

    msg.channel.send(embed)
  }

}


module.exports = Status;
