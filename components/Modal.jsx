const { createPortal } = ReactDOM;

function Modal({
    title,
    content,
    show = false,
    search,
    setSearch,
    onClose = () => { },
    onConfirm = () => { },
    success = false,
    error = false
}) {
    return show && createPortal(
        <div className="modal-container">
            <div className="modal">
                <h2>{title}</h2>
                <input
                    type="text"
                    placeholder="Cerca..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button onClick={onConfirm}>Conferma</button>
                <button onClick={onClose}>Annulla</button>
                {success &&
                    <div>
                        <span className='success'>Elemento aggiunto alla lista</span>
                    </div>
                }
                {error.status &&
                    <div>
                        <span className='error'>{error.message}</span>
                    </div>
                }
            </div>
        </div>,
        document.body
    )
}