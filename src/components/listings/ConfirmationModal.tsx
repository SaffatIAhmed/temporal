import { PropsWithChildren, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmationModalProps<T> extends PropsWithChildren {
    title: string;
    show: boolean;
    confirmTextYes: string;
    confirmTextNo: string;
    data: T
    handleClose: (confirmed: boolean) => void;
}

function ConfirmationModal<T extends object | null>(props: ConfirmationModalProps<T>) {
    return (
        <>
            <Modal
                show={props.show}
                onHide={() => props.handleClose(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.handleClose(false)}>
                        {props.confirmTextNo}
                    </Button>
                    <Button variant="primary" onClick={() => props.handleClose(true)}>
                        {props.confirmTextYes}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmationModal;