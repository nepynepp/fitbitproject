let Promise = require('bluebird');

const templateCrudService = (Model) => {
    return {
        getAll: () => {
            return new Promise((resolve,reject)=> {
                Model.find({},function(err,items){
                    if(err) reject(err);
                    return resolve(items);
                });
            });
        },
        getById: (id) => {
            return new Promise((resolve,reject)=> {
                Model.findOne({_id:id},function(err,item){
                    if(err) reject(err);
                    return resolve(item);
                });
            });
        },
        create: (event) => {
            return new Promise((resolve,reject)=> {
                Model.create(event, function (err, createdItem) {
                    if(err) reject(err);
                    return resolve(createdItem);
                });
            });
        },
        update: (id, item) => {
            const query = {'_id':id};
            let updateData = item;
            const options = {new:true}; //return updated data
            return new Promise((resolve,reject)=> {
                Model.findOneAndUpdate(query, updateData, options, function (err, updatedItem) {
                    if(err) reject(err);
                    return resolve(updatedItem);
                });
            });
        },
        delete: (id) => {
            const query = {'_id':id};

            return new Promise((resolve,reject)=> {
                Model.findOneAndRemove(query, function (err) {
                    if(err) reject(err);
                    return resolve(true);
                });
            });
        }
    };
};


module.exports = templateCrudService;