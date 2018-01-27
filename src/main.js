function main()
{
    var message = {}
    message.type = "test"
    message.data = "hello"

    var ws = new WebSocket("ws://localhost:8080/wstest");
    //called when the websocket is opened
    ws.onopen = function() {
        ws.send(JSON.stringify(message));
    };
    //called when the client receives a message
    ws.onmessage = function (evt) {
        alert(JSON.stringify(evt.data));
    };
}