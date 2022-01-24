exports.postCar = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data:{
                
            }
        })
    } catch (error) {
        res.status(404).json({ 
            status:"failed",
            error: error.message
        })
    }
}



