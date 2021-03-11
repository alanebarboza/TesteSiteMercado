export class Produto{
    public id: number;
    public nome: string;
    public valorVenda: number;
    public imagem : any;

    constructor(){
        this.id = 0;
        this.nome = "";
        this.valorVenda = 0.00;
    }
}