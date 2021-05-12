import React from 'react'
import Cards from './components/Cards/Cards.jsx'
import Chart from './components/Chart/Chart.jsx'
import CountryPicker from './components/CountryPicker/CountryPicker.jsx'
import styles from './App.module.css'
import {fetchData} from './api'
import coronaImage from './images/image.png'

class App extends React.Component {
  state = {
    data: {},
    country: "",
  }


 async componentDidMount() {
   const fetchedData = await fetchData();
   this.setState({data: fetchedData})
    console.log(this.state.data);
  }
 
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country})
  }
  render() {
    const {data, country} = this.state;
    return (
        <div className={styles.container}>
          <img src={coronaImage} className={styles.image} alt="COVID 19"/>
          <Cards data={data}/>
          <CountryPicker handleCountryChange={this.handleCountryChange}/>  
          <Chart data={data} country={country} />
        </div>
    )
  }
}

export default App
