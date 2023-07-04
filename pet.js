const input = require("prompt-sync")({sigint:true});
//Cria as classes usadas no algorito, além da classe Date
class Cliente{
    idCliente;
    nomeCliente;
    numPets;
    pets = [] //apenas ID's
    fidelizado = false;
    numConsultas = 0

    constructor(idCliente,nomeCliente,numPets,pets){
        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.pets = pets;
        this.numPets = numPets
    }
}
class Funcionario{
    idFunc;
    user;
    senha;

    constructor(idFunc,user,senha){
        this.idFunc = idFunc;
        this.user = user;
        this.senha = senha;
    }
}
class Animal{
    idPet;
    nomePet;
    nomeDono;


    constructor(idPet,nomePet,nomeDono,){
        this.idPet = idPet;
        this.nomePet = nomePet;
        this.nomeDono = nomeDono;
    }

}
class Consulta{
    idConsulta;
    nomeCliente;
    nomeAnimal;
    nomeFunc;
    status = "Pendente"
    data;

    constructor(idConsulta,nomeCliente,nomeAnimal,nomeFunc,data){
        this.idConsulta = idConsulta;
        this.nomeCliente = nomeCliente;
        this.nomeAnimal = nomeAnimal;
        this.nomeFunc = nomeFunc;
        this.data = data;
    }
}
class Sistema{
    //Arrays de objetos no sistema
    funcionarios = []
    clientes = []
    pets = []
    consultas = []

    //Iniciar
    main(){
        var continuar = true;
    
        while (continuar) {
            //Print iniciar
            console.log('Iniciar:');
            console.log('1. Fazer Login');
            console.log('2. Fazer Cadastro');
            console.log('3. Sair do Programa');
            var opcao = input('Selecione uma opção: ');
            //Tratamento da opção
            switch (opcao) {
                case '1':
                    this.loginFuncionario()
                    break;
                case '2':
                    this.cadastrarFuncionario()
                    break;
                case '3':
                    console.log('Encerrando o programa...');
                    continuar = false;
                    break;
                default:
                    console.log('Opção inválida. Tente novamente.');
                    break;
            }
            // Linha em branco para separar as iterações do menu
            if (continuar) {
                console.log('\n'); 
            }
        } 
    }

    //Tela funcionário
    telaFuncionário(usuario){
        var continuar = true

        while(continuar){ //Print tela MENU
            console.log(`   
Bem-vindo,${usuario.user}!
-----------MENU------------
1. Ver meus dados
2. Modificar meus dados
3. Ver lista de Clientes
4. Ver lista de Pets
5. Ver lista de Consultas
6. Ver lista de Funcionários
7. Marcar Consulta
8. Mudar Status de Consulta
9. Remover Cliente
10. Remover Pet
11. Cancelar Consulta
12. Remover Funcionário
13. Fazer Logout`);
            var opcaoInicio = parseInt(input("Digite uma opão: "))
            console.log("\n");
            switch(opcaoInicio) {
                //Tratamento de opção e chamada de função para cada opção
                case 1:
                    this.verDadosFuncLogado(usuario);
                    break;
                case 2:
                    let mod = this.modificarDadosFuncLogado(usuario)
                    if(mod!=undefined){
                        usuario = mod
                        console.log(this.verDadosFuncLogado(usuario))
                    }
                    break;
                case 3:
                    this.mostrarClientes()
                    break;
                case 4:
                    this.mostrarPets()
                    break;
                case 5:
                    this.mostrarConsultas()
                    break;
                case 6:
                    this.mostrarFuncionarios()
                    break;
                case 7:
                    this.marcarConsulta(usuario);
                    break;
                case 8:
                    // Código para a opção 8
                    break;
                case 9:
                    // Código para a opção 9
                    break;
                case 10:
                    // Código para a opção 10
                    break;
                case 11:
                    // Código para a opção 11
                    break;
                case 12:
                    var deletando = this.deletarFuncionario(usuario)
                    if(deletando == usuario){
                        console.log("Removendo usuário e encerrando sessão...")
                        let indice = this.funcionarios.indexOf(deletando)
                        if(indice!==-1){
                            this.funcionarios.splice(indice,1)
                        }
                        continuar = false
                    }
                    else if(deletando!=undefined){
                        let indice = this.funcionarios.indexOf(deletando)
                        if(indice!==-1){
                            this.funcionarios.splice(indice,1)
                            console.log("Usuário removido")
                        }    
                    }
                    break;                    
                case 13:
                    continuar = false
                    break
                default:
                    console.log("Opção Inválida.")
                    break;
            }
            // Linha em branco para separar as iterações do menu
            if (continuar) {
                console.log('\n'); 
            }                        
        }
    }





    //MANIPULAR FUNCIONARIO
    cadastrarFuncionario(){
        //pega novo usuario
        var novoUser = input("Digite um novo nome de usuário: ")
        //verifica senha
        var senha = true
        while(senha == true){
            var novaSenha = input("Digite a nova senha: ");
            let verificar = input("Digite confirme a senha: ")
            if (verificar!=novaSenha){
                console.log("As senhas não coincidem.")
                continue
            }
            break     
        }
        //gera id
        var novoID = Math.floor(Math.random() * 9000) + 1000;
        
        //Adiciona ao Array de Funcionarios
        var novoFunc = new Funcionario(novoID,novoUser,novaSenha)
        this.funcionarios.push(novoFunc);

        //Imprime as informaões do novo cadastro
        console.log(`Funcionário cadastrado.\nUsuário: ${novoUser}\nID: ${novoID}`)

    }
    
    loginFuncionario(){
        while(true){
            var id = parseInt(input("Insira o ID: "))
            //Procura o usuário no sistema
            var encontrado = false
            if (!(this.funcionarios.some(funcionario => funcionario.idFunc == id))){
                console.log("Usuário não cadastrado.")
                return
            }else{
                break
            }
        }     
        //procura o usuario pelo ID
        for(var i=0; i < this.funcionarios.length; i++){
            if(id == this.funcionarios[i].idFunc){
                var usuario = this.funcionarios[i];
                break
            }
        }
        //Verifica a senha
        while(true){  
            var senha = input("Insira a senha: ")
            if (senha == usuario.senha){
                return this.telaFuncionário(usuario)

            }else{
                console.log("Senha incorreta.")
            }   
        }
    }                    

    verDadosFuncLogado(usuario){
        let dados = `
Meu dados:
Usuário: ${usuario.user}
ID: ${usuario.idFunc}
Senha: ${usuario.senha}`
        return console.log(dados)
    }

    modificarDadosFuncLogado(usuario){
        console.log(`
O que deseja modificar?
1. Nome de Usuário
2. Senha
3. Volar`)
        var modifica = parseInt(input("Digite uma opção: "))

        switch(modifica){
            case 1://Muda usuário
                usuario.user = input("Digite o novo nome do usuário: ")
                break
            case 2://Muda senha
                usuario.senha = input("Digite a nova senha: ")
                break
            case 3:
                return 
            default:
                console.log("Oção inválida.")

        }
        return usuario

    }

    mostrarFuncionarios(){
        if(this.funcionarios.length == 0){ //Verifica se há funcionários
            console.log("Nenhum Funcionário Cadastrado")
        }
        else{
            this.funcionarios.sort();//Coloca em ordem algabética
            for(let i=0; i<this.funcionarios.length; i++){
                console.log(this.funcionarios[i].user)
            }
        }
    }
    
    deletarFuncionario(usuario){
        var continuar = true

        while(continuar){

            var deletando = input("Digite o usuario que quer deletar: ")
            //Verifica se o usuario existe
            if (!(this.funcionarios.some(funcionario => funcionario.user == deletando))){
                console.log("Usuário não cadastrado.")
            }
            else{ //Existe...
            
                //verificar se é o próprio usuario
                if(deletando==usuario.user){
                    var certeza = input("Tem certeza que gostaria de deletar seu próprio usuário? [s/n]: ")
                    //Confirmar apagar próprio usuário
                    if(certeza == 's'){
                        deletando = usuario
                    }
                    else{
                        return deletando = undefined
                    }
                //Não é o proprio usuário
                }
                else{
                    //Busca o obj func com o usuario inserido
                    for(var i=0; i < this.funcionarios.length; i++){
                        if(deletando == this.funcionarios[i].user){
                            deletando = this.funcionarios[i]
                            break
                        }
                    }
                }  
                continuar = false

            }          
        }
        return deletando //Retorna o obj Func a ser removido
    }






    //Manipular Cliente

    mostrarClientes(){
        //Verifica se há clientes cadastrados
        if(this.clientes.length == 0){
            console.log("Nenhum Cliente Cadastrado")
        }
        //Havendo, imprime
        else{
            this.clientes.sort(); //Cploca em ordem alfabética
            for(let i=0; i<this.cleintes.length; i++){
                if(this.clientes[i].fidelizado){
                    this.clientes[i].nomeCliente
                    console.log(this.clientes[i].nomeCliente+` - ${fidelizado}`)
                }else{
                    console.log(this.clientes[i].nomeCliente)
                }
            }   
        }
    }

    cadastrarCliente(){
        //pega novo Cliente
        var novoCliente = input("Digite o nome do novo cliente: ")
        
        //gera id cliente
        var novoIDcliente = Math.floor(Math.random() * 9000) + 10000;

        //Qtd de Pets
        var numPets = parseInt(input('Quantos pets este cliente possui: '))

        //Adiciona ao Array de Clientes
        var cliente = new Cliente(novoIDcliente,novoCliente,numPets)
        this.clientes.push(cliente);
        console.log("Cliente registrado.\n")
        this.cadastrarPet(cliente)
        return cliente
    }

    removerClientes(){
        var existe = true
        while(existe){
            //Pede o nome do cliente a ser excluido
            var nomeCliente = input("Digite o nome do cliente a ser removido: ")
            //verifica se o cliente está cadastrado
            if(!(this.clientes.some(cliente => cliente.nomeCliente == nomeCliente))){
                console.log("Cliente não cadastrado.")
                return
            }
            else{
                //Busca o obj client a partir do nome inserido
                for(var i=0; i < this.clientes.length; i++){
                    if(nomeCliente == this.clientes[i].nomeCliente){
                        nomeCliente = this.clientes[i] //Obj Cliente
                        break
                    }       
                }

                //Remove todos os pets daquele cliente
                for(var p=0; p<nomeCliente.pets.length; p++)
                    var animal = nomeCliente.pets[p].nomePet;
                    this.removerPet(animal)

                //Remove o cliente com o índice
                let indice = this.clientes.indexOf(nomeCliente)
                if(indice!==-1){
                this.clientes.splice(indice,1)
                console.log("Cliente removido.")
                }
            }
        }
    }



    
    
    //Manipular Pet
    
    
    cadastrarPet(cliente){
        //Cadastrar animal de um cliente já cadastrado
        var numPets = cliente.numPets.length
        //Pega a quantidade de animais do cliente para repetir o cadastro
        for(var n=0; n<numPets;n++){
            //Pega o Nome do pet
            var nomepet = input("Digite o nome de um pet: ")
            //gera id pet
            var novoIDpet = Math.floor(Math.random() * 9000) + 100000;
            //adiciona o pet na lista do cliente por ID
            cliente.pets.push(novoIDpet);
            //cria obj pet
            var pet = new Animal(novoIDpet,nomepet,novoCliente);
            //adiciona na array de pets
            this.pets.push(pet)
            console.log("Pet cadastrado!")
        }
    }

    mostrarPets(){
        //Verifica se há pets cadastrados
        if(this.pets.length == 0){
            console.log("Nenhum Animal Cadastrado")
        }
        //Havendo, imprime
        else{
            this.pets.sort(); //Coloca em ordem alfabética
            for(let i=0; i<this.pets.length; i++){
                console.log(this.pets[i].nomePet + ` / Dono: ${this.pets[i].nomePet}`) //Exibe o animal e o dono do animal
            }
        }
    }

    removerPet(animal){
        //Verifica se o animal está cadastradp
        if(!(this.pets.some(pet => pet.nomePet == animal))){
            console.log("Pet não cadastrado.")
            return
        }//Está cadastrado
        else{
            //Busca o obj pet com o animal inserido
            for(var i=0; i < this.pets.length; i++){
                if(animal == this.pets[i].nomePet){
                    animal = this.pets[i]
                    break
                }
            }//remove o animal
            let indice = this.pests.indexOf(animal)
            if(indice!==-1){
                this.pestis.splice(indice,1)
                console.log("Pet removido.")
            }
        }
    }





    //Manipular Consulta

    mostrarConsultas(){
        var datas = []
        //Verifica se há consultas marcadas
        if(this.consultas.length == 0){
            console.log("Nenhuma Consulta Marcada")
        }
        //Havendo, imprime
        else{
            for(let c=0; c<this.consultas.length; c++){
                
            }
        }
    }

    marcarConsulta(usuario){
        //Verifica se se trata de remarcar
        var resposta = input("Deseja marcar ou remarcar uma consulta [m/r]: ")
        switch(resposta){
            //REMARCAR CONSULTA
            case 'r':
                var cliente = input('Digite o nome do cliente: ')
                var day = input("Digite o dia da consulta: ")
                var month = input("Digite o mês da consulta: ")
                var year = input("Digite o ano da consulta: ")

                //Procura a consulta
                for(let c=0; c<this.consultas.length; c++){
                    if(cliente==this.consultas[c].nomeCliente){
                        if(this.consultas[c].data.getDay == day && this.consultas[c].data.getMonth == month && this.consultas[c].data.getFullYear == year){
                            var consult = this.consultas[c]
                            break
                        }
                    }
                }
                // Altera data
                console.log("Remarcando consulta")
                console.log(`Clinte: ${consult.nomeCliente}\nPet: ${consult.nomeAnimal}\nFuncionario: ${consult.nomeFunc}\n`)
                //Solicita a nova data
                console.log("Digite a nova data da consulta")
                var newDia = input("Dia: ")
                consult.data.setDate(newDia)

                var newMes = input("Mês: ")
                consult.data.setMonth(newMes)

                var newAno = input("Ano: ")
                consult.date.setFullYear(newAno)

                //Imprimindo Consulta
                console.log(`
Consulta Remarcada:
Cliente: ${consult.nomeCliente}
Pet: ${consult.nomeAnimal}
Data: ${consult.data.getDay}/${consult.data.getMonth}/${consult.data.getFullYear}
Funcionário: ${consult.nomeFunc}
Status: ${consult.status}`)
                  
                break
                    
            
                //MARCAR CONSULTA
            case 'm':
                //Pega o nome do cliente para consulta
                var nomeCliente = input("Digite nome do Cliente: ")
                //Verifica se o cliente já tem cadastro
                    //Não te cadastro
                if(!(this.clientes.some(cliente => cliente.nomeCliente == nomeCliente))){
                    console.log("Cliente ainda não cadastrado")
                    var cliente = this.cadastrarCliente() //Cadastra o Cliente
                    this.cadastrarPet(cliente)            //Cadastra o(s) animal(is) do cliente


                }   //Tem cadastro
                var existe = true
                while(existe){ //Pergunta pra qual animal do cliente
                    var qualPet = input("Para qual animal será a consulta: ")
                    if(!(this.pets.some(pet => pet.nomePet == qualPet))){ //Verifica se o animal inserido está cadastrado
                        console.log("Este pet não está cadastrado.")

                    }       
                    else{   //Estando cadastrado:
                        //Inserir data
                        var dia = input("Digite o dia da consulta: ")
                        var mes = input("Digite o mês da consulta 1-12: ")
                        var ano = input("Digite o ano da consulta: ")
                        var data = new Date(ano,mes+1,dia) //Cria um obj data

                        //gerar id da consulta
                        var idConsulta = Math.floor(Math.random() * 9000) + 1000000

                        //Unindo Informações
                        var consulta = new Consulta(idConsulta,nomeCliente,qualPet,usuario,data)
                        this.consultas.push(consulta)

                        //Adicionando consulta na quatidade do cliente e verificando fidelidade
                        cliente.numConsultas++
                        if(cliente.numConsultas>4){
                            
                            cliente.fidelizado = true
                        }

                    }
                //Imprimindo Consulta
                console.log(`Consulta:
Cliente: ${consulta.nomeCliente}
Pet: ${consulta.nomeAnimal}
Data: ${consulta.data.getDay}/${consulta.data.getMonth}/${consulta.data.getFullYear}
Funcionário: ${consulta.nomeFunc}
Status: ${consulta.status}`)
                }
                break

                // OPÇÃO INVÁLIDA
            default:
                console.log("Resposta inválida.")
                return
        }
    
    }


}





//Inicia o Programa
const execucao = new Sistema()
execucao.main()

//Encerra o Programa
process.exit(console.log('Programa encerrado.'))
