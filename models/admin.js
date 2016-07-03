let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let bcrypt=require('bcrypt-nodejs');

let adminSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});


//validate
adminSchema.path('email').validate(function(email){
    return validateEmail(email);
},'Email is invalid');

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

adminSchema.pre('save',function(next){
    if(this.password) {
        var salt = bcrypt.genSaltSync(10);
        this.password  = bcrypt.hashSync(this.password, salt);
    }
    next();
});

let Admin=mongoose.model('Admin',adminSchema,'Admin');
module.exports=Admin;