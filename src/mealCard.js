/*********************************************
 * @author Jeffrey Adkins
 * @contribution Code for the meal cards
 * 
 * @author
 * @contribution
 * 
 * @brief This is the basic meal card component in which will load
 *        the meals and display them on the webpage.
 *********************************************/



function Card({ recipe }) {
    return (
        <div className="d-flex justify-content-center">
        <div className="row row-cols-2 row-cols-md-4 g-4">
            <div className="col">
                <div className="meal_card">
                    <div className="card text-bg-secondary" style={{height: '300px', width:'15rem'}}> {/* Adjust the width here */}
                        <img className="card-img-top" src={recipe.image} alt={recipe.title}></img>
                        <div className="card-header"><h5 className="card-title">{recipe.title}</h5></div>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Ingredients</h6>
                            <p className="card-text">{recipe.ingredients}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Instructions</h6>
                            <p className="card-text">{recipe.recipe}</p>
                        </div>
                    </div> 
                </div>
            </div>
            {/* Other columns for displaying additional recipe information */}
        </div> 
    </div>
    
);
}

export default Card;
