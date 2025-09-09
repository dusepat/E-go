/*
E-Go Passenger Frontend (single-file React component)
- Uses Tailwind CSS for styling (make sure Tailwind is set up in your project)
- Uses Framer Motion for animations

How to run (dev):
1. Create a new Vite React app: `npm create vite@latest e-go -- --template react`
2. cd e-go
3. Install deps: `npm install framer-motion`
4. Install and configure Tailwind CSS (https://tailwindcss.com/docs/guides/vite)
5. Replace src/App.jsx with this file, then `npm run dev`

This file provides a complete interactive frontend prototype with mock data and local state.
*/

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const CITIES = [
  'Kigali', 'Muhanga', 'Huye', 'Rubavu', 'Gisenyi', 'Nyagatare', 'Rwamagana'
];

const MOCK_ROUTES = [
  { id: 'r1', company: 'E-Go Express', depart: '07:00', arrive: '10:30', price: 5000, seats: 40, amenities: ['WiFi','AC'] },
  { id: 'r2', company: 'Kigali Rides', depart: '08:30', arrive: '12:00', price: 4500, seats: 10, amenities: ['Snack'] },
  { id: 'r3', company: 'Mountain Lines', depart: '09:15', arrive: '13:00', price: 5500, seats: 2, amenities: ['WiFi','Snack','AC'] },
];

// Small utility
const formatCurrency = (v) => `RWF ${v.toLocaleString()}`;

// Components
function Header({ onOpenBookings }){
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold shadow">
            EG
          </div>
          <div>
            <div className="font-semibold">E‑Go</div>
            <div className="text-xs text-gray-500">Passenger Portal</div>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <button className="text-sm px-3 py-2 rounded hover:bg-gray-100">Home</button>
          <button className="text-sm px-3 py-2 rounded hover:bg-gray-100">Help</button>
          <button onClick={onOpenBookings} className="text-sm px-3 py-2 rounded bg-orange-500 text-white shadow">My Bookings</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onSearch }){
  const [from, setFrom] = useState('Kigali');
  const [to, setTo] = useState('Huye');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1}} className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Travel smart. Book faster. Ride happier.
          </motion.h1>
          <p className="mt-4 text-gray-600">Search routes, pick seats, and pay with mobile money — all in a few taps.</p>

          <div className="mt-6">
            <div className="bg-white shadow rounded-lg p-4 w-full max-w-xl">
              <div className="flex gap-2 items-center">
                <input value={from} onChange={(e)=>setFrom(e.target.value)} list="cities" className="flex-1 p-3 rounded border" />
                <input value={to} onChange={(e)=>setTo(e.target.value)} list="cities" className="flex-1 p-3 rounded border" />
                <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="p-3 rounded border" />
                <motion.button whileTap={{scale:0.97}} onClick={()=>onSearch({from,to,date})} className="bg-green-600 text-white px-4 py-3 rounded shadow">
                  Search
                </motion.button>
              </div>
              <datalist id="cities">
                {CITIES.map(c=> <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div initial={{scale:0.98, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:0.2}} className="bg-gradient-to-tr from-green-50 to-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-lg bg-green-200 flex items-center justify-center text-3xl">🚌</div>
              <div>
                <div className="font-semibold text-lg">Fast routes across Rwanda</div>
                <div className="text-sm text-gray-600 mt-1">Secure payments • Live tracking • Friendly drivers</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg shadow text-center">Book Ticket</div>
              <div className="p-3 bg-white rounded-lg shadow text-center">Track Bus</div>
              <div className="p-3 bg-white rounded-lg shadow text-center">Customer Care</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative road curve */}
      <div className="absolute -bottom-10 left-0 right-0 pointer-events-none">
        <svg className="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80 C 360 0, 1080 160, 1440 80 L1440 120 L0 120 Z" fill="#ECFDF5" />
        </svg>
      </div>
    </section>
  );
}

function Results({ routes, onSelect, loading }){
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Available buses</h2>
      {loading ? (
        <div className="py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-400 border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map(r=> (
            <motion.div key={r.id} whileHover={{ y:-6 }} className="bg-white rounded-lg shadow p-4 border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{r.company}</div>
                  <div className="text-sm text-gray-500">{r.depart} → {r.arrive}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(r.price)}</div>
                  <div className="text-xs text-gray-500">{r.seats} seats</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-gray-600">{r.amenities.join(' • ')}</div>
                <button onClick={()=>onSelect(r)} className="px-3 py-2 rounded bg-orange-500 text-white">Select</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function SeatSelector({ route, onConfirm }){
  const cols = 4;
  const total = route.seats;
  const [selected, setSelected] = useState(null);
  // Mock booked seats
  const booked = useMemo(()=> new Set([2,5,9,15,26].slice(0, Math.max(0, Math.floor(total/10)))) , [total]);

  const seats = Array.from({length: total}).map((_, i)=> ({
    id: i+1,
    status: booked.has(i+1) ? 'booked' : 'free'
  }));

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{route.company} — {route.depart} → {route.arrive}</div>
            <div className="text-sm text-gray-500">Select your seat</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">{formatCurrency(route.price)}</div>
            <div className="text-xs text-gray-500">per seat</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3">
          {seats.map(s=> (
            <motion.button key={s.id} whileTap={{ scale: 0.96 }} onClick={()=> s.status==='free' && setSelected(s.id)} className={`p-3 rounded-lg border ${s.status==='booked' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : selected===s.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-green-50 text-gray-800'}`}>
              <div className="text-sm font-medium">{s.id}</div>
              <div className="text-xs">{s.status==='booked' ? 'Taken' : 'Free'}</div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={()=>onConfirm(null)} className="px-4 py-2 rounded border">Cancel</button>
          <button disabled={!selected} onClick={()=>onConfirm(selected)} className={`px-4 py-2 rounded ${selected ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
            Confirm Seat
          </button>
        </div>
      </div>
    </section>
  );
}

function PaymentForm({ amount, onSuccess, onBack }){
  const [method, setMethod] = useState('mtn');
  const [phone, setPhone] = useState('2507');
  const [loading, setLoading] = useState(false);

  function pay(){
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      onSuccess({ reference: 'EG-'+Math.random().toString(36).slice(2,8).toUpperCase() });
    }, 1200);
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="font-semibold">Payment</div>
        <div className="text-sm text-gray-600 mt-1">Amount: <span className="font-medium">{formatCurrency(amount)}</span></div>

        <div className="mt-4">
          <label className="block text-xs text-gray-500">Payment method</label>
          <div className="mt-2 flex gap-2">
            <button onClick={()=>setMethod('mtn')} className={`px-3 py-2 rounded ${method==='mtn' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>MTN Mobile Money</button>
            <button onClick={()=>setMethod('airtel')} className={`px-3 py-2 rounded ${method==='airtel' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Airtel Money</button>
            <button onClick={()=>setMethod('card')} className={`px-3 py-2 rounded ${method==='card' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>Card</button>
          </div>
        </div>

        {method !== 'card' && (
          <div className="mt-4">
            <label className="block text-xs text-gray-500">Phone number</label>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="mt-1 p-3 rounded border w-full" />
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button onClick={onBack} className="px-4 py-2 rounded border">Back</button>
          <button disabled={loading} onClick={pay} className={`px-4 py-2 rounded ${loading ? 'bg-gray-200' : 'bg-orange-500 text-white'}`}>
            {loading ? 'Processing...' : 'Pay now'}
          </button>
        </div>
      </div>
    </section>
  );
}

function Ticket({ booking, onDone }){
  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-white rounded-lg shadow p-6 text-center">
        <div className="text-green-600 font-semibold">Booking confirmed</div>
        <div className="mt-3 text-lg font-bold">{booking.route.company} — {booking.route.depart} → {booking.route.arrive}</div>
        <div className="mt-2 text-sm text-gray-500">Seat: {booking.seat} • {formatCurrency(booking.route.price)}</div>
        <div className="mt-4 inline-block bg-gray-100 rounded p-4">
          {/* simple QR placeholder */}
          <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" fill="#fff"/>
            <rect x="10" y="10" width="30" height="30" fill="#111"/>
            <rect x="80" y="10" width="30" height="30" fill="#111"/>
            <rect x="10" y="80" width="30" height="30" fill="#111"/>
            <rect x="40" y="40" width="8" height="8" fill="#111"/>
            <rect x="54" y="40" width="8" height="8" fill="#111"/>
            <rect x="68" y="40" width="8" height="8" fill="#111"/>
          </svg>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={()=>navigator.clipboard?.writeText(booking.reference)} className="px-4 py-2 rounded border">Copy ref</button>
          <button onClick={onDone} className="px-4 py-2 rounded bg-green-600 text-white">Done</button>
        </div>
      </motion.div>
    </section>
  );
}

// Main App
export default function App(){
  const [view, setView] = useState('home'); // home | results | seats | payment | ticket | bookings
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [booking, setBooking] = useState(null);
  const [bookingsList, setBookingsList] = useState([]);

  function handleSearch({from,to,date}){
    setView('results');
    setLoading(true);
    // simulate api
    setTimeout(()=>{
      // simple filter mock: return all but sorted by price
      setRoutes(MOCK_ROUTES.slice().sort((a,b)=>a.price-b.price));
      setLoading(false);
    }, 700);
  }

  function handleSelectRoute(r){
    setSelectedRoute(r);
    setView('seats');
  }

  function handleConfirmSeat(seat){
    if(!seat){ setView('results'); return; }
    setSelectedSeat(seat);
    setView('payment');
  }

  function handlePaymentSuccess({reference}){
    const newBooking = { reference, route: selectedRoute, seat: selectedSeat, date: new Date().toISOString() };
    setBooking(newBooking);
    setBookingsList(prev=>[newBooking, ...prev]);
    setView('ticket');
  }

  function openBookings(){
    setView('bookings');
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onOpenBookings={openBookings} />

      <main>
        <AnimatePresence mode="wait">
          {view==='home' && (
            <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <Hero onSearch={handleSearch} />

              {/* quick features */}
              <section className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-6 shadow">Fast Booking</div>
                  <div className="bg-white rounded-lg p-6 shadow">Secure Payments</div>
                  <div className="bg-white rounded-lg p-6 shadow">24/7 Support</div>
                </div>
              </section>
            </motion.div>
          )}

          {view==='results' && (
            <motion.div key="results" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <Results routes={routes} loading={loading} onSelect={handleSelectRoute} />
            </motion.div>
          )}

          {view==='seats' && selectedRoute && (
            <motion.div key="seats" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <SeatSelector route={selectedRoute} onConfirm={handleConfirmSeat} />
            </motion.div>
          )}

          {view==='payment' && (
            <motion.div key="payment" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <PaymentForm amount={selectedRoute.price} onSuccess={handlePaymentSuccess} onBack={()=>setView('seats')} />
            </motion.div>
          )}

          {view==='ticket' && booking && (
            <motion.div key="ticket" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <Ticket booking={booking} onDone={()=>setView('home')} />
            </motion.div>
          )}

          {view==='bookings' && (
            <motion.div key="bookings" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">My Bookings</div>
                    <button onClick={()=>setView('home')} className="px-3 py-1 rounded border">Close</button>
                  </div>

                  <div className="mt-4">
                    {bookingsList.length===0 ? (
                      <div className="text-gray-500">You have no bookings yet.</div>
                    ) : (
                      <ul className="divide-y">
                        {bookingsList.map(b=> (
                          <li key={b.reference} className="py-4 flex items-center justify-between">
                            <div>
                              <div className="font-medium">{b.route.company} — Seat {b.seat}</div>
                              <div className="text-sm text-gray-500">Ref: {b.reference}</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={()=>{ setBooking(b); setView('ticket'); }} className="px-3 py-1 rounded border">View</button>
                              <button onClick={()=>{ setBookingsList(prev=> prev.filter(x=>x.reference!==b.reference)); }} className="px-3 py-1 rounded bg-red-50 text-red-600">Cancel</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-12 py-8 text-center text-sm text-gray-500">© E-Go — prototype</footer>
    </div>
  );
}
