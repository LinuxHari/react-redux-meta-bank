const userModel = require('../model/dbSchema')

exports.login = async (req, res) => {
    try {
      const { username, nid } = req.body
      const user = await userModel.findOne({ username });
  
      if (!user) {
        res.status(401).json({message:"Invalid username/password"});
        return;
      }
  
      const isNIDValid = nid == user.nid? true : false
  
      if (!isNIDValid) {
        res.status(401).json({message:"Invalid username/password"})
      }
      else{
      req.session.username = username
      res.json({username,balance:user.balance})
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error:${error}`)
    }
  };

  exports.auth = async(req,res) => {
      if(req.session.username){
        res.json({isLoggedIn:true});
      }
      else{
        res.send("Have not logged yet")
      }
  }

  exports.deposit = async(req,res) => {
      const amount = parseInt(req.body.amount)
      const username = req.session.username
      if(amount && username){
        try{
          const user = await userModel.findOne({username})
          const balance = user.balance + amount
          const history = [...user.history,{date:new Date(Date.now()).toLocaleString(),action:'Deposit',amount,status:'Completed'}]
          await userModel.findOneAndUpdate({username},{balance,history})
          res.json({balance})
        }
        catch(error){
          res.status(500).send(`Internal Server Error:${error}`);
        }
      }
      else{
          res.status(401).send('Unauthorized action');
      }
  }

  exports.withdraw = async(req,res) => {
    const amount = parseInt(req.body.amount)
    const username = req.session.username
    if(amount && username){
      try{
        const user = await userModel.findOne({username})
        const balance = user.balance - amount
        if(balance >= 0){
          const history = [...user.history,{date:new Date(Date.now()).toLocaleString(),action:'Withdraw',amount,status:'Completed'}]
          await userModel.findOneAndUpdate({username},{balance,history})
          res.json({balance})
        }
        else{
          const history = [...user.history,{date:new Date(Date.now()).toLocaleString(),action:'Withdraw',amount,status:'Failed'}]
          await userModel.findOneAndUpdate({username},{history})
          res.status(401).json({message:"Insufficient balance"})
        }
      }
      catch(error){
        res.status(500).send(`Internal Server Error:${error}`);
      }
    }
    else{
        res.status(401).send('Unauthorized action');
    }
}

exports.history = async(req,res) => {
    if(req.session.username){
      try{
        const user = await userModel.findOne({username:req.session.username},{history:{$slice:-5}})
        res.json(user.history)
      }
      catch(error){
        res.status(401).send(error)
      }
    }
    else{
      res.status(401).send("User is unauthorized")
    }
}

exports.logout = async(req,res) => {
    if(req.session.username){
      try{
        req.session.destroy()
        res.send('Logout Successfull')
      } catch(error){
        res.status(401).send(error)
      }
    }
    else{
        res.status(401).send("User is unauthorized")
    }
}