const { createRoot, createPortal } = ReactDOM;
const { useState } = React;
const API = 'http://localhost:3333/animals?search=';

const Animals = () => {

    const animalsChoices = [
        'Gatto',
        'Cane',
        'Scimmia',
        'Elefante',
        'Leone',
        'Tigre',
        'Orso',
        'Lupo',
        'Volpe'
    ];

    const [animalsArray, setAnimalsArray] = useState([]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState(``);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(
        {
            status: false,
            message: ''
        }
    )

    function addAnimal() {
        const randomIndex = Math.floor(Math.random() * animalsChoices.length);
        setAnimalsArray([...animalsArray, animalsChoices[randomIndex]]);
    }

    function onClose() {
        setShow(false);
        setSuccess(false);
        setError({
            ...error,
            status: false
        });
        setSearch('');
    }

    function onOpen() {
        setShow(true);
    }

    async function fetchJson(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (e) {
            console.error(`Errore durante la ricerca dell'animale:\n`, e)
        }
    }

    async function onConfirm() {
        setSuccess(false);
        setError({
            ...error,
            status: false
        });

        let message = 'Elemento non presente';

        const term = await fetchJson(`${API}${search}`);

        if (!term) message = `Errore durante la ricerca dell'animale`

        if (!term || term.length === 0) {
            console.error(message);
            setError({
                status: true,
                message
            })
            setSearch('');
        } else {
            animalsArray.push(term[0]);
            setSuccess(true);
            setSearch('');
            setTimeout(() => onClose(), 2000)
        }
    }

    return (
        <>
            <button onClick={onOpen}>
                Aggiungi un animale!!!
            </button>
            <Modal
                title={`Cerca l'animale da aggiungere`}
                show={show}
                onClose={onClose}
                onConfirm={onConfirm}
                search={search}
                setSearch={setSearch}
                success={success}
                error={error}
            />
            <details>
                <summary>
                    <h2>Animali</h2>
                </summary>
                <ul>
                    {animalsArray.map((animal, i) => (
                        <li key={i}>
                            <Card animal={animal} />
                        </li>
                    )
                    )}
                </ul>
            </details>
        </>
    )
}

const listaAnimali = document.querySelector('.lista-animali');
const root = createRoot(listaAnimali);
root.render(<Animals />)