import Image from 'next/image';
import { RiArrowRightSLine } from 'react-icons/ri';
import Link from 'next/link';
import '../app/styles.css';
import '../app/globals.css';

import Header from '../pages/recipes/components/header';
import Footer from '../pages/recipes/components/footer';
import React, { useEffect, useState } from 'react';


export default function Home() {


























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
    <main className="flex min-h-screen flex-col items-center justify-between bg-customBgColor">
      <title>Bhojan</title>
      <Header />

      <div className="flex relative items-center  mr-auto ml-5 mt-4">
        <input
          type="search"
          className="search-input relative m-0 block    min-w-0 flex-auto rounded-md border border-2 border-solid border-black bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative ml-4 w-6 h-6 sm:w-8 sm:h-8"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314Z"
          />
        </svg>
      </div>

      <div className="relative padd flex justify-center text-5xl font-bold text-black pb-5">
        <p className=" relative line font-Allura "> Today’s Plan </p>
      </div>

    
      <Link href="/calendar" className="relative flex justify-center">
  <div className="plan w-full sm:w-[250%] md:w-[318px] h-[54px] rounded-[10px] bg-[#d3cabd]">
    <p className="font-Allura text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold flex items-center justify-center text-black pt-3">
                   Plan meals
    </p>
  </div>
</Link>


      <div className="card-container content-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-19.5">
      {userData && (
       userData.recipe.map((card) => (
          <div key={card.recipe_id} >
            <Link href={`/recipes/${card.name_of_recipe}`}>

            <div className="flex flex-col sm:flex-row">
              <div className="card">
                <img src={card.image} alt="Card Image" className="w-full sm:w-48 sm:h-48 sm:order-first sm:mr-4" />
                <div className="card-content">
                <p className="title">{card.name_of_recipe}</p>
                <p className="description">{card.description}</p>
                <div className="icons_bottom flex ">
                  <div className="time">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.5625 0.875C3.42822 0.875 0.875 3.42822 0.875 6.5625C0.875 9.69678 3.42822 12.25 6.5625 12.25C9.69678 12.25 12.25 9.69678 12.25 6.5625C12.25 3.42822 9.69678 0.875 6.5625 0.875ZM6.5625 1.75C9.2251 1.75 11.375 3.8999 11.375 6.5625C11.375 9.2251 9.2251 11.375 6.5625 11.375C3.8999 11.375 1.75 9.2251 1.75 6.5625C1.75 3.8999 3.8999 1.75 6.5625 1.75ZM6.125 2.625V7H8.75V6.125H7V2.625H6.125Z"
                        fill="black"
                      />
                    </svg>
                    <p>{card.cook_time}</p>
                  </div>
                  <svg
                    width="21"
                    height="25"
                    viewBox="0 0 21 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="timer"
                  >
                    <path
                      fill="currentColor"
                      d="M128 40a96 96 0 1 0 96 96a96.11 96.11 0 0 0-96-96Zm0 176a80 80 0 1 1 80-80a80.09 80.09 0 0 1-80 80Zm45.66-125.66a8 8 0 0 1 0 11.32l-40 40a8 8 0 0 1-11.32-11.32l40-40a8 8 0 0 1 11.32 0ZM96 16a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Z"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 26 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="truck"
                  >
                    

      <path fill="currentColor" d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5l-3-4Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  className="sun">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0Z"/>
      </svg>
      </div>
      </div>
    </div>
</div>
    </Link>
    </div>
)))}
</div>
      








<div class="pb-40"></div>

<Footer/>



    </main>
  )
}





