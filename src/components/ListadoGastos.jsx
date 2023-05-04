import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setEditar, eliminarGasto, gastosFiltrados, filtro}) => {

  return (
    <div className="listado-gastos contenedor">
        { 
          !filtro
          ? (
              <>
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
              </>
          ) : (
            <>
              <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>
              {gastosFiltrados.map( gasto => (
                  <Gasto 
                      key={gasto.id}
                      gasto={gasto}
                      setEditar={setEditar}
                      eliminarGasto={eliminarGasto}
                      />
              ))}
            </>
            )
        }
    </div>
  )
}

export default ListadoGastos