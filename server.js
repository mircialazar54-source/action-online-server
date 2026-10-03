const WebSocket = require("ws");
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });
let waiting = null;

function send(ws, obj){ if(ws && ws.readyState===1) ws.send(JSON.stringify(obj)); }

wss.on("connection", ws => {
  ws.room = null;
  ws.on("message", raw => {
    let msg; try { msg=JSON.parse(raw); } catch { return; }

    if(msg.type === "find_match"){
      if(waiting && waiting.readyState===1 && waiting !== ws){
        const room = "room_" + Math.random().toString(36).slice(2);
        ws.room = room; waiting.room = room;
        send(waiting,{type:"match_found",player:1,room});
        send(ws,{type:"match_found",player:2,room});
        waiting=null;
      } else waiting=ws;
      return;
    }

    if(msg.type === "state" && ws.room){
      for(const peer of wss.clients){
        if(peer !== ws && peer.room === ws.room)
          send(peer,{type:"state",player:msg.player,x:msg.x,hp:msg.hp});
      }
    }

    if(msg.type === "attack" && ws.room){
      for(const peer of wss.clients){
        if(peer !== ws && peer.room === ws.room)
          send(peer,{type:"attack",player:msg.player});
      }
    }
  });

  ws.on("close",()=>{ if(waiting===ws) waiting=null; });
});
console.log("Action Online server listening on port",PORT);
