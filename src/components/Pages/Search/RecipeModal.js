import React, {useEffect, useState} from "react";
import { Modal, Button } from 'react-bootstrap';
import RecipeCard from "./RecipeCard.js";
export default function RecipeModal(props) {
    const { recipe, showModal } = props;
    const [show, setShow] = useState(showModal);

    useEffect(() => {
        setShow(showModal)
    }, [recipe]);

    const handleClose = () => {
        setShow(false)
        //props.updateModalState
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{recipe.label}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/*{recipe.ingredients.map((ing, index) => (
                        <div>{ing.text}</div>
                    ))}*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}