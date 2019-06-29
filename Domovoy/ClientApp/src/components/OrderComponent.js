import React from 'react'
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap'

export default class UserRequestModal extends React.Component{
    render(){

        let title, modalFooter 
        if (this.props.isNewUserRequest){
            title = 'Новая заявка'
            modalFooter =
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Отмена</Button>   
                    <Button color="primary" onClick={this.props.handleSubmit}>Создать заявку</Button>   
                </ModalFooter>
            
        }
        else{
            title = 'Открытая заявка'
            modalFooter =  
                <ModalFooter><Button color="secondary" onClick={this.props.toggle}>Закрыть</Button></ModalFooter>
        }

        return(
            <Modal isOpen={this.props.isUserRequestFromShown} toggle={this.props.toggle} onClosed={this.props.handleClose}>
                <ModalHeader toggle={this.props.toggle}>
                    {title}
                </ModalHeader>
                <ModalBody>

                    <Form>
                        <FormGroup>
                            <Label for="userName">Имя</Label> 
                            <Input type="text" name="userName" id="userName" disabled={!this.props.isNewUserRequest}
                                value={this.props.userName} onChange={this.props.handleChange} placeholder="Введите свое имя" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userTel">Телефон</Label> 
                            <Input type="tel" name="userTel" id="userTel" disabled={!this.props.isNewUserRequest}
                                value={this.props.userTel} onChange={this.props.handleChange} placeholder="Введите свой номер телефона" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="requestHeader">Название заявки</Label> 
                            <Input type="text" name="requestHeader" id="requestHeader" disabled={!this.props.isNewUserRequest}
                                value={this.props.requestHeader} onChange={this.props.handleChange} placeholder="Введите название заявки" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="requestBody">Описание заявки</Label> 
                            <Input type="textarea" name="requestBody" id="requestBody" disabled={!this.props.isNewUserRequest}
                                value={this.props.requestBody} onChange={this.props.handleChange} placeholder="Опишите свою заявку" />
                        </FormGroup>                      
                    </Form>                   
                   
                  
                </ModalBody>
                          
                {modalFooter}
                
            </Modal> 
        )
    }
}