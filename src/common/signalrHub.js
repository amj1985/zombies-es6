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
      this._hookSignalEvents(parent);
      this.isHook = true;
    } else {
      this._hookConnectionEvent();
    }
  }
  _connect() {
    let connection = $.hubConnection('http://localhost:53316');
    this.proxy = connection.createHubProxy('ZombiesHub');
    this.proxy.on("NotifyEndGame", () => this._isEndGame());
    return new Promise((resolve, reject) => {
      connection.start().done(() => {
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
  _hookSignalEvents(parent) {
    this.proxy.on("NotifyLeftMove", () => this.parent.onLeftPress(connectionId));
    this.proxy.on("NotifyRightMove", () => this.parent.onRightPress(connectionId));
    this.proxy.on("NotifyUpMove", () => this.parent.onUpPress(connectionId));
    this.proxy.on("NotifyAttack", () => this.parent.onAttack(connectionId));
  }
  _hookConnectionEvent() {
    this.proxy.on("OnPlayerConnected", (connectionId) => {
      console.log("connection stablished");
      this.parent.onPlayerConnected(connectionId)
    });
  }
  _isEndGame(){
    // TODO doSomething
  }
}
