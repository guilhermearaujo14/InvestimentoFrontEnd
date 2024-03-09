
export default function FormataMoeda(valorFormatado){
    valorFormatado = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
    return valorFormatado
}