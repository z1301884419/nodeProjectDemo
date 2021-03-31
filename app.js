const express=require('express');
const logger=require('morgan');
const favicon=require('serve-favicon');
const LoginRouter=require('./router/LoginRouter');
const cartRouter=require('./router/cartRouter');
const manRouter=require('./router/manRouter');
const orderRouter=require('./router/orderRouter');
const womanRouter=require('./router/womanRouter');
const yyRouter=require('./router/yyRouter');



const app=express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
// ruter引用处
app.use(LoginRouter);
app.use(cartRouter);
app.use(manRouter);
app.use(orderRouter);
app.use(womanRouter);
app.use(yyRouter);

app.use(express.static(__dirname+'/src'));
app.use(favicon(__dirname+'/src/images/view_3.png'));

app.listen(8888,()=>{
    console.log('第三组项目服务器开启~');
})