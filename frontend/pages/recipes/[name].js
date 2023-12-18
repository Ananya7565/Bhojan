import Link from 'next/link';
import '../../app/styles.css';
import '../../app/globals.css';
import {useRouter } from "next/router";
import Custom from "./components/Recipes_boilerplate";

import {  useEffect,useState } from 'react';

import Header from '../recipes/components/header';
import Footer from '../recipes/components/footer';



const NewPage = () => {


  
  



   





































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










  
  

  return (
    <main>
    <title>userData.recipe.recipe_name</title>
    
    
      

    <Header/>
    
    
    <Custom />


<Footer/>
</main>
  );

};
export default NewPage;