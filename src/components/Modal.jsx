import { useState, useEffect } from 'react';
import CerrarModal from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({
        setModal, 
        animarModal, 
        setAnimarModal, 
        guardarGasto, 
        editar, 
        setEditar, 
    }) => {

    const [ nombre, setNombre ] = useState("")
    const [ cantidad, setCantidad ] = useState("")
    const [ categoria, setCategoria ] = useState("")    
    const [ mensaje, setMensaje] = useState("")

    useEffect(() => {
        if(Object.keys(editar).length > 0) {
            setNombre(editar.nombre)
            setCantidad(editar.cantidad)
            setCategoria(editar.categoria)
            setMensaje(editar.mensaje)
            return
        }
        return
    }, [editar])

    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
            setEditar({})
        } , 500)
    }

    const handleClickSubmit = (e) => {
        e.preventDefault()
        if(Object.keys(editar).length === 0) {
            if([nombre, cantidad, categoria].includes("") ||  [nombre, cantidad, categoria].includes(NaN)) {
                setMensaje("Todos los campos son obligatorios")
                setTimeout(() => {setMensaje("")}, 3000)
                return
            }
            guardarGasto({nombre, cantidad, categoria})
            ocultarModal()
        }
        if([nombre, cantidad, categoria].includes("") ||  [nombre, cantidad, categoria].includes(NaN)) {
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {setMensaje("")}, 3000)
            return
        }
        guardarGasto({...editar, nombre:nombre, cantidad:cantidad, categoria:categoria})
        ocultarModal()
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarModal} 
                    alt="Cerrar modal" 
                    onClick={ocultarModal}
                />
            </div>
            <form 
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                onSubmit={handleClickSubmit}
                >
                {
                    mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>
                }
                {
                    Object.keys(editar).length > 0 
                    ? <legend>Editar Gasto</legend>
                    : <legend>Nuevo Gasto</legend>
                }
                
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id="cantidad"
                        type="number"
                        placeholder='Añade la Cantidad del Gasto: ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select 
                    name="" 
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                {
                    Object.keys(editar).length > 0 
                    ? <input type="submit" value="Editar Gasto"/>
                    : <input type="submit" value="Añadir Gasto"/>
                }
            </form>
        </div>
    )
}

export default Modal