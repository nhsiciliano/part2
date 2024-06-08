

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const notiStyle = {
        color: type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return (
        <div style={notiStyle}>
            {message}
        </div>
    )
}

export default Notification