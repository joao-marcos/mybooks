export class MyBooksConsts{
    static readonly BASE_URL: string = "http://mybooks.saudecoletiva.blog.br/api/"

    static readonly LOGIN = 'login';

    static readonly USER = {
        CAD: 'usuario'
    }

    static readonly CURSO = {
        GET: 'curso'
    }

    static readonly INSTITUICAO = {
        GET: 'instituicao'
    }

    static readonly BOOK = {
        CREATE: 'livro',
        DELETE: 'livro',
        SEARCH: 'livro/search',
        UPLOAD_THUMB: 'livro/upload-thumb',
        GET_USER: 'livro/usuario'
    }

    static readonly LOAN = {
        ALL: 'emprestimo'
    }
}