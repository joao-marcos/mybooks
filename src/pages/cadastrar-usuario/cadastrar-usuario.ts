import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasePage } from '../../estruturaBase/BasePage';
import { UserModel } from '../../models/UserModel';
import { InstituicaoModel } from '../../models/InstituicaoModel';
import { CursoModel } from '../../models/CursoModel';
import { InstituicaoServiceProvider } from '../../providers/instituicao-service/instituicao-service';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

/**
 * Generated class for the CadastrarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage extends BasePage{

  cadUserFrmGroup: FormGroup;
  submitAttemp: boolean = false;
  userModel: UserModel;
  instituicoes: InstituicaoModel[];
  cursos: CursoModel[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private instituicaoService: InstituicaoServiceProvider,
    private cursoService: CursoServiceProvider,
    private usuarioService: UsuarioServiceProvider,
    public alertCtrl: AlertController,
    public  formBuilder: FormBuilder,
    loadingCtrl: LoadingController
  ) {
    super(loadingCtrl, alertCtrl);

    this.userModel = new UserModel();
    this.cadUserFrmGroup = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      telefone: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      instituicao: ['', Validators.compose([Validators.required])],
      curso: ['', Validators.compose([Validators.required])],
    });

    this.getInstituicoes();
    this.getCursos();
  }

  ionViewDidLoad() {
    console.log('E-mailionViewDidLoad CadastrarUsuarioPage');
  }

  getInstituicoes(): void{
    this.instituicaoService.getAll().subscribe(resp => {
      this.instituicoes = resp;
    }, erro => {
      console.log('Institution', erro);
    });
  }

  getCursos(): void{
    this.cursoService.getAll().subscribe(resp => {
      this.cursos = resp;
    }, erro => {
      console.log('Course', erro)
    });
  }

  cadastrarUsuario(): void{
    this.submitAttemp = true;
    if(!this.cadUserFrmGroup.valid){
      return;
    }

    this.usuarioService.cadastrarUsuario(this.userModel).subscribe(resp => {
      this.showAlert('Novo Usuário!', 'Usuário cadastrado com sucesso.');
      console.log('cadastro usuario', resp);
    }, erro => {
      let response = JSON.parse(erro._body);
      for(var key in response.errors){
         let errorText =  response.errors[key].join('\n');
         this.showAlert(response.message, errorText);
      }
    })
  }

  goBack(){
    this.navCtrl.pop();
  }

}
