var regexResult = location.pathname.match(/([0-9]+)\/([a-zA-Z0-9]+)$/);
var chatId = regexResult[1];
var user = regexResult[2];
window.onload = function(){
    var socket = io.connect(location.origin);
    socket.json.emit("init", {chatId: chatId});
    socket.on('msg:stream', function (data) {
        console.log(data);
        var messageElement = document.createElement("div");
        messageElement.innerHTML = data.user + ": " + data.message;
        document.getElementById("message-container").appendChild(messageElement);
    });

    var chatForm = document.getElementById("chat-form");
    chatForm.onkeypress = function(evt) {
        if(evt.keyCode == 13){
            socket.emit(
                'msg:send',
                { message: chatForm.value, chatId: chatId , user: user}
            );
            chatForm.value = "";
        }
    };
};

