import User from '../../models/User'
export const getCreatedEvents = async(req,res)=>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId).populate("createdEvents");
        const events = user.createdEvents;
        return res.status(200).json({events});
    }catch(e){
        return res.status(500).json({error:e});
    }
}