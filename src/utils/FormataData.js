export default function FormataData(data){
    let newDate = new Date(data)
    let dia = newDate.getDate()
    let mes = newDate.getMonth()+1
    let ano = newDate.getFullYear()
    let dataFormatada = `${dia}/${mes}/${ano}`
    return dataFormatada
}