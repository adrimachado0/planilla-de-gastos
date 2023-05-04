import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, gastos }) => {

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

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">

            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: "#3B82F6",
                        trailColor: "#f5f5f5",
                        textColor: "#3B82F6"
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p>
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