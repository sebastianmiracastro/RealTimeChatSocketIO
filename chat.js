exports.login = ctx => {
    ctx.socket.user = ctx.data;
    console.log('login: ', ctx.socket.user);
    return ctx.io.emit('login', {
        user: ctx.socket.user,
        time: new Date()
    });
};

exports.message = ctx => {
    console.log('Message:', ctx.data);
    ctx.io.emit('message', {
        user: ctx.socket.user,
        text: ctx.data,
        time: new Date()
    });
};

exports.logout = ctx => {
    console.log('Logout:', ctx.socket.user);
    if (!ctx.socket.user) return;
    return ctx.io.emit('logout', {
        user: ctx.socket.user,
        time: new Date()
    });
};