const Admin=require('./../models/admin');
const defaultAdmin={
    email:'admin@gmail.com',
    password:'admin'
};

function createAdmin() {
    Admin
        .create(defaultAdmin)
        .then(result=>{
            console.log('[+] Create admin:',result);
        })
        .catch(err=>{
            console.error(err);
    });
    
}

module.exports=createAdmin;