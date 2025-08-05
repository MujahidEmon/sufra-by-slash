
const FoodCard = ({item}) => {
    const {name, recipe, image, price} = item
    return (
        <div className="card rounded-none bg-base-300 w-88 shadow-sm">
            <figure>
                <img
                    className="object-cover"
                    src={image}
                    alt={name}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}

                <div className="badge badge-warning font-semibold">${price}</div>
                </h2>
                <p className="text-center">{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-outline border-0 border-b-2">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;