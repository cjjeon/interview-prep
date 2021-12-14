import React from "react"
import { useParams } from "react-router-dom"

const CreatePosition: React.FC = () => {
    const { companyId } = useParams()
    return <div>{companyId}</div>
}

export default CreatePosition
