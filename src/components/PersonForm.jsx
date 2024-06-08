import React from 'react'

const PersonForm = ({ onSubmit, valueName, valueNumber, onChangeName, onChangeNumber }) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={valueName} onChange={onChangeName} />
                </div>
                <div>
                    number: <input value={valueNumber} onChange={onChangeNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm