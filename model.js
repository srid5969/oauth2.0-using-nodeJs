const clients = [
    {
      clientId: '1234',
      clientSecret: '5678',
      redirectUris: ['http://localhost:3000/callback'],
    },
  ];
//   const async = require('async');

  const users = [
    {
      id: '123',
      username: 'john',
      password: 'password',
    },
  ];
  
  const model = {
    getAccessToken:async ()=>{
      var tokenExpires = new Date();
      console.log("vbnm,");
      tokenExpires.setDate(tokenExpires.getDate() + 1);

      var token = { user:{}, accessTokenExpiresAt: tokenExpires };
     
          return token;
        
    },
    getClient: async (clientId, clientSecret) => {

      const client = clients.find((c) => c.clientId === clientId);
  client.grants=['password']
      if (!client) {
        return false;
      }
  
      if (client.clientSecret !== clientSecret) {
        return false;
      }
  
      return client;
    },
  
    grantTypeAllowed: async (clientId, grantType) => {
      console.log(clientId);
      if (grantType === 'password') {
        return true;
      }
  
      return false;
    },
  
    getUser: async (username, password) => {
        const user = users.find(
        (u) => u.username === username && u.password === password
      );
  
      if (!user) {
        return false;
      }
  
      return user;
    },
  
    saveToken: async()=>{
      return { accessToken: 1234, client:'1', refreshToken:"refreshToken",user: {username:"sridhar"} };

    }
  }  
  module.exports=model;