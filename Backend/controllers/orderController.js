import orderModel from "../models/orderModel.js";

export const updateStatusController = async(req,res)=>{
    try {
        const {status} = req.body;
        const updatedStatus = await orderModel.bulkWrite(
            status.map(updateStatus=>({
                updateOne:{
                    filter:{ _id: updateStatus.key},
                    update:{$set:{status:updateStatus.value}}
                }
            }))
        )
        res.send({
            message:"updated",
            updatedStatus
        })
    } catch (error) {
        res.status(500).send(
        {
            success:false,
            message:"error in updating status",
            error
        })
    }
}