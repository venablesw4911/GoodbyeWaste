import React, {useEffect, useState, useRef } from "react"
import { Modal } from 'bootstrap'

export default function RecipeModal(props) {
    const { user, recipe, isOpen, onClose } = props;

    const [planner, setPlanner] = useState({})
    const [showPlanner, setShowPlanner] = useState(false)

    // Create a forward reference
    const modalRef = useRef()
    const [modalObj, setModalObj] = useState(null)
    useEffect(() => {
        if (modalRef.current && modalObj === null) {
            setModalObj(new Modal(modalRef.current, { backdrop: 'static' }))
        }
    }, [modalObj])

    // Synchronize the modal state with 'isOpen'
    useEffect(() => {
        if (modalObj !== null) {
            if (isOpen) {
                modalObj.show()
            } else {
                modalObj.hide()
            }
        }
    }, [isOpen, modalObj])

    useEffect(() => {
        async function getPlanner() {
            console.log(user.userId)
            try {
                const response = await fetch(`http://localhost:3081/userMeals/${user.userId}/`, {
                    method: 'GET'
                })
                if (response.status === 200) {
                    await setPlanner(response.json())
                    await console.log(response.json())
                }
            } catch (error) {
                console.error('Error planner retrieval failed:', error)
            }
        }

        getPlanner()
    }, [])

    async function updatePlanner() {
        try {
            const response = await fetch(`http://localhost:3081/userMeals/${user.userId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(planner)
            })
            if (response.status === 200) {
                await setPlanner(response.json())
                await console.log(response.json())
            }
        } catch (error) {
            console.error('Error planner update failed:', error)
        }
    }

    return (
        <div ref={modalRef} className="modal fade modal-lg">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="detailsModalLabel">RecipeModal.js
                            {recipe.label}
                        </h1>

                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body" id="detailsModalBody">
                        <div className="row">
                            <div className="col-6">
                                <img src={recipe.image} alt="recipe image" className="w-100"/>
                            </div>
                            <div className="col-6">
                                <ul className="list-group list-group-flush">
                                    {recipe?.ingredientLines?.map((ingredient, index) => (
                                        <li key={index} className="list-group-item">{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            {'Close'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
