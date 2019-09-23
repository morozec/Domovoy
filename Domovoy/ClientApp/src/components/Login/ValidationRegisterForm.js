import React from 'react'
import { Formik } from "formik";
import * as Yup from 'yup'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'
import AuthHelper from './AuthHelper'


const ValidationRegisterForm = (props) => {

    const handleSubmit = (values, setSubmitting, setErrors) => {
        let data = {
            userName: values.email,
            password: values.password
        }

        fetch('api/Identity/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(response => {
            setSubmitting(false)            
            if (response.ok) {
                let rJson = response.json()
                return rJson
            } else if (response.status === 401) {
                throw 'Ошибка регистрации: пользователь с указанным email уже сущестувует'
            }
            else {
                throw 'Произошла ошибка. Попробуйте позже'
            }
        }).then(data => {
            AuthHelper.saveAuth(data.user_name, data.access_token)
            props.handleLogin()
        }).catch(ex => {            
            setErrors({auth:ex})
        })
    }



    return (
        <Formik
            initialValues={{ email: "", password: "", passwordConfirm:"" }}
            onSubmit={(values, { setSubmitting, setErrors }) => handleSubmit(values, setSubmitting, setErrors)}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Некорректный email')
                    .required('Обзательное поле'),
                password: Yup.string()
                    .required('Обзательное поле')
                    .min(8, 'Длина пароля должна быть не менее 8 символов')
                    .matches(/(?=.*[0-9])/, 'Некорректный пароль. Пароль должен содержать хотя бы одну цифру'),
                passwordConfirm: Yup.string()
                    .required('Обзательное поле')
                    .min(8, 'Длина пароля должна быть не менее 8 символов')
                    .matches(/(?=.*[0-9])/, 'Некорректный пароль. Пароль должен содержать хотя бы одну цифру')
                    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
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
                            <div>
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
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <Label for='password'>Пароль</Label>
                            <div>
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

                        <FormGroup>
                            <Label for='passwordConfirm'>Подтверждение пароля</Label>
                            <div>
                                <Input
                                    id='passwordConfirm'
                                    type='password'
                                    placeholder='Подтвердите пароль'
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.passwordConfirm && touched.passwordConfirm && 'error'}
                                />
                                {errors.passwordConfirm && touched.passwordConfirm && (
                                    <div className="input-feedback">{errors.passwordConfirm}</div>
                                )}
                            </div>
                        </FormGroup>      

                         {errors.auth && (
                            <div className="input-feedback">{errors.auth}</div>
                        )}                  

                        <Button className='btn-block' type='submit' disabled={isSubmitting}>Зарегестрироваться</Button>
                    </Form>

                )
            }}

        </Formik>
    )
}

export default ValidationRegisterForm