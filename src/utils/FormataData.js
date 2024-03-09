export default function FormataData(data){
    data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth()
    let ano = data.getFullYear()
    let dataFormatada = `${dia}/${mes}/${ano}`
    return dataFormatada
}