import React from 'react'

const Filter = ({ searchPerson, handleSearch }) => {
    return (
        <div>
            Filter shown with <input value={searchPerson} onChange={handleSearch} />
        </div>
    )
}

export default Filter