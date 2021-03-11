import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/resources/produto';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  public produto: Produto = new Produto();
  public listProdutos: Array<Produto> = new Array<Produto>();
  public isEdit: boolean = false;
  private arquivo: any;


  constructor(private httpClient: HttpClient, private produtoService: ProdutoService) { 
    this.getProduto();
  }

  ngOnInit(): void {
  }

  editProduto(prod: Produto){
    this.isEdit = true;
    this.produto = prod;
    this.arquivo = prod.imagem;
  }

  saveProduto(prod: Produto){
    if(prod.nome && prod.valorVenda){
      prod.valorVenda = Number(prod.valorVenda.toString().replace(",", "."));

      this.produtoService.save(prod, this.arquivo).subscribe((data) => {
         this.produto = new Produto();
         this.getProduto();
         this.isEdit = false;
      },
      error =>{
        console.log(error);
      });
    }
  }

  novoProduto(){
    this.isEdit = true;
    this.produto = new Produto();
    this.arquivo = {};
  }

  getProduto(){
      this.produtoService.get().subscribe((data) => {
        this.listProdutos = data;
        this.listProdutos.forEach(prod => {
          prod.imagem = "data:image/png;base64," + prod.imagem;
       });

        console.log(data);
      },
      error =>{
        console.log(error);
      });
  }

  deleteProduto(prod: Produto){
    if(confirm("Tem certeza que deseja remover o produto?")){
      this.produtoService.delete(prod).subscribe((data) => {
        var index = this.listProdutos.indexOf(prod);
        this.listProdutos.splice(index, 1);
      },
      error =>{
        console.log(error);
      });

    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.arquivo = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e =>  this.produto.imagem = reader.result;

      reader.readAsDataURL(this.arquivo);
      
  }
}

}
