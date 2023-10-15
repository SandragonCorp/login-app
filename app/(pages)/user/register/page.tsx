import { Button } from "@/app/components/Input/Button"
import { TextField } from "@/app/components/Input/TextField"
import style from './register.module.css'

export default function Register() {
    return (
        <>
            <div className="page_register">
                <div className={`page_wrapper ${style.page_wrapper}`}>
                    <h1 className="page_title">Register</h1>
                    <br/>
                    <br/>
                    <TextField placeholder="Username"></TextField>
                    <br/>
                    <TextField placeholder="Password"></TextField>
                    <br/>
                    <Button text="Register" className="primary"></Button>
                </div>
            </div>
        </>
    )
}