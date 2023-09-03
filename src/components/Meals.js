import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchMeals, likeMeal } from '../actions/mealActions';

function Meals({ dispatch, loading, meals, error }) {
  const [likedMeals, setLikedMeals] = useState(JSON.parse(localStorage.getItem('likedMeals')) || []);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

useEffect(() => {
    dispatch(fetchMeals());

    // Load comments from local storage when the component mounts
    const savedComments = JSON.parse(localStorage.getItem('comments'));
    if (savedComments) {
        setComments(savedComments);
    }
}, [dispatch]); 

  const handleLike = (mealId) => {
    if (!likedMeals.includes(mealId)) {
      setLikedMeals(prev => [...prev, mealId]);
      localStorage.setItem('likedMeals', JSON.stringify([...likedMeals, mealId]));
      dispatch(likeMeal(mealId));
    }

  };

const handleShowComments = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        setPopupData(data.meals[0]);
        setShowPopup(true);
      })
      .catch(error => console.error('Error fetching meal details:', error));
};

const handleAddComment = (mealId) => {
    if (commentName && commentText) {
        const newComment = {
            postId: mealId,
            name: commentName,
            body: commentText
        };

        // Append the new comment to the local state
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);

        // Save the updated comments to local storage
        localStorage.setItem('comments', JSON.stringify(updatedComments));

        setCommentName('');
        setCommentText('');
    }
};


const handleClosePopup = () => {
    setShowPopup(false);
    setPopupData(null);
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
const renderIngredients = () => {
    let ingredientsElements = [];
    for (let i = 1; i <= 20; i++) {
        const item = popupData[`strIngredient${i}`]
        const measure = popupData[`strMeasure${i}`];
        const ingredient = item + measure;
        if (ingredient && ingredient.trim() !== "") {
            ingredientsElements.push(<span key={i} style={{ fontWeight: '700' }}>{item + "  : "}</span>);
            ingredientsElements.push(<span key={i} style={{ color: 'maroon' }}>{measure}</span>);
            ingredientsElements.push(<br key={`br-${i}`} />);
        }
    }
    return ingredientsElements;
};

  return (
    <div className='meals-list'>
      {meals.map(meal => (
        <div key={meal.idMeal} className='meal-item'>
          <img src={meal.strMealThumb} alt={meal.strMeal} onClick={() => handleShowComments(meal.idMeal)}/>
          <h2>{meal.strMeal}</h2>
          <button className='comment-button'  onClick={() => handleShowComments(meal.idMeal)}>More Details...</button>
          <button disabled={likedMeals.includes(meal.idMeal)} onClick={() => handleLike(meal.idMeal)} className='like-button'><i className={likedMeals.includes(meal.idMeal) ? 'liked fa fa-thumbs-up' : 'like-icon fa fa-thumbs-up'} aria-hidden="true"
          ></i> ({likedMeals.filter((id) => id === meal.idMeal).length})
          </button>          
        </div>
      ))}
      {showPopup && popupData && (
        <div className='popup'>
          <button onClick={handleClosePopup} className='close-button'>&times;</button>
          <h2>{popupData.strMeal}</h2>
          <img src={popupData.strMealThumb} alt={popupData.strMeal} />
          <p className='ingredients'><h3>Ingredients:</h3> {renderIngredients()} </p>
          <p><h3>Reciepe:</h3> {popupData.strInstructions}</p>
          <a href={popupData.strYoutube} target='_blank' rel='noopener noreferrer' className='video'> Watch on YouTube</a>
          <div className='comments-section'>
            <h3>Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className='comment'>
                <strong>{comment.name}</strong>: {comment.body}
              </div>
            ))}
          </div>
            <form className='form'> 
             <input type='text' placeholder='Name' value={commentName} onChange={e => setCommentName(e.target.value)} />
             <textarea placeholder='Comment' value={commentText} onChange={e => setCommentText(e.target.value)}></textarea>
             <button onClick={() => handleAddComment(popupData.idMeal)}>Add Comment</button>
            </form>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  loading: state.meals.loading,
  meals: state.meals.meals,
  error: state.meals.error
});

export default connect(mapStateToProps)(Meals);
