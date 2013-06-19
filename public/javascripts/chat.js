window.onload = function(){
    var socket = io.connect('http://localhost:3000');
    // socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' });
    // });

    var chatForm = document.getElementById("chat-form");
    chatForm.onkeypress = function(evt) {
        if(evt.keyCode == 13){
            socket.emit('msg', { message: chatForm.value });
            chatForm.value = "";
        }
    };
};
