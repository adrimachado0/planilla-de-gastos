import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './logic/logic'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './components/Filtros'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)

  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )

  const [editar, setEditar] = useState({})

  const [filtro, setFiltro] = useState("")

  const [gastosFiltrados, setGastosFiltrados] = useState({})

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {setAnimarModal(true)}, 500)
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([gasto, ...gastos])
    }
  }

  useEffect(() => {
    if(Object.keys(editar).length > 0) {
      handleNuevoGasto()
    }
  }, [editar])


  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0
    if(presupuestoLS > 0) setIsValidPresupuesto(true)
    return
  }, [])

  const eliminarGasto = gastoEliminar => {
    const gastoEliminado = gastos.filter(gasto => gasto.id !== gastoEliminar.id)

    setGastos(gastoEliminado)
  }

  useEffect(() => {
    if(filtro) {
      const gastoFiltrado = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastoFiltrado)
      return
    }
    setGastosFiltrados([])
  }, [filtro])

  return (
    <div className={ modal ? "fijar" : ""}>
      <Header 
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        setGastos={setGastos}
      />
      {
        isValidPresupuesto && 
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              editar={editar}
              setEditar={setEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              onClick={handleNuevoGasto}
            />
          </div>
        </>

      }

      {modal && 
        <Modal 
          setModal={setModal} 
          animarModal={animarModal} 
          setAnimarModal={setAnimarModal} 
          guardarGasto={guardarGasto} 
          editar={editar} 
          setEditar={setEditar}
        />
      }
    </div>
  )
}

export default App
