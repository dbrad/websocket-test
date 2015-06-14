function UserState(id, name, x, y, lastMsg) {
  this.id = id || 0;
  this.name = name || "";
  this.x = x || 400;
  this.y = y || 300;
  this.lastMsg = lastMsg || "";

  this.GFX = {
    container:  new PIXI.Container(),
    name:       new PIXI.Text("", {font : '16px Monospace', fill : 0x000000, stroke: 0xffffff, strokeThickness: 4}),
    sprite:     new PIXI.Sprite.fromImage("/images/user.png"),
    msg:        new PIXI.Text("", {font : '16px Monospace', fill : 0x000000, stroke: 0xffffff, strokeThickness: 4})
  };
  this.GFX.container.addChild(this.GFX.sprite);
  this.GFX.container.addChild(this.GFX.name);
  this.GFX.container.addChild(this.GFX.msg);

  this.GFX.sprite.anchor.x  = this.GFX.sprite.anchor.y  = 0.5;
  this.GFX.name.anchor.x    = this.GFX.name.anchor.y    = 0.5;
  this.GFX.msg.anchor.x     = this.GFX.msg.anchor.y     = 0.5;

  this.GFX.sprite.position.x = 0;
  this.GFX.sprite.position.y = 0;

  this.GFX.name.position.x = 0;
  this.GFX.name.position.y = 0;

  this.GFX.msg.position.x = 0;
  this.GFX.msg.position.y = 48;

  this.GFX.container.position.x = this.x;
  this.GFX.container.position.y = this.y;

  this.data = function() {
    var obj = {};
    obj.id      = this.id;
    obj.name    = this.name;
    obj.x       = this.x;
    obj.y       = this.y;
    obj.lastMsg = this.lastMsg;
    return obj;
  };
  this.updateData = function(data) {
    this.id       = data.id       || this.id;
    this.name     = data.name     || this.name;
    this.x        = data.x        || this.x;
    this.y        = data.y        || this.y;
    this.lastMsg  = data.lastMsg  || this.lastMsg;
  }
};
