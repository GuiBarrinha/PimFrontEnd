function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return (
        <form>
            <input type='text' value={obj.titulo} onChange={eventoTeclado} name='titulo' placeholder='Titulo' className='form-control' />
            <input type='text' value={obj.descricao} onChange={eventoTeclado} name='descricao' placeholder='Descrição' className='form-control' />
            <input type='text' value={obj.status} onChange={eventoTeclado} name='status' placeholder='Status' className='form-control' />
            {
                botao
                    ?
                    <input type='button' value='Cadastrar' onClick={cadastrar} className='btn btn-primary' />
                    :
                    <div>
                        <input type='button' value='Alterar' onClick={alterar} className='btn btn-warning' />
                        <input type='button' value='Remover' onClick={remover} className='btn btn-danger' />
                        <input type='button' value='Cancelar' onClick={cancelar} className='btn btn-secondary' />
                    </div>
            }

        </form>
    )
}

export default Formulario;