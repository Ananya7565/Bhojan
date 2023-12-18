// pages/NewPage.js
import Link from 'next/link';
import '../app/styles.css';
import '../app/globals.css';
import Header from '../pages/recipes/components/header';
import Footer from '../pages/recipes/components/footer';
import { useEffect,useState } from 'react';

import dayjs from "dayjs";


let selectedDate = dayjs().format("YYYY-MM-DD");
const TODAY = dayjs().format("DD-MM-YYYY");
const NewPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
  const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

document.getElementById("app").innerHTML = `
<div class="calendar-month">
  <section class="calendar-month-header">
    <div
      id="selected-month"
      class="calendar-month-header-selected-month"
    ></div>
    <section class="calendar-month-header-selectors">
      <span id="previous-month-selector"><</span>
      <span id="present-month-selector">Today</span>
      <span id="next-month-selector">></span>
    </section>
  </section>

  <ol
    id="days-of-week"
    class="day-of-week"
  /></ol>

  <ol
    id="calendar-days"
    class="days-grid"
  >
  </ol>
</div>
`;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
let currentMonthDays;
let previousMonthDays;
let nextMonthDays;

const daysOfWeekElement = document.getElementById("days-of-week");

WEEKDAYS.forEach((weekday) => {
  const weekDayElement = document.createElement("li");
  daysOfWeekElement.appendChild(weekDayElement);
  weekDayElement.innerText = weekday;
});

createCalendar();
initMonthSelectors();

function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
  const calendarDaysElement = document.getElementById("calendar-days");

  document.getElementById("selected-month").innerText = dayjs(
    new Date(year, month - 1)
  ).format("MMMM YYYY");

  removeAllDayElements(calendarDaysElement);

  currentMonthDays = createDaysForCurrentMonth(
    year,
    month,
    dayjs(`${year}-${month}-01`).daysInMonth()
  );

  previousMonthDays = createDaysForPreviousMonth(year, month);

  nextMonthDays = createDaysForNextMonth(year, month);

  const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  days.forEach((day) => {
    appendDay(day, calendarDaysElement);
  });
}

function appendDay(day, calendarDaysElement) {

  const dayElement = document.createElement("li");
  const dayElementClassList = dayElement.classList;
  dayElementClassList.add("calendar-day");
  const dayOfMonthElement = document.createElement("span");
  dayOfMonthElement.innerText = day.dayOfMonth;
  dayElement.appendChild(dayOfMonthElement);
  calendarDaysElement.appendChild(dayElement);

  if (!day.isCurrentMonth) {
    dayElementClassList.add("calendar-day--not-current");
  }

  if (day.date === TODAY) {
    dayElementClassList.add("calendar-day--today");
  }

  dayElement.addEventListener("click", () => {
    // Remove the selected class from all day elements
    selectedDate = day.date;
    const allDayElements = document.querySelectorAll(".calendar-day");
    allDayElements.forEach((element) => {
      element.classList.remove("calendar-day--selected");
    });

    // Add the selected class to the clicked day element
    dayElementClassList.add("calendar-day--selected");
    const formattedSelectedDate = dayjs(selectedDate).format("DD-MM-YYYY");
    const selectedDayHeader = document.getElementById("selected-date-header");
    selectedDayHeader.textContent = `Plan for ${formattedSelectedDate}`;
  });
}

function removeAllDayElements(calendarDaysElement) {
  let first = calendarDaysElement.firstElementChild;

  while (first) {
    first.remove();
    first = calendarDaysElement.firstElementChild;
  }
}

function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

function createDaysForCurrentMonth(year, month) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
}

function createDaysForPreviousMonth(year, month) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;

  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false
    };
  });
}

function createDaysForNextMonth(year, month) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );

  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: false
    };
  });
}

function getWeekday(date) {
  return dayjs(date).weekday();
}

function initMonthSelectors() {
  document
    .getElementById("previous-month-selector")
    .addEventListener("click", function () {
      selectedMonth = dayjs(selectedMonth).subtract(1, "month");
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
      const selectedDayHeader = document.getElementById("selected-date-header");
  selectedDayHeader.textContent = `Plan for3 ${dayjs(selectedDate).format("DD-MM-YYYY")}`;
    });

  document
    .getElementById("present-month-selector")
    .addEventListener("click", function () {
      selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));

      const selectedDayHeader = document.getElementById("selected-date-header");
    selectedDayHeader.textContent = `Plan for2 ${dayjs(TODAY).format('DD-MM-YYYY')}`;
    });

  document
    .getElementById("next-month-selector")
    .addEventListener("click", function () {
      selectedMonth = dayjs(selectedMonth).add(1, "month");
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
    });
}
}, []);





























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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false); // Add this line
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








    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion);
      setSuggestions([]); // Clear suggestions after selection
    setIsSuggestionsOpen(false);
    


      const selectedIngredientsList = userData?.ingredients_used
      .filter((ingredient) => ingredient.name_of_recipe.toLowerCase() === suggestion.toLowerCase())
      .map((ingredient) => ingredient.ingredient_name);
  
    setSelectedIngredients(selectedIngredientsList);
  };


  const handleRemoveItem = (meal, index) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [meal]: prevItems[meal].filter((_, i) => i !== index),
    }));
  };
















































  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItems, setSelectedItems] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  });
 


  useEffect(() => {
    if (selectedMeal && selectedItem) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [selectedMeal]: selectedItem,
      }));
    }
  }, [selectedMeal, selectedItem]);
  const handleItemSelect = () => {
    
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [selectedMeal]: [...prevItems[selectedMeal], inputValue],
    }));
  };
  const handleMealChange = (event) => {
    console.log("handleMealChange triggered");
    const meal = event.target.value;
    console.log("Selected Meal:", meal);
    setSelectedMeal(meal);
    setSelectedItem(selectedItems[meal]); // Update the input value with the selected item for the new meal
  };






 














  return (
    
    <main className="flex min-h-screen flex-col m-0 p-0 items-center justify-between  bg-customBgColor">
      


    <title>Bhojan</title>
    <Header/>
      
     



    <div className="grid-container content-start grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 ">

<div className='px-0'>


<div class=" mt-10 plan_2 w-[308px] h-[54px] rounded-[10px] bg-[#d3cabd] ml-6">
<p class="font-Allura text-4xl font-bold flex items-center justify-center text-black pt-3" id="selected-date-header_1">Select Date</p>
</div>
<div id="app" class="plan_2"></div>

</div>



<div class=" mt-10 space-y-8">
  
<div class=" plan_2 w-[308px] h-[54px] rounded-[10px] bg-[#d3cabd] ml-6">
<p class="font-Allura text-4xl font-bold flex items-center justify-center text-black pt-3" id="selected-date-header">Plan for {TODAY}</p>
</div>

<div className="plan_2 w-[280px] h-auto rounded-[10px] bg-white ml-9 ">
    
<div class="ml-5">
  
<p className="text-lg font-bold font-Playfair text-left text-black">Breakfast:</p>
{selectedItems.Breakfast.map((item, index) => (
  
      <p key={index} className="pb-3 flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"  onClick={() => handleRemoveItem('Breakfast', index)}><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 5.5l6 6m0-6l-6 6"/></g></svg>
      <span className='pl-3 font-Playfair font-bold'>  {item} </span>
       
      </p>
     
    ))}
  <p className="text-lg font-bold font-Playfair text-left text-black">Lunch:</p>
  {selectedItems.Lunch.map((item, index) => (
       <p key={index} className="pb-3 flex items-center">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"  onClick={() => handleRemoveItem('Lunch', index)}><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 5.5l6 6m0-6l-6 6"/></g></svg>
        <span className='pl-3 font-Playfair font-bold'>  {item} </span>
      </p>
    ))}
  <p className="text-lg font-bold font-Playfair text-left text-black">Dinner:</p>
  {selectedItems.Dinner.map((item, index) => (
       <p key={index} className="pb-3 flex items-center">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"  onClick={() => handleRemoveItem('Dinner', index)}><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><path d="m5.5 5.5l6 6m0-6l-6 6"/></g></svg>
        <span className='pl-3 font-Playfair font-bold'>  {item} </span>
      </p>
    ))}



</div>
</div>




<div className="plan_2 w-[360px] h-auto rounded-[10px] bg-[#c4c4c4]">

    <div class="relative top-4 flex">
    <p className="text-lg font-bold text-left text-black relative relative mt-2 mr-auto ml-7">Meal</p>
<div className="relative w-[240px] ml-auto mr-7">
            <select value={selectedMeal} onChange={handleMealChange}  className="w-[240px] p-2.5 text-gray-500 bg-white rounded-md border border-1 border-solid border-black shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option value="" disabled>Select a meal</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
            </select>
        </div>
        
</div>


<div class="relative top-7 flex">
<p className="text-lg font-bold text-left text-black relative mt-2 mr-auto ml-7">Item</p>
  <div class="relative  ml-auto mr-7">
    
    <input
      type="search"
      class="relative w-[240px]  h-11  flex-auto rounded-md border border-1 border-solid border-black bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="button-addon2" 
      value={inputValue}
        onChange={handleInputChange}/>
    <svg
  width={25}
  height={20}
  viewBox="0 0 25 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  class="absolute right-3 top-3"
>
  <path
    d="M24.3723 18.9647L24.3724 18.9648C24.4867 19.0563 24.5 19.1306 24.5 19.1611C24.5 19.1916 24.4867 19.2659 24.3724 19.3574C24.1349 19.5475 23.7696 19.5475 23.5321 19.3574L16.3336 13.5939L16.0561 13.3717L15.7551 13.5609C14.1472 14.5713 12.1087 15.1825 9.88319 15.1825C4.59373 15.1825 0.5 11.789 0.5 7.8433C0.5 3.89787 4.60362 0.5 9.89343 0.5C15.1829 0.5 19.2766 3.89348 19.2766 7.8392C19.2766 9.5766 18.4984 11.1871 17.1657 12.4667L16.7548 12.8614L17.1994 13.2176L24.3723 18.9647ZM9.88319 1.18598C5.43443 1.18598 1.60063 4.06757 1.60063 7.8433C1.60063 11.6147 5.4342 14.5006 9.88319 14.5006C14.3319 14.5006 18.1657 11.619 18.1657 7.8433C18.1657 4.06757 14.3319 1.18598 9.88319 1.18598Z"
    fill="black"
    stroke="black"
  />
</svg>

{suggestions.length > 0 && (
 
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-0 py-2 z-50">
           <div className="scrollable-list">
          {suggestions.map((suggestion, index) => (
             
            <li key={index} className="px-3 py-1 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(suggestion)} >
              {suggestion}
            </li>
           
          ))}
          </div>  
        </ul>
        
      )}
      
    
  </div>
  
</div>
<div className='flex justify-center pb-5 pl-2 pt-12'>
<button className="plan_item  font-Allura font-bold text-2xl px-4 py-1  w-[129px] h-[27px]rounded-[10px] bg-[#d3cabd]  rounded-lg" onClick={handleItemSelect}>
          Select Item
        </button>
</div>


</div>

<button
        onClick={() => setIsMenuOpen(true)}
class="plan w-[308px] h-[54px] rounded-[10px] bg-[#d3cabd] relative center mt-9 ml-6 ">
<p class="font-Allura text-4xl font-bold flex items-center justify-center text-black pt-3">Order</p>
</button>
</div>
{isMenuOpen && (
        <div className="fixed inset-0   bg-black bg-opacity-50 flex items-center justify-center z-50" >
          <div className="w-[360px] h-[399px] relative overflow-y-scroll bg-[#f5ecdf]">
  <div className="w-[360px] h-auto">
    <div className="w-[360px] h-[61px] relative left-[-0.5px] top-[-0.5px] bg-[#d3cabd]" >
    <p className="font-Allura pt-3 relative text-5xl font-bold text-center text-black">
      Bhojan
    </p>
    <button  onClick={() => setIsMenuOpen(false)}>
    <svg
      width={30}
      height={35}
      viewBox="0 0 30 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="abc w-[30px] h-[35px] absolute left-[11px] top-[13px]"
      preserveAspectRatio="none"
    >
      <path
        d="M29.9511 25.7489C28.8052 20.0512 25.2379 12.1128 14.4483 10.4358V5.41155C14.4483 4.36417 13.9046 3.42044 13.0746 3.02114C12.2447 2.62108 11.2897 2.8453 10.6558 3.58707L0.858765 15.0738C-0.285816 16.4161 -0.286474 18.5845 0.858107 19.9268L10.6558 31.4135C11.2883 32.1553 12.2453 32.3795 13.0753 31.9795C13.9053 31.5794 14.4489 30.6357 14.4489 29.589V24.7276C18.1302 24.733 23.4371 25.2981 27.2124 28.0395C27.8397 28.4956 28.6394 28.4656 29.2396 27.9619C29.8386 27.4612 30.1203 26.5874 29.9511 25.7489Z"
        fill="black"
      />
    </svg>
    </button>
    </div>
  </div>
  <p className="relative pl-5 text-lg text-center text-black">
  
    <span className="text-lg font-bold text-left text-black">Ordering </span>
    <span className="text-lg text-left text-black">for</span>
    <span className="text-lg font-bold text-left text-black"> 4 </span>
    <span className="text-lg text-left text-black">people</span>
    <span className="text-lg font-bold text-left text-black">:</span>
  </p>
  
  <p className="relative text-left pl-5 text-lg text-left text-black">

























  
  {selectedIngredients.length > 0 && (
      
       
        <ul className="text-lg text-left  text-black">
          {selectedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        
      
      
    )}
    











    
  </p>
  <p className="relative text-center text-lg font-bold text-black">
    Total: Rs. 100/-
  </p>


  <div className='flex flex-col items-center'>

  <button
              onClick={() => setIsMenuOpen(false)}
              className="plan mt-4  px-4 py-2  w-[129px] h-[27px]rounded-[10px] bg-[#c4c4c4]  rounded-lg"
            >
              <p className='text-lg font-bold text-center text-black'>Confirm</p>
              
            </button>
            <div className='pb-4'></div>
  </div>
            
</div>

        </div>
        
      )}

</div>


<div class="pb-10"></div>
<Footer/>
      </main>
  );
};

export default NewPage;
