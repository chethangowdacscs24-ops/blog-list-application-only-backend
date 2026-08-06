// const express = require('express');
const app= require('./app');

const config = require('./utils/config')
app.listen(config.PORT,(res,req)=>{
    console.log(`server listning at PORT ${config.PORT}`);
})


