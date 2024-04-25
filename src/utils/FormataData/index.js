export default function FormataData(data){
    let newDate = new Date(data)
    let dia = newDate.getDate()
    let mes = newDate.getMonth()+1
    let ano = newDate.getFullYear()
    if(dia < 10) dia = "0"+dia
    if(mes < 10) mes = "0"+mes
    let dataFormatada = `${dia}/${mes}/${ano}`
    return dataFormatada
}