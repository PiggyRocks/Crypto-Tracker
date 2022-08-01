import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Coin from './Coin';
import './App.css';

 // 

function App() {
const[coins,setCoins]=useState([]);
const[search,setSearch] =useState('');
let display=false;

  useEffect(()=>{
    if(!search){
      display=true;
      return;
    }
axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
          .then(response=>{
             setCoins(response.data)
             console.log(response.data)
          }).catch(error=>{
              console.log(error)
          });
          

          

  },[search])
  
 const handleChange=e=>{
  setSearch(e.target.value)
  //console.log("happy");
 }

 const filteredCoins=coins.filter (coin=>
  coin.name.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <div className="App">
      <div className="coin-search">
        {/* <h1 className="coin-text"> Search a currency</h1> */}
        <div className="bouncing-text">
  <div className="b">C</div>
  <div className="o">R</div>
  <div className="u">Y</div>
  <div className="n">P</div>
  <div className="c">T</div>
  <div className="e">O</div>
  
  <div className="shadow"></div>
  <div className="shadow-two"></div>
</div>



        <form>
          
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
       {filteredCoins.map(coin=>{
        return (
<Coin key={coin.id} 
name={coin.name} 
image ={coin.image} 
symbol={coin.symbol}
volume={coin.total_volume}
price={coin.current_price}
priceChange={coin.price_change_percentage_24h}
marketcap={coin.market_cap}
/>
        
        );      
       })}
    </div>
  );
}

export default App;
