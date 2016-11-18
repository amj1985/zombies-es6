export default class SignalRHub {
  constructor() {
    this.proxy = undefined;
    this.isHook = false;
    const $ = require("jquery");
    const signalR = require("ms-signalr-client");
    this._connect();
  }
  setParent(parent, isStage = false) {
    this.parent = parent;
    if (!this.isHook && isStage) {
      this._hookSignalEvents();
      this.isHook = true;
    } else {
      this._hookConnectionEvent();
    }
  }
  _connect() {
    let connection = $.hubConnection('http://zombieshub.azurewebsites.net/');
    this.proxy = connection.createHubProxy('ZombiesHub');
    this.proxy.on("NotifyEndGame", () => this._isEndGame());
    return new Promise((resolve, reject) => {
      connection.start().done(() => {
        console.log("zombiesGame connection established");
        const connectionId = connection.id;
        this.proxy.invoke("NotifyServerOn", connectionId);
        this.isConnected = true;
        resolve();
      }).fail((error) => {
        console.log(error);
        reject();
      });
    });
  }
  _hookSignalEvents() {
    this.proxy.on("NotifyLeftMove", (connectionId) => this.parent.onLeftPress(connectionId));
    this.proxy.on("NotifyRightMove", (connectionId) => this.parent.onRightPress(connectionId));
    this.proxy.on("NotifyUpMove", (connectionId) => this.parent.onUpPress(connectionId));
    this.proxy.on("NotifyAttack", (connectionId) => this.parent.onAttack(connectionId));
    this.proxy.on("NotifyStopMove", (connectionId) => this.parent.onStop(connectionId));
  }
  _hookConnectionEvent() {
    this.proxy.on("OnPlayerConnected", (connectionId) => {
      console.log("Player connected: " + connectionId);
      this.parent.onPlayerConnected(connectionId)
    });
  }
  _isEndGame(){
    // TODO doSomething
  }
}
