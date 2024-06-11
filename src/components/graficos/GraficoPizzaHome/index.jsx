import Chart from 'react-apexcharts';
import './style.css';

// eslint-disable-next-line react/prop-types
function ChartPie({ dados }){
    //console.log(dados)

    let dadosPlotagem = Object.entries(dados).map(([chave, valor])=>{
        return {chave, valor}
    })

    const indexDados = dadosPlotagem.findIndex(dado => dado.chave === 'TOTAL_GERAL')
    dadosPlotagem.splice(indexDados, 1)


    let legenda = dadosPlotagem.map((i)=> i.chave.replace('TOTAL_', ''))
    let valores = dadosPlotagem.map((i)=> i.valor)
    
    let vlrTotal = 0
    valores.map((i)=> vlrTotal += i)

    console.log(valores)

    const options = {
        labels: legenda,
        legend: {
            position: 'right',
            labels:{
                colors: '#fff'
            }
        }, 
       
    }
    return(
        <div className="container-grafico" style={{display: vlrTotal == 0 ? 'none' : ''}}>
            
             <Chart options={options} series={valores} type="donut" width="430" /> 
             
            
        </div>
    )
}

export default ChartPie