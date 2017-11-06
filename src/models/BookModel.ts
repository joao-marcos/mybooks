export class BookModel{
    id: number;
    titulo: string;
    editora: string;
    dataDaPublicacao: string;
    descricao: string;
    autor: string;
    thumb: string;
    disponivelParaEmprestimo: boolean;
    emprestimo: boolean;
    usuario_id: number;
}