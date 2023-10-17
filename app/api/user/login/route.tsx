
import { NextRequest, NextResponse } from 'next/server'

import { generateGenericResponse, STATUS_CODE_NOT_FOUND, STATUS_CODE_OK } from '@/app/(utils)/_http'
import { prisma } from '@/app/db'

export async function POST(request: NextRequest) {
    let response = null;

    const reqBody = await request.json();
    const loginForm = reqBody as LoginForm;

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { 
                userName: loginForm.username,
                password: loginForm.password
            }
        });

        response = generateGenericResponse({isSuccess: true, message: "Login Successful", statusCode: STATUS_CODE_OK});
    } catch (exception) {
        response = generateGenericResponse({isSuccess: false, message: "Please enter a valid username or password.", statusCode: STATUS_CODE_NOT_FOUND});
    }

    return response;
}