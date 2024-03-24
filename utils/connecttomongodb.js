import mongoose from "mongoose"

export async function Connecttomongodb(){
	try{
		await mongoose.connect(process.env.MONGODBURL, {
            dbName: "FULL-OS"
        });

	}catch(e){
		console.log('error while connecting to monghodb ')
		throw e ;
	}
	return ;
}