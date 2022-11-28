const nome = document.getElementById('nome')
const email = document.getElementById('email')
const mensagem = document.getElementById('mensagem')
const formulario = document.getElementById('form')
const btn = document.getElementById('enviar')
const expresao = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventos()
function eventos(){
     document.addEventListener('DOMContentLoaded', btnDisabled)

     nome.addEventListener('blur', formularioEnviar)
     email.addEventListener('blur', formularioEnviar)
     mensagem.addEventListener('blur', formularioEnviar)

     formulario.addEventListener('submit, enviarMail')
}

function btnDisabled(){
      btn.disabled = true
}

function formularioEnviar(e){
      const error = document.querySelector('p.error')
      if(error){
      error.remove()
      }
      if(e.target.value.length > 0){
          e.target.classList.remove('invalido')
          e.target.classList.add('valido')
      } else {
          e.target.classList.remove('valido')
          e.target.classList.add('invalido')

          mensagemError('Todos os campos são obrigatorios')
      }
      if(e.target.type === 'email'){
         
      if(expresao.test(e.target.value)){
        const error = document.querySelector('p.error')
        if(error){
        error.remove()
        }
          e.target.classList.remove('invalido')
          e.target.classList.add('valido')
      } else {
        e.target.classList.remove('invalido')
        e.target.classList.add('valido')
        mensagemError('Email nao valido')
        }
      }
      if((expresao.test(email.value) !== '' && nome.value !== '' && mensagem.value !== '')){
          btn.disabled = false
      }
}

function mensagemError(mensagem){
      const errorMensagem = document.createElement('p')
      errorMensagem.textContent = mensagem
      errorMensagem.classList.add('mensagemInvalido', 'error')

      

      const erros = document.querySelectorAll('.error')
      if(erros.length === 0){
        formulario.appendChild(errorMensagem)
      }
      
}

function enviarEmail(e){
      e.preventDefault()

      const loader = document.getElementById('spinner')
      loader.style.opacity = 1
      
      setTimeout( ()=> {
        loader.style.opacity = 0
        const mensagem = document.createElement('p')
        mensagem.textContent = 'Mensagem enviado!'
        mensagem.classList.add('enviado')

        formulario.insertBefore(mensagem, spinner)

        setTimeout(() => {
             mensagem.remove()
             apagarFormulario()
        }, 2000)
      },2000)

}
function apagarFormulario(){
    formulario.reset()
}
