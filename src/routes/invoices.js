import React from 'react'
import { useParams } from 'react-router'

const Invoices = () => {
    const {test} = useParams();
    return (
        <div>
            Invoice {test}!
        </div>
    )
}

export default Invoices

