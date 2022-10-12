const Users = require('../../../model/Users')
module.exports = {
    getUser:async(args) => {

        const findEmail = await Users.findOne({email:args.email});
        if(findEmail){
            const updateData = await Users.updateOne({email:args.email},{
                name:args.name,
                phoneNumber:args.phoneNumber,
                address:args.address,
                city:args.city,
                state:args.state,
                country:args.country,
                updatedAt:new Date()
            })
            console.log(updateData);
        }else{
            const newUsers = new Users({
                email:args.email,
                name:args.name,
                phoneNumber:args.phoneNumber,
                address:args.address,
                city:args.city,
                state:args.state,
                country:args.country,
                createdAt:new Date(),
                updatedAt:new Date()
            })
            const saveUsers = await newUsers.save();
            console.log(saveUsers);
        }

    }
}