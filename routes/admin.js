let express=require('express');
let router=express.Router();
const Admin=require('./../models/admin');
const AdminService=require('./../services/crud.service')();


router.get('/',(res,res,next)=>{
    AdminService
        .getAll()
        .then(admins=>{
            return res.json(admins);
        })
        .catch(err=>{
            return res.json(err);
        });
});

module.export=router;
