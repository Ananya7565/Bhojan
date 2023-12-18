// components/CustomParagraph.js
import Link from 'next/link';
import '../../../app/globals.css';
import '../../../app/styles.css';
import { useRouter } from "next/router";

import React, { useEffect, useState } from 'react';



const Custom = () => {
    
























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


























































  

    
  const router = useRouter();
  const { name } = router.query;
  const recipeName = name ? name.toString() : '';




  console.log('Recipe Name:', recipeName); // Log the recipe name from the URL
  console.log('Ingredients:', userData?.ingredients_used); // Log the ingredients array

  if (!recipeName) {
    return <div>Recipe name not provided!</div>;
  }

  const selectedRecipe = userData?.recipe.find(
    (recipe) => recipe.name_of_recipe.toLowerCase() === recipeName.toLowerCase()
  );

  if (!selectedRecipe) {
    return <div>Recipe not found!</div>;
  }







  const recipeIngredients = userData?.ingredients_used.filter(
    (ingredient) => ingredient.name_of_recipe.toLowerCase() === recipeName.toLowerCase()
  );
    return(
      <main className="flex min-h-screen  flex-col items-center justify-between bg-customBgColor">
      <div className='relative'>
      <img src={selectedRecipe.image} className="flex w-screen pic_cover h-screen w-screen opacity-50"/>
      <div className='absolute left-10 top-60'>
      <p className="qwe pos_small line text-[62px] font-bold text-black  flex relative md:text-[48px] lg:text-[56px] xl:text-[62px]">{selectedRecipe.name_of_recipe}</p>
      <div className='pos_small_star relative'>
      <svg
  width={234}
  height={33}
  viewBox="0 0 234 33"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[233.78px] h-[33px]"
  preserveAspectRatio="none"
>
  <path
    d="M32.6797 11.0448L22.9203 10.1979L19.1093 1.22496C18.4237 -0.408321 16.0847 -0.408321 15.3991 1.22496L11.5882 10.2181L1.84895 11.0448C0.0745208 11.186 -0.651383 13.404 0.699604 14.5735L8.09979 20.9857L5.88175 30.5031C5.47847 32.2372 7.35372 33.6083 8.88618 32.6808L17.2542 27.6398L25.6223 32.7009C27.1547 33.6285 29.03 32.2573 28.6267 30.5232L26.4087 20.9857L33.8089 14.5735C35.1599 13.404 34.4541 11.186 32.6797 11.0448V11.0448Z"
    fill="#ff6961"
  />
  <path
    d="M82.4951 11.0448L72.7357 10.1979L68.9247 1.22496C68.2392 -0.408321 65.9002 -0.408321 65.2146 1.22496L61.4036 10.2181L51.6644 11.0448C49.89 11.186 49.164 13.404 50.515 14.5735L57.9152 20.9857L55.6972 30.5031C55.2939 32.2372 57.1691 33.6083 58.7016 32.6808L67.0697 27.6398L75.4377 32.7009C76.9702 33.6285 78.8454 32.2573 78.4421 30.5232L76.2241 20.9857L83.6243 14.5735C84.9753 13.404 84.2695 11.186 82.4951 11.0448V11.0448Z"
    fill="#ff6961"
  />
  <path
    d="M132.311 11.0448L122.551 10.1979L118.74 1.22496C118.055 -0.408321 115.716 -0.408321 115.03 1.22496L111.219 10.2181L101.48 11.0448C99.7054 11.186 98.9795 13.404 100.33 14.5735L107.731 20.9857L105.513 30.5031C105.109 32.2372 106.985 33.6083 108.517 32.6808L116.885 27.6398L125.253 32.7009C126.786 33.6285 128.661 32.2573 128.258 30.5232L126.04 20.9857L133.44 14.5735C134.791 13.404 134.085 11.186 132.311 11.0448V11.0448Z"
    fill="#ff6961"
  />
  <path
    d="M182.127 11.0448L172.368 10.1979L168.557 1.22496C167.871 -0.408321 165.532 -0.408321 164.846 1.22496L161.035 10.2181L151.296 11.0448C149.522 11.186 148.796 13.404 150.147 14.5735L157.547 20.9857L155.329 30.5031C154.926 32.2372 156.801 33.6083 158.333 32.6808L166.701 27.6398L175.07 32.7009C176.602 33.6285 178.477 32.2573 178.074 30.5232L175.856 20.9857L183.256 14.5735C184.607 13.404 183.901 11.186 182.127 11.0448V11.0448Z"
    fill="#ff6961"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M222.183 10.1979L231.942 11.0448C233.717 11.186 234.423 13.404 233.072 14.5735L225.671 20.9857L227.889 30.5232C228.293 32.2573 226.417 33.6285 224.885 32.7009L216.517 27.6398L208.149 32.6808C206.616 33.6083 204.741 32.2372 205.144 30.5031L207.362 20.9857L199.962 14.5735C198.611 13.404 199.337 11.186 201.112 11.0448L210.851 10.2181L214.662 1.22496C215.347 -0.408321 217.686 -0.408321 218.372 1.22496L222.183 10.1979ZM208.935 28.4469L216.517 23.8697L224.119 28.4671L222.102 19.8369L228.797 14.0297L219.965 13.2634L216.517 5.11719L213.089 13.2433L204.257 14.0095L210.952 19.8167L208.935 28.4469Z"
    fill="#ff6961"
  />
</svg>






      </div>
      
      <div class="relative  pt-8">
      <Link href='/'>
<div class="plan_1  w-[308px] h-[54px] rounded-[10px] bg-[#ff6961] ">
<p class="font-Allura text-4xl font-bold flex items-center justify-center text-black pt-3">Label</p>
</div>
</Link>
      </div>
        

</div>
</div>
       

        
      <p className="  line relative font-Allura text-7xl font-bold flex mt-10   m-0">Ingredients</p>
        
      <div
  className="relative container_page w-full mt-5 flex rounded-[20px] bg-[#f7f6f4] md:w-[90%] lg:w-[80%]"
  style={{
    boxShadow: "rgba(182,174,162) 6px 6px 12px 0 , rgb(252, 244, 234) -6px -6px 12px 0",
  }}
>
  <div className='flex justify-center w-full'>
  <ul className="relative  text-xl z-40 text-[#4f4f4f]">
  {recipeIngredients?.map((ingredient) => (
      <li
      key={ingredient.ingredient_id}
        className="flex items-center justify-center py-2 border-b border-gray-300"
      >
        <span className="font-Playfair font-bold pr-2 ">{ingredient.ingredient_name}-</span>
        <span className="font-Playfair font-bold ">{ingredient.quantity} {ingredient.unit}</span>
      </li>
    ))}
  </ul>
</div>
</div>



      <p class=" line relative font-Allura text-7xl font-bold flex mt-10    m-0 ">Step By Step</p>
         
         <div
      className="relative container_page w-full mb-auto mt-5 flex rounded-[20px] bg-[#f7f6f4] md:w-[90%] lg:w-[80%]"
      style={{ boxShadow: "rgba(182,174,162) 6px 6px 12px 0 , rgb(252, 244, 234) -6px -6px 12px 0"}}
    >
       <ul className="relative px-10 text-xl z-40 text-left text-[#4f4f4f] list-disc">
  {selectedRecipe.instructions.split('. ').map((sentence, index) => (
    <li key={index}>{sentence.trim()}</li>
  ))}
</ul>
      
 </div>
    
  <div className='pb-20'></div>











  





















     </main>
    );
  };
  
  export default Custom;
  