'use strict';

const topic = 'player.inventory.list';

/**
 * Class representing a command instructing the game to provide the contents of the player's inventory.
 */
class ListInventoryCommand {

  constructor() {
    this.topic = topic;
    this.data = {};
  }

  static get topic() {
    return topic;
  }
}

module.exports = ListInventoryCommand;