class Humano{
    nome;
    id;
    constructor(nome,id){
        this.nome=nome
        this.id=id
    }
}
var menino = new Humano("Gabriel",23);
var menina = new Humano("Karen",8)

var array = []
array.push(menina)
array.push(menino)

console.log(array)

array.sort()

console.log(array)

