import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { ProdutoComponent } from './view/produto/produto.component';

const routes: Routes = [
  { path: 'produto', component: ProdutoComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
