
import { NextRequest, NextResponse } from 'next/server'

import { generateGenericResponse, STATUS_CODE_NOT_FOUND, STATUS_CODE_OK } from '@/app/(utils)/_http'
import { prisma } from '@/app/db'
import { ROLES } from '@/app/(models)/_user';
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    let response = null;

    const reqBody = await request.json();
    const registerForm = reqBody as RegisterForm;

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(registerForm.password, salt)

    

    try {
        const user = await prisma.users.create({
            data: { 
                username: registerForm.username,
                password: hashedPassword,
                email: registerForm.email,
                firstname: registerForm.firstName,
                lastname: registerForm.lastName,
                roles: ROLES.SIMPLE_USER.toString()
            }
        });

        response = generateGenericResponse({isSuccess: true, message: "Registration successful!", statusCode: STATUS_CODE_OK});
    } catch (exception) {
        console.log(exception);
        response = generateGenericResponse({isSuccess: false, message: "Some invalid message when registering.", statusCode: STATUS_CODE_NOT_FOUND});
    }

    return response;
}