import React from 'react'
import { Formik } from "formik";
import * as EmailValidator from 'email-validator'
import * as Yup from 'yup'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'
import AuthHelper from './AuthHelper'
import classnames from 'classnames'

const ValidationLoginForm = (props) => {

    const handleSubmit = (values, setSubmitting, setErrors) => {       
        let data = {
            userName: values.email,
            password: values.password
        }

        fetch('api/Identity/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response)
            setSubmitting(false)
            if (response.ok) {
                let rJson = response.json()
                return rJson
            } else if (response.status === 401){
                throw 'Ошибка авторизации: неверный email или пароль'
             }else {
                throw 'Произошла ошибка. Попробуйте позже'
            }
        }).then(data => {
            AuthHelper.saveAuth(data.user_name, data.access_token)
            props.handleLogin()
        }).catch(ex => {            
            setErrors({auth:ex})
            //errors.emailPassword = true
        })
    }



    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting, setErrors }) => handleSubmit(values, setSubmitting, setErrors)}
            //********Handling validation messages yourself*******/
            // validate={values => {
            //     let errors = {}
            //     if (!values.email) {
            //         errors.email = "Обзательное поле"
            //     } else if (!EmailValidator.validate(values.email)) {
            //         errors.email = "Некорректный email"
            //     }

            //     const passwordRegex = /(?=.*[0-9])/;

            //     if (!values.password) {
            //         errors.password = "Обзательное поле"
            //     } else if (values.password.length < 8) {
            //         errors.password = "Длина пароля должна быть не менее 8 символов"
            //     } else if (!passwordRegex.test(values.password)) {
            //         errors.password = "Некорретный пароль. Пароль должен содержать хотя бы одну цифру"
            //     }

            //     return errors
            // }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Некорректный email')
                    .required('Обзательное поле'),
                password: Yup.string()
                    .required('Обзательное поле')
                    .min(8, 'Длина пароля должна быть не менее 8 символов')
                    .matches(/(?=.*[0-9])/, 'Некорректный пароль. Пароль должен содержать хотя бы одну цифру')
            })}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (

                    <Form onSubmit={handleSubmit}>
                        <FormGroup className='row'>
                            <Label for='email' className='col-sm-3 col-form-label'>Email</Label>
                            <div className='col-sm-9'>
                                <Input
                                    id='email'
                                    placeholder='Введите адрес электронной почты'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={classnames({ error: errors.email && touched.email })}
                                />
                                {errors.email && touched.email && (
                                    <div className='input-feedback'>{errors.email}</div>
                                )}
                            </div>
                        </FormGroup>

                        <FormGroup className='row'>
                            <Label for='password' className='col-sm-3 col-form-label'>Пароль</Label>
                            <div className='col-sm-9'>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Введите пароль'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password && 'error'}
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </div>
                        </FormGroup>

                        {errors.auth && (
                            <div className="input-feedback">{errors.auth}</div>
                        )}

                        <Button className='btn-block' type='submit' disabled={isSubmitting}>Войти</Button>
                    </Form>

                )
            }}

        </Formik>
    )
}

export default ValidationLoginForm