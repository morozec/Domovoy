import React from 'react'
import { Formik } from "formik";
import * as Yup from 'yup'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'


const ValidationRegisterForm = () => {

    const handleSubmit = (values, setSubmitting) => {
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
            } else {
                throw 'Ошибка авторизации'
            }
        }).then(data => {
            console.log(data)
        }).catch(ex => {
            alert(ex)
        })
    }



    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}

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
                                    className={errors.email && touched.email && 'error'}
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

                        <Button className='btn-block' type='submit' disabled={isSubmitting}>Зарегестрироваться</Button>
                    </Form>

                )
            }}

        </Formik>
    )
}

export default ValidationRegisterForm