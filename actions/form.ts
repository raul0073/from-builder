'use server';
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schema/form";
import { currentUser } from "@clerk/nextjs";
import { trace } from "console";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()        
    }
    

    const stats = await prisma.form.aggregate({
        where: {
            userID: user.id,
        },
        _sum: {
            visitis: true,
            submissions: true
        }
    })

    const vistis = stats._sum.visitis || 0;

    const submissions = stats._sum.submissions || 0;
    let submissionsRate = 0

    if(vistis > 0){
        submissionsRate = (submissions / vistis) * 100

    }
    const bounceRate = 100 - submissionsRate

    return {
        vistis, submissions, submissionsRate, bounceRate
    }
}


export async function createForm(data: formSchemaType){
    try {
        const validate = formSchema.safeParse(data)
        if(!validate.success){
            throw new Error("Form is invalid")
        }

        const user = await currentUser()
        if(!user){
            throw new UserNotFoundErr()
        }

        const form = await prisma.form.create({
            data: {
                userID: user.id,
                name: data.name,
                description: data.description 
            }
        })
        if(!form) {
            throw new Error('Something went wrong, check form')
        }
        return form.id
    } catch (error) {
        
    }
}



export async function GetForms(){
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    return prisma.form.findMany({
        where: {
            userID: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

}