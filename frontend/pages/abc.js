import React, { useEffect,useState } from 'react';























const SearchBox = ({ recipeNames }) => {

























    const [userData, setUserData] = useState(null);

    useEffect(() => {
      async function fetchUserData() {
        try {
          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
              query {
                queryResult {
                  user {
                    user_id
                    name
                    password
                    address
                    phone_no
                  }
                  preferences {
                    user_id
                    diet_followed
                    allergies
                    dietary_lifestyle
                    no_of_people
                  }
                  ingredients_used {
                  ingredient_id
                  recipe_id
                  ingredient_name
                  name_of_recipe
                  quantity
                  unit
                  no_of_people
                }
                  recipe {
                  recipe_id
                  dietary_lifestyle
                  diet_followed
                  image
                  instructions
                  cook_time
                  name_of_recipe
                  description
                  season
                }
                  calendar {
                  user_id
                  date
                  no_of_days
                  duration
                }
                  order_details {
                  order_id
                  ingredients
                  name
                  detail_id
                  total_cost
                }
                  individual_day {
                    recipe_id
                    recipe_name
                    meal_category
                    date
                  }
                  order_master {
                  user_id
                  order_id
                  date
                }
                  delivery_table {
                  order_id
                  delivery_partner
                  address
                  estimated_arrival_date
                  booked_date
                }
                }
              }    
              `,
            }),
          });
    
          const data = await response.json();
          if (data && data.data && data.data.queryResult) {
          setUserData(data.data.queryResult); }
          else {
            console.error('Invalid response structure:', data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      fetchUserData();
    }, []);
    
    
    







  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  
    // Filter recipe names based on input value from userData
    if (userData && userData.recipe) {
        const recipeNames = userData.recipe.map((recipe) => recipe.name_of_recipe);
        const filteredSuggestions = recipeNames.filter((name) =>
          name.toLowerCase().startsWith(value.toLowerCase()) // Check if name starts with input value
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]); // Clear suggestions when no userData is available
      }
    };

  return (
    <div className="relative ml-auto mr-7">
      <input
        type="search"
        className="relative w-[240px] h-11 flex-auto rounded-md border border-1 border-solid border-black bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2"
        value={inputValue}
        onChange={handleInputChange}
      />
      <svg
        width={25}
        height={20}
        viewBox="0 0 25 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute right-3 top-3"
      >
        {/* ... SVG path ... */}
      </svg>

      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 py-2 z-50">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="px-3 py-1 cursor-pointer hover:bg-gray-100">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
