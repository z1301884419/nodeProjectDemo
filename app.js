const express=require('express');
const logger=require('morgan');
const favicon=require('serve-favicon');
const LLrouter=require('./router/llLoginRouter');

const app=express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
// ruter引用处
app.use(LLrouter);

app.use(express.static(__dirname+'/src'));
app.use(favicon(__dirname+'/src/images/view_3.png'));

app.listen(8888,()=>{
    console.log('第三组项目服务器开启~');
})