import userModel from './../models/userModel.js';

// add items to user cart
const addToCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1 
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:'Added to cart'});
    } catch (error) {
       console.log(error) ;
       res.json({success:false,message:'Error'});
    }
}

// remove items to user cart
const removeFromCart = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'Removed from cart'});
    } catch (error) {
        console.log(error) ;
       res.json({success:false,message:'Error'});
    }
}

// fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error) ;
        res.json({success:false,message:'Error'});
    }
}
// const getCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         if (!userId) {
//             return res.status(400).json({ success: false, message: 'User ID is required' });
//         }

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const cartData = userData.cartData; // Assuming cartData is a field in the user document.
//         res.json({ success: true, cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };


export {addToCart, removeFromCart, getCart}
