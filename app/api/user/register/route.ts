
import { NextRequest, NextResponse } from 'next/server'

import { generateGenericResponse, STATUS_CODES } from '@/app/(utils)/_http'
import { prisma } from '@/app/db'
import { ROLES } from '@/app/(models)/_user';
import bcryptjs from "bcryptjs";
import { InputInfo, VALIDATOR, VALIDATOR_FORMAT } from '@/app/(utils)/_validator';
import { BadRequestError, ErrorParams } from '@/app/(utils)/_error';
import { ResponseGeneric } from '@/app/(models)/_response_generic';

export async function POST(request: NextRequest) {
    let response = null;

    const reqBody = await request.json();
    const registerForm = reqBody as RegisterForm;

    try {
        // @todo registerForm should have a function "validate" that contains all validation for all its fields. instead of doing each validation in this place
        // validation
        VALIDATOR.validate(registerForm.firstName, { label: 'First Name', formName: 'firstname' }, { notEmpty: true, minLength: 1, format: VALIDATOR_FORMAT.ALPHABETS_ONLY});
        VALIDATOR.validate(registerForm.lastName, { label: 'Last Name', formName: 'lastname' }, { notEmpty: true, minLength: 1, format: VALIDATOR_FORMAT.ALPHABETS_ONLY});
        VALIDATOR.validate(registerForm.email, { label: 'Email Address', formName: 'email' }, { format: VALIDATOR_FORMAT.EMAIL});
        VALIDATOR.validate(registerForm.username, { label: 'Username', formName: 'username' }, { notEmpty: true, minLength: 4, format: VALIDATOR_FORMAT.USERNAME});
        VALIDATOR.validate(registerForm.password, { label: 'Password', formName: 'password' }, { format: VALIDATOR_FORMAT.PASSWORD});
        VALIDATOR.validateUsingCustomFunction(registerForm.confirmPassword, { label: 'Confirm Password', formName: 'confirm_password' }, (value: string, inputInfo: InputInfo): void => {
            const errorMessage = 'Passwords did not match.'
            if (value !== registerForm.password) {
                throw new BadRequestError({ message: errorMessage, metadata: { formName: inputInfo.formName } } as ErrorParams);
            }
        });

        // check if username already exists
        const userWithUsername = await prisma.users.findFirst({where: {username: registerForm.username}});
        if (userWithUsername !== null) throw new BadRequestError({ message: 'Username already exists.', metadata: { formName: 'username' } } as ErrorParams);

        // check if email already exists
        const userWithEmail = await prisma.users.findFirst({where: {email: registerForm.email}});
        if (userWithEmail !== null) throw new BadRequestError({ message: 'Email already exists.', metadata: { formName: 'email' } } as ErrorParams);

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(registerForm.password, salt)

        await prisma.users.create({
            data: { 
                username: registerForm.username,
                password: hashedPassword,
                email: registerForm.email,
                firstname: registerForm.firstName,
                lastname: registerForm.lastName,
                role: ROLES.ROLE_USER.toString()
            }
        });

        response = generateGenericResponse({isSuccess: true, message: "Registration successful! Redirecting you to login page...", statusCode: STATUS_CODES.OK} as ResponseGeneric);
    } catch (error) {
        if (error instanceof BadRequestError) {
            response = generateGenericResponse({isSuccess: false, message: error.message, statusCode: error.statusCode, metadata: error.metadata} as ResponseGeneric);
        } else {
            response = generateGenericResponse({isSuccess: false, message: 'Failed to register', statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR, metadata: {}} as ResponseGeneric);
        }
    }

    return response;
}