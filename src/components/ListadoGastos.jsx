import Gasto from "./Gasto"

const ListadoGastos = ({gastos, editar, setEditar, eliminarGasto}) => {

  return (
    <div className="listado-gastos contenedor">
        <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>
        {
            gastos.map( gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setEditar={setEditar}
                    eliminarGasto={eliminarGasto}
                />
            ))
        }
    </div>
  )
}

export default ListadoGastos