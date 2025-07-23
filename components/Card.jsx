const Card = ({ animal }) => {
    const { name, description, image } = animal;

    return (
        <div className='card'>
            <img src='https://picsum.photos/400/300' alt={name} className="card-image" />
            <div className="card-content">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}