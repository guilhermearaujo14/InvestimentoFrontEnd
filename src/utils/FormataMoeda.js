
function FormataMoeda(valor){
    let valorFormatado = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return valorFormatado
}

export default FormataMoeda;