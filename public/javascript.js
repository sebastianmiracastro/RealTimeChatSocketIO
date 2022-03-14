var socket = io();

var escape = function(html) {
    return $('<div>').text(html).html();
};

$('#login').modal({ dismissible: false }).submit(function (e) {
    e.preventDefault();
    var user = $('#login input').val();

if (!user) return;
cookies({ user });
$('#login').modal('close');
socket.emit('login', user);
setTimeout(function(){ $('#message').focus(); }, 500);
});

if (cookies('user')) {
    socket.emit('login', cookies('user'));
    setTimeout(function(){ $('#message').focus(); }, 500);
} else {
    $('#login').modal('open');
}

$('.logout').click(function(){
    cookies({ user: null });
    window.location.reload();
});



var add = function(html) {
    var toScroll = $('.messages').prop("scrollHeight") - 50 < $('.messages').scrollTop() + $('.messages').height();
    $('.messages').append(html);

if (toScroll) {
    $('.messages').stop(true).animate({
    scrollTop: $('.messages').prop("scrollHeight")
}, 500);
}
};


$('form.message').submit(function(e){
    e.preventDefault();
    var $input = $(e.target).find('input');
    var text = $input.val();

$input.val('');

socket.emit('message', text);
});


socket.on('login', function(message) {
    add('<div class="msg login">\
    <span class="user">' + escape(message.user) + '</span> logged in.\
    </div>');
});

socket.on('message', function(message) {
    add('<div class="msg">\
    <span class="user">' + escape(message.user) + ':</span> \
    <span class="msg">' + escape(message.text) + '</span>\
    </div>');
});

socket.on('logout', function(message) {
    add('<div class="msg logout">\
    <span class="user">' + escape(message.user) + '</span> logged out.\
    </div>');
});