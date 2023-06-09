import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ 
        presupuesto, 
        gastos,
        setGastos,
        setPresupuesto,
        setIsValidPresupuesto
    }) => {

    const [gastado, setGastado] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => parseInt(gasto.cantidad) + total, 0 )
        setGastado(totalGastado)
        const totalDisponible = presupuesto - totalGastado

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = ((( presupuesto - totalDisponible) * 100 ) / presupuesto).toFixed(2) 
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500)
        setDisponible(totalDisponible)

    }, [gastos])

    const formatearCantidad = ( presupuesto ) => {
        return Number(presupuesto).toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm("¿Deseas reiniciar tu presupuesto?")

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">

            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#DC2626" : "3B82F6",
                        trailColor: "#f5f5f5",
                        textColor: porcentaje > 100 ? "#DC2626" : "3B82F6"
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto