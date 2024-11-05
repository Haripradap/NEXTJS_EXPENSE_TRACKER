import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
    const user = await currentUser();
    
    

    //check for current logged in clerk user
    if(!user){
        return null;
    }

    //check if user is logged in aldready in the db
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId:user.id,
        }
    });

    //if user is in db return user
    if(loggedInUser){
        return loggedInUser;
    }

    //if not in db create a user
    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newUser;
}