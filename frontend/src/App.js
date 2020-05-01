import React, { useState, useEffect } from 'react';

//Icones
import { PersonPin } from '@styled-icons/material/PersonPin'
import { PowerOff } from '@styled-icons/fa-solid/PowerOff'

//API Backend
import api from './service/apiBackend'

//Componente Mensagem
import Message from './Mensagem'

//CSS
import './App.css'

const App = () => {

    const [name, setName] = useState('')
    const [showInsertName, setInsertName] = useState(true) //change here
    const [users, setUsers] = useState([])
    const [limiteMsg, setLimiteMsg] = useState(0)

    const inputMessageBox = React.createRef()
    const inputLogin = React.createRef();
    
    const reloadPage = limiteMsg === 12 ? ' - Recarregue a pagina para resetar!' : ''

    const showUsers = users.map((IndexUser, index) => {
        return <Message key={index} data={IndexUser.date} name={IndexUser.name} hora={IndexUser.hour} message={IndexUser.message}></Message>
        
    })
    
    const handleForm = (e) => {
        if (name === '') {
            e.preventDefault()
            alert('Digite seu ID para entrar no CHAT!')
        } else {
            setInsertName(false)
        }
    }

    const handleSend = async (msg) => {

        if(limiteMsg !== 12){

            const dataPrepared = { name, message: msg }        
            const response  = await api.post('sendMessage', dataPrepared)
            
            //copy the values of state
            const copyofUsers = [...users];
            // add the object to the array
            copyofUsers.push(response.data)
            //set the new array of objects in users state

            setUsers(copyofUsers)
            setLimiteMsg(limiteMsg + 1)
        }else{
            alert('Limite de Mensagens Atingido. Recaregue a página para limpar o chat!')
        }
        
    }

    const validationKeyUP = (e) => {
        if(e.keyCode === 13 && e.target.id === 'messageBox'){
            const mensagem = e.target.value
            handleSend(mensagem)
            e.target.value = '';
        }else if( e.keyCode === 13 && e.target.id === 'login'){
            handleForm(e)
        }
    }

    const handleClickButtonMessage = () => {
        handleSend(inputMessageBox.current.value)
        inputMessageBox.current.value = '';
    }


    const pageInsertName =
        <div className="row taonciner">
            <div className="col s12 l12 center">
                <h4 className="flow-text">Insira seu ID</h4>
                <form>
                    <div className="col s12 l12">
                        <div className="input-field col s12 l2 offset-l5">
                            <input type="text" id="login" className="validate" placeholder="Ex: Diego Souza..." ref={inputLogin} onKeyUp={ (e) => {validationKeyUP(e)} } onChange={(e) => setName(e.target.value)}></input>
                            <label htmlFor="name">Nome</label>
                        </div>
                    </div>
                </form>
                <a className="btn" href="#!" onClick={(e) => handleForm(e)}>Logar no CHAT</a>
            </div>
        </div>

    const pageMessages = 
    <div className="row container">
        <div className="col s12 l12">
            <br/>
            <div className="col s12 l1 offset-l11">
               <PowerOff size={30} className="btnPowerOff" onClick={() => {setInsertName(true)}}></PowerOff>
            </div>

            <div className="col s12 l12">
                <p>Limite de Mensagens: <b>{limiteMsg}</b> de <b>12</b> <b className="reloadPage">{reloadPage}</b> </p>
            </div>

            <div className="col s12 l10 chatBox">
                <p className="headerMsg center">Histórico de Mensagens</p>
                <div className="divider"></div>
                <ul>
                    {showUsers}
                </ul>
            </div>

            <div className="col s12 l2 onlineUsers">
                <p className="flow-text"><PersonPin size={30} /> Current users</p>
                <p className="right"><span className="new badge green" data-badge-caption="online"></span>{name}</p>
            </div>

            <div className="col s12 l10">
                <div className="col s12 l10">
                    <form>
                        <input type="text" id="messageBox" ref={inputMessageBox} className="validate" placeholder="Mensagem...." onKeyUp={ (e) =>{ validationKeyUP(e) } } />
                    </form>
                </div>
                <div className="col s12 l2">
                    <a className="btn enviar left" type="submit" onClick={ () => {handleClickButtonMessage()} }>ENVIAR</a>
                </div>
                <br/>

            </div>

        </div>

    </div>



    return (
        showInsertName ? pageInsertName : pageMessages
    );
}

export default App;
