import {useState} from 'react'

import type {Meta} from '@storybook/react'

import {Modal, ModalType} from './index'
import {Button, Typography} from "@/components/ui";

export default {
    title: 'UI Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {layout: 'centered'},
} satisfies Meta<typeof Modal>

const commonArgs = {
    children: (
        <>
            <Typography variant="regular_text_16">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
            </Typography>
        </>
    ),
    open: true,
}

export const DefaultModal = {
    render: (args: ModalType) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)

        const handleModalClosed = () => {
            setOpen(false)
        }
        const handleModalOpened = () => {
            setOpen(true)
        }

        return (
            <>
                <Button variant="primary" onClick={handleModalOpened}>
                    Open modal
                </Button>
                <Modal {...args} isOpen={open} onOpenChange={handleModalClosed}>
                    <Typography variant="regular_text_16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </Modal>
            </>
        )
    },
    args: {
        ...commonArgs,
        title: 'Default modal',
    },
}

export const ModalWithSaveButton = {
    render: (args: ModalType) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)
        const handleModalClosed = () => {
            setOpen(false)
        }
        const handleModalOpened = () => {
            setOpen(true)
        }

        return (
            <>
                <Button variant="primary" onClick={handleModalOpened}>
                    Open modal
                </Button>
                <Modal {...args} isOpen={open} onOpenChange={handleModalClosed}>
                    <>
                        <Typography variant="regular_text_16">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </Typography>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button onClick={handleModalClosed} variant="primary">
                                Save
                            </Button>
                        </div>
                    </>
                </Modal>
            </>
        )
    },
    args: {
        ...commonArgs,
        title: 'With One Button',
    },
}

export const ModalWithDoubleButton = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false)
        const handleModalClosed = () => {
            setOpen(false)
        }
        const handleModalOpened = () => {
            setOpen(true)
        }

        return (
            <>
                <Button variant="primary" onClick={handleModalOpened}>
                    Open modal
                </Button>
                <Modal isOpen={open} title="With two Buttons" onOpenChange={handleModalClosed}>
                    <>
                        <Typography variant="regular_text_16">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </Typography>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button onClick={handleModalClosed} variant="primary">
                                Save
                            </Button>
                            <Button onClick={handleModalClosed} variant="secondary">
                                Cancel
                            </Button>
                        </div>
                    </>
                </Modal>
            </>
        )
    },
    args: {
        ...commonArgs,
        title: 'With two Buttons',
    },
}
