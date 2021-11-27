import Cookie from 'js-cookie';
import endpoint_res from '../resource/endpointresouce';

export default{
    auth(to, from, next){
            const token = Cookie.get('bank_token');
            console.log(token);
           
            if(!token){
              next('/login');  
            }
           
        fetch( endpoint_res.AUTH_ENDPOINT, { 
                method:'GET',
                 headers: {
                    'Content-Type':'application/json' ,
                    'Access':'application/json',
                    'Authorization' :'Bearer '+token
                  },
              })
              .then(response => response.json())
              .then( res => { 
                  if (typeof res.type !== 'undefined') {
                    Cookie.set('type_bank',res.type);
                  } 
              }).catch(error => {
                console.log('catch works e'+error);
                next('/login');
              });

            next();
    },

    authCustumer(to, from, next){
      const token = Cookie.get('bank_token');
      console.log(token);
     
      if(!token){
        next('/login');  
      }
     
  fetch( endpoint_res.AUTH_ENDPOINT, { 
          method:'GET',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            },
        })
        .then(response => response.json())
        .then( res => { 
            if ( res.type != 'customer') {
              throw "invalid type off user";
            } 
        }).catch(error => {
          console.log('catch works e'+error);
          next('/login');
        });

      next();
  },

  authAdmin(to, from, next){
    const token = Cookie.get('bank_token');
    console.log(token);
   
    if(!token){
      next('/login');  
    }
   
fetch( endpoint_res.AUTH_ENDPOINT, { 
        method:'GET',
         headers: {
            'Content-Type':'application/json' ,
            'Access':'application/json',
            'Authorization' :'Bearer '+token
          },
      })
      .then(response => response.json())
      .then( res => { 
          if ( res.type != 'admin') {
            throw "invalid type off user";
          } 
      }).catch(error => {
        console.log('catch works e'+error);
        next('/login');
      });

    next();
},



}