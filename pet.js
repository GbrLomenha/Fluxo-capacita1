const input = require("prompt-sync")({sigint:true});
class Cliente{
    idCliente;
    nomeCliente;
    pets = []
    fidelizado = false;

    constructor(idCliente,nomeCliente,pets){
        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.pets = pets;
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
    consultas = [];

    constructor(idPet,nomePet,nomeDono,consultas){
        this.idPet = idPet;
        this.nomePet = nomePet;
        this.nomeDono = nomeDono;
        this.consultas = consultas
    }

}
class Consulta{
    idConsulta;
    nomeClient;
    nomeAnimal;
    nomeFuncio;
    status;
    data;

    constructor(idConsulta,nomeClient,nomeAnimal,nomeFuncio,status,data){
        this.idConsulta = idConsulta;
        this.nomeClient = nomeClient;
        this.nomeAnimal = nomeAnimal;
        this.nomeFuncio = nomeFuncio;
        this.status = status;
        this.data = data;
    }
}
class Sistema{
    
    funcionarios = []
    clientes = []
    pets = []
    consulas = []

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
    telaFuncionário(usuario,idDoUsuario){
        console.log('Bem-vindo, ${usuário}! -MENU-\n1.\n2.\n3.')
    }


    //MANIPULAR FUNCIONARIO
    cadastrarFuncionario(){
        //pega novo usuario
        var novoUser = input("Digite um novo nome de usuário: ")
        //verifica senha
        var senha = true
        while(senha == true){
            let novaSenha = input("Digite a nova senha: ");
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
        var novoFunc = new Funcionario(novoID,novoUser,senha)
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
            }else{
                break
            }
        }     
        //procura o usuario pelo ID
        for(var i=0;i<this.funcionarios.length;i++){
            if(id == this.funcionarios[i].idFunc){
                var usuario = this.funcionarios[i];
                break
            }
        }
        //Verifica a senha
        while(true){  
            var senha = input("Insira a senha: ")
            if (senha == usuario.senha){
                return this.telaFuncionário(usuario.user,id)

            }else{
                console.log("Senha incorreta.")
            }   
        }
    }                    
    //Manipular Cliente

    //Manipular Pet

    //Manipular Consulta
}


//Inicia o Programa
const execucao = new Sistema()
execucao.main()

//Encerra o Programa
process.exit(console.log('Programa encerrado.'))
