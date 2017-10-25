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
    public  formBuilder: FormBuilder,
    loadingCtrl: LoadingController
  ) {
    super(loadingCtrl);

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
      console.log('inst', this.instituicoes);
    }, erro => {
      console.log('erro instituicao', erro);
    });
  }

  getCursos(): void{
    this.cursoService.getAll().subscribe(resp => {
      this.cursos = resp;
    }, erro => {
      console.log('erro curso', erro)
    });
  }

  cadastrarUsuario(): void{
    this.submitAttemp = true;
    if(!this.cadUserFrmGroup.valid){
      return;
    }

    this.usuarioService.cadastrarUsuario(this.userModel).subscribe(resp => {
      console.log('cadastro usuario', resp);
    }, erro => {
      console.log('erro cadastro', erro);
    })

  }
}
