/*********************************************
 * UserProfile Component
 * 
 * @author Caleb Edwards
 * @contribution Initial setup of the profile page excluding login functionality.
 * 
 * @author Jeffrey Adkins
 * @contribution Integrated login and logout functionalities on the profile page.
 * 
 * @author ChatGPT
 * @contributions Provided extensive comments throughout the code for clarity.
 * 
 * @brief Implements the user profile page, displaying user-specific data such as favorite recipes
 *        and managing user authentication states.
 *********************************************/


import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import ProfileStyle from './ProfilePage.module.css';
import ProfileRecipeCard from './ProfileRecipeCard';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../../amplifyconfiguration.json';
import { listFavoriteRecipes } from '../../graphql/graphql-operations';
import { generateClient } from "aws-amplify/api";
import { graphqlOperation } from '@aws-amplify/api-graphql';
Amplify.configure(config);

const client = generateClient();
/**
 * Renders the user profile page with user-specific functionalities including their favorite recipes,
 * personal recipe cards, and a logout button. This component is wrapped with authentication to ensure
 * only authenticated users can access it.
 *
 * @param {Function} signOut - Function provided by Amplify to sign out the user.
 * @param {Object} user - User object containing information about the authenticated user.
 * @returns {JSX.Element} The user profile page containing favorite recipes, profile information, and a logout button.
 */
const UserProfile = ({ signOut, user }) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State to store favorite recipes fetched from the API.

    useEffect(() => {
        fetchFavoriteRecipes(); // Fetch favorite recipes on component mount.
    }, []);

    // Function to fetch favorite recipes from GraphQL API
    const fetchFavoriteRecipes = async () => {
        try {
            const response = await client.graphql(graphqlOperation(listFavoriteRecipes));
            const favoriteRecipesData = response.data.listRecipes.items;
            setFavoriteRecipes(favoriteRecipesData);
        } catch (error) {
            console.error('Error fetching favorite recipes:', error);
        }
    };

    return (
        <>
            {/* Navbar component */}
            <Navbar></Navbar>
            <div className={ProfileStyle.profile_popup}>
                {/* Profile Picture */}
                <div className={ProfileStyle.profile_picture}>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" />
                </div>
                {/* Welcome message */}
                <div className={ProfileStyle.username}>Welcome User! </div>
                {/* Section container */}
                <div className={ProfileStyle.section_container}>
                    {/* My Recipes Section */}
                    <div className={ProfileStyle.section}>
                        <h2>My Recipes</h2>
                        <ProfileRecipeCard></ProfileRecipeCard>
                        <ul className={ProfileStyle.list}>
                        </ul>
                    </div>
                    {/* My Favorites Section */}
                    <div className={ProfileStyle.section}>
                        <h2>My Favorites</h2>
                        {/* Favorite Recipe Container */}
                        <div className={ProfileStyle.favorite_recipe_container}>
                            {/* Mapping through favorite recipes and rendering recipe cards */}
                            {favoriteRecipes.map(recipe => (
                                <div key={recipe.id} className={ProfileStyle.recipe_card}>
                                    <div className="card text-bg-secondary" style={{ width: '18rem', border: '2px solid black' }}>
                                        <div className="card-header text-center" style={{ width: '16rem', border: '2px solid black' }}>
                                            <h5 className="card-title">{recipe.name ? recipe.name : 'Unnamed Recipe'}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p><strong style={{ color: 'white' }}>Ingredients:</strong> {recipe.ingredients}</p>
                                            <p><strong style={{ color: 'white' }}>Instructions:</strong> {recipe.instructions}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ul className={ProfileStyle.list}>
                        </ul>
                    </div>
                </div>
                {/* Logout button */}
                <button className={ProfileStyle.logout_btn} onClick={signOut}>Sign out</button>
            </div>
        </>
    );
};

export default withAuthenticator(UserProfile);
