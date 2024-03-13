
function FormataMoeda(valor){
    if(valor === undefined || valor == 0){
        0
    }else{
        let valorFormatado = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        return valorFormatado
    }
}

export default FormataMoeda;