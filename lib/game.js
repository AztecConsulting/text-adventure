'use strict';

const EventEmitter = require('events');

class Game extends EventEmitter {
  constructor(gameDefinition, nodeMap, commandHandlers) {
    super();
    this._gameDefinition = gameDefinition;
    this._nodeMap = nodeMap;
    this._commandHandlers = commandHandlers;
  }

  get currentNode() {
    return this._currentNode;
  }

  set currentNode(node) {
    this._currentNode = node;
  }

  start() {
    this.emit('game-started', { text: this._gameDefinition.welcome });

    this.currentNode = this._nodeMap.get(0); // by convention, the 0 id will be assigned to the entry node;
    this.emit('player-moved', { previousNode: null, currentNode: this.currentNode });
  }

  acceptCommand(command) {
    for (const handler of this._commandHandlers) {
      if (handler.canHandle(command)) {
        handler.handle(command, this);
        return;
      }
    }

    this.emit('error', `unrecognized command "${command.command}".`);
  }
}

module.exports = Game;