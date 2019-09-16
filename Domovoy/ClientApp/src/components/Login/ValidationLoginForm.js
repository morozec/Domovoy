import React from 'react'
import { Formik } from "formik";
import * as EmailValidator from 'email-validator'
import * as Yup from 'yup'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'
import './ValidationLoginForm.css'

const ValidationLoginForm = () => (
    <Formik
        initialValues={{ email: "", password: "" }}        
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log('logging in', values)
                setSubmitting(false)
            }, 500)
        }
        }
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
                .email()
                .required('Обзательное поле'),
            password: Yup.string()
                .required('Обзательное поле')
                .min(8, 'Длина пароля должна быть не менее 8 символов')
                .matches(/(?=.*[0-9])/, 'Некорретный пароль. Пароль должен содержать хотя бы одну цифру')
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
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input
                            id='email'
                            placeholder='Введите адрес электронной почты'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && 'error'}
                        />
                        {errors.email && touched.email && (
                            <div className='input-feedback'>{errors.email}</div>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label for='password'>Пароль</Label>
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
                    </FormGroup>

                    <Button type='submit' disabled={isSubmitting}>Войти</Button>
                </Form>
            )
        }}

    </Formik>


)

export default ValidationLoginForm