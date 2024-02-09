

module.exports = (role) => {
    return (req,res,next)=>{
      if(!role.includes(req.currentUser.role)){
        return res.status(403).json({ error: 'Not Authorized' });
      }
      next()
    }
}
