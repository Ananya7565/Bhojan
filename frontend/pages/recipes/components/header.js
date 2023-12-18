import Link from 'next/link';

import { useState, useEffect } from 'react';
const Header = () => {



  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 842);
    };

    handleResize(); // Set initial state on component mount
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <main>
      
       
      <header className={`flex justify-between w-screen py-1 m-0  items-center bg-D3CABD p-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>


        {isMobile && (
        
  <div className="icons-bg fixed flex items-center justify-center z-50" >
    <div className="flex  space-x-6">
        


          <Link href="/h">
            <svg xmlns="http://www.w3.org/2000/svg" className='abc' width="40" height="40" viewBox="0 0 36 36">
              <path fill="currentColor" d="m33.71 17.29l-15-15a1 1 0 0 0-1.41 0l-15 15a1 1 0 0 0 1.41 1.41L18 4.41l14.29 14.3a1 1 0 0 0 1.41-1.41Z" class="clr-i-outline clr-i-outline-path-1" />
              <path fill="currentColor" d="M28 32h-5V22H13v10H8V18l-2 2v12a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76l-2-2Z" class="clr-i-outline clr-i-outline-path-2" />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </Link>
          <Link href="/settings">
<svg xmlns="http://www.w3.org/2000/svg"  className='abc' width="40" height="40" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4ZM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47Z"/></svg>
</Link>
<Link href="/likes">
<svg xmlns="http://www.w3.org/2000/svg" className='abc' width="40" height="40" viewBox="0 0 32 32"><path fill="currentColor" d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.462 7.462 0 0 1-.608-9.41Zm10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.462 5.462 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006l-1.285-1.796Z"/></svg>
</Link>
<Link href="/calendar">
<svg xmlns="http://www.w3.org/2000/svg" className='abc' width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M7.5 6V1m10 5V1m4 16v4.5h-18v-3m17.863-10H3.352M.5 18.25v.25h17.9l.15-.25l.234-.491A28 28 0 0 0 21.5 5.729V3.5h-18v2.128A28 28 0 0 1 .743 17.744L.5 18.25Z"/></svg>
</Link>
<Link href="/newpage">
<svg xmlns="http://www.w3.org/2000/svg" className='abc' width="45" height="45" viewBox="0 0 20 20"><path fill="currentColor" d="M16 5.268V13a3 3 0 0 1-3 3H5.268A2 2 0 0 0 7 17h6a4 4 0 0 0 4-4V7a2 2 0 0 0-1-1.732ZM11.5 9.5a.5.5 0 0 0 0-1h-2v-2a.5.5 0 1 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2ZM13 3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8Zm1 2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5Z"/></svg>
</Link>
        </div>
</div>
        )}


<div className="text-center  w-full">
          <p className="head-qwe text-4xl sm:text-6xl mx-auto font-bold text-black">Bhojan</p>
        </div>



{!isMobile && (
        <div className="flex absolute right-4 sm:right-10 top-5 space-x-2 sm:space-x-6">  
         <Link href="/h">
            <svg xmlns="http://www.w3.org/2000/svg" className='abc' width="30" height="30" viewBox="0 0 36 36">
              <path fill="currentColor" d="m33.71 17.29l-15-15a1 1 0 0 0-1.41 0l-15 15a1 1 0 0 0 1.41 1.41L18 4.41l14.29 14.3a1 1 0 0 0 1.41-1.41Z" class="clr-i-outline clr-i-outline-path-1" />
              <path fill="currentColor" d="M28 32h-5V22H13v10H8V18l-2 2v12a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76l-2-2Z" class="clr-i-outline clr-i-outline-path-2" />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </Link>
          <Link href="/settings">
<svg xmlns="http://www.w3.org/2000/svg"  className='abc' width="30" height="30" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4ZM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47Z"/></svg>
</Link>
<Link href="/likes">
<svg xmlns="http://www.w3.org/2000/svg" className='abc' width="30" height="30" viewBox="0 0 32 32"><path fill="currentColor" d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.462 7.462 0 0 1-.608-9.41Zm10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.462 5.462 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006l-1.285-1.796Z"/></svg>
</Link>
<Link href="/calendar">
<svg xmlns="http://www.w3.org/2000/svg" className='abc' width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M7.5 6V1m10 5V1m4 16v4.5h-18v-3m17.863-10H3.352M.5 18.25v.25h17.9l.15-.25l.234-.491A28 28 0 0 0 21.5 5.729V3.5h-18v2.128A28 28 0 0 1 .743 17.744L.5 18.25Z"/></svg>
</Link>
<Link href="/newpage">
<svg xmlns="http://www.w3.org/2000/svg" className='abc' width="30" height="30" viewBox="0 0 20 20"><path fill="currentColor" d="M16 5.268V13a3 3 0 0 1-3 3H5.268A2 2 0 0 0 7 17h6a4 4 0 0 0 4-4V7a2 2 0 0 0-1-1.732ZM11.5 9.5a.5.5 0 0 0 0-1h-2v-2a.5.5 0 1 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2ZM13 3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8Zm1 2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5Z"/></svg>
</Link>
        </div>
      )}


        <Link href="/h" class="abc absolute top-4 left-4 sm:left-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <mask id="ipSBack0">
              <path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z" clip-rule="evenodd" />
            </mask>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSBack0)" />
          </svg>
        </Link>
      </header>
    </main>
  );
};

export default Header;
