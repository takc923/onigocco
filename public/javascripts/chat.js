window.onload = function(){
    var socket = io.connect('http://localhost:3000');
    socket.on('msg:stream:' + location.pathname, function (data) {
        console.log(data);
        var messageElement = document.createElement("div");
        messageElement.innerHTML = data.message;
        document.getElementById("message-container").appendChild(messageElement);
    });

    var chatForm = document.getElementById("chat-form");
    chatForm.onkeypress = function(evt) {
        if(evt.keyCode == 13){
            socket.emit(
                'msg:send',
                { message: chatForm.value, id: location.pathname }
            );
            chatForm.value = "";
        }
    };
};
