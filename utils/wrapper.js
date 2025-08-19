 const wrapper = (thefunction) => {
    const mynew = async (req, res, next) => {
        try{
            thefunction(req, res);
        } catch(err){
            res.status(500).json({message: err.message});
        }
    };
    return mynew;
}

module.exports = wrapper;