import { ResponseGeneric } from "@/app/(models)/_response_generic";
import { BadRequestError } from "@/app/(utils)/_error";
import { generateGenericResponse, STATUS_CODES } from "@/app/(utils)/_http";
import { MailerSupportConfig, Mailer } from "@/app/(utils)/_mailer";
import { VALIDATOR, VALIDATOR_FORMAT } from "@/app/(utils)/_validator";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    let response = null;

    const reqBody = await request.json();
    const contactUsForm = reqBody as ContactUsForm;
    
    try {
        // validation
        VALIDATOR.validate(contactUsForm.fullName, { label: 'Full Name', formName: 'fullname' }, { notEmpty: true, minLength: 1, format: VALIDATOR_FORMAT.ALPHABETS_ONLY});
        VALIDATOR.validate(contactUsForm.email, { label: 'Email Address', formName: 'email' }, { format: VALIDATOR_FORMAT.EMAIL});
        VALIDATOR.validate(contactUsForm.message, { label: 'Message', formName: 'message'}, {notEmpty: true, minLength: 10})

        Mailer.sendMailToSupport({
            from: contactUsForm.email,
            html: '<h2>Sender:</h2><h2>Full Name: ' + contactUsForm.fullName + '</h2><h2>Email: ' + contactUsForm.email + '</h2><div>' + contactUsForm.message + '</div>'
        } as MailerSupportConfig)

        response = generateGenericResponse({isSuccess: true, message: "Message sent. Please wait for our team's response.", statusCode: STATUS_CODES.OK} as ResponseGeneric);
    } catch (error) {
        if (error instanceof BadRequestError) {
            response = generateGenericResponse({isSuccess: false, message: error.message, statusCode: error.statusCode, metadata: error.metadata} as ResponseGeneric);
        } else {
            response = generateGenericResponse({isSuccess: false, message: 'Failed contact administrator', statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR, metadata: {}} as ResponseGeneric);
        }
    }

    return response;
}