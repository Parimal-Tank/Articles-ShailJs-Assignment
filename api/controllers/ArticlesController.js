/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    // GET ALL Articles
    list: async function(req , res){
       await Articles.find({}).exec(function(error , articles) { 
            if(error){
                res.send(500 , {error : 'Database Error'});
            }
           res.view('pages/list' , { articles : articles})
        })
    },
    add: async function(req ,  res){
        res.view('pages/add');
    },
    create: async function(req , res){
        let title = req.body.title;
        let body = req.body.body;

      await  Articles.create({title : title , body : body}).exec(function(error) {
            if(error){
                res.send(500 , {error: 'Database Error'})
            }
            res.redirect('/articles/list');
        })
    },
    delete: async function(req , res){
       await Articles.destroy({id: req.params.id}).exec(function(error){
            if(error){
                res.send(500 , {error: 'Database Error'})
            }
            res.redirect('/articles/list');
        });
        return false;
    },
    edit: function(req , res){
        Articles.findOne({id : req.params.id}).exec(function(error , articles){
            if(error){
                res.send(500 , {error: 'Database Error'})
            }
            res.view('pages/edit' , { article : articles});
        })
    },
    update: async function(req , res){
        let title = req.body.title;
        let body = req.body.body;

      await  Articles.update({id: req.params.id} , {title : title , body : body}).exec(function(error) {
            if(error){
                res.send(500 , {error: 'Database Error'})
            }
            res.redirect('/articles/list');
        })
    }   
};

