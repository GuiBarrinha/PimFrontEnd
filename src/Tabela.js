function Tabela({vetor, selecionar}){
    return(
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Selecionar</th>
                </tr>
            </thead>

            <tbody>
                {
                    vetor.map((obj, indice)=>(
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.titulo}</td>
                            <td>{obj.descricao}</td>
                            <td>{obj.status}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    )
}

export default Tabela;