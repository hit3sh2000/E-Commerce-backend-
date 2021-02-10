const JWT = require('jsonwebtoken')
const { model } = require('mongoose')
const client = require('./init_redis')


//for assigning a Access Token
module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) =>{
            
            const payload={}
            const secret = "079d8c37cb8039d01b9ab2c9dc1f89f5eddc02ea15b80ece2a09620cce4d34bd"
            const options = {
                expiresIn:"35s",
                issuer: 'hitesh',
                audience: userId
            }
            
            JWT.sign(payload, secret, options, (err, token)=>{
                if(err)return reject(err)
                resolve(token)
            })
        })
    },

    //for verify a Access Token
    verifyAccessToken:(req,res,next) =>{
         if(!req.headers['authorization']) return next()
         const authHeader = req.headers['authorization']
         const bearerToken = authHeader.split(' ');
         const token = bearerToken[1]
         JWT.verify(token, "079d8c37cb8039d01b9ab2c9dc1f89f5eddc02ea15b80ece2a09620cce4d34bd", (err, payload) =>{
             if(err){ return next(err);}
             req.payload = payload
             next()
         })
    },

    //for assigning Refresh Token
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) =>{
            
            const payload={}
            const secret = "322e3b843e183ecaafa2683c31b6cf905170bf75360eb133bf2f73190f60d317"
            const options = {
                expiresIn:"1y",
                issuer: 'hitesh',
                audience: userId
            }
            
            JWT.sign(payload, secret, options, (err, token)=>{
                if(err)return reject(err)

                
                client.SET(userId, token, (err, reply) => {
                    if (err) {
                      console.log(err)
                      reject(err)
                      return
                    }
                    resolve(token)
                  })
            })
        })  
    },
  // for verify a Refresh Token
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) =>{
            JWT.verify(refreshToken,"322e3b843e183ecaafa2683c31b6cf905170bf75360eb133bf2f73190f60d317",(err,payload)=>{
                if(err) return reject(err)
                const userId = payload.aud

                client.GET(userId, (err, result) => {
                    if (err) {
                      console.log(err.message)
                      reject(err)
                      return
                    }
                    if (refreshToken === result) return resolve(userId)
                    reject(err)
                  })

                resolve(userId)
            })
        })
    }
}