import React, {useEffect, useState, useRef } from "react"
import { Modal } from 'bootstrap'
import PropTypes from 'prop-types'
import PantryButton from "../../PantryButton.js";

export default function RecipeModal(props) {
    const { recipe, isOpen, onClose } = props;

    // Create a forward reference
    const modalRef = useRef()

    const [modalObj, setModalObj] = useState(null)
    useEffect(() => {
        if (modalRef.current && modalObj === null) {
            setModalObj(new Modal(modalRef.current), { backdrop: 'static' })
        }
    }, [modalObj])

    // Synchronize the modal state with 'isOpen'
    useEffect(() => {
        console.log(recipe)
        if (modalObj !== null) {
            if (isOpen) {
                modalObj.show()
            } else {
                modalObj.hide()
            }
        }
    }, [isOpen, modalObj])

    return (
        <div ref={modalRef} className="modal fade modal-lg">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="detailsModalLabel">
                            {/*title*/}
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
                        {/*children*/}
                        {/*<div className="row">
                            favorited?
                        </div>*/}
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

/*
RecipeModal.propTypes = {
    recipe: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

RecipeModal.defaultProps = {
    recipe: {
        label: '',
        image: ''
    }
}*/
