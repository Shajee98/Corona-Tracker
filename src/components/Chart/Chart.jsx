import React, { useEffect, useState } from 'react'
import { fetchDailyData } from '../../api';
import {Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

function Chart({data: {confirmed, recovered, deaths, lastUpdate},country}) {
    const [dailyGlobalData, setDailyGlobalData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedGlobalData = await fetchDailyData();
            setDailyGlobalData(fetchedGlobalData);
        }
        return fetchAPI();
    },[])

    const GloballineChart = (
        dailyGlobalData.length ? (
            <Line data={{
                labels: dailyGlobalData.map(({ date }) => date),
                datasets: [{
                  data: dailyGlobalData.map(({confirmed}) => confirmed),
                  label: "Infected",
                  borderColor: "#3333ff",
                  fill: true
                },{
                    data: dailyGlobalData.map(({ deaths}) => deaths),
                    label: "Deaths",
                    borderColor: "red",
                    backgroundColor: "rgba(250,0,0,0.5)",
                    fill: true
                }],
            }} />) : null
        );

        const CountrylineChart = (
                confirmed ? (
                <Bar 
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets:
                    [{
                      label: `Current state in ${country}`,
                      backgroundColor: ['rgba(0,0,250,0.5)',
                                    'rgba(0,250,0,0.5)',
                                    'rgba(250,0,0,0.5)'],
                      data: [confirmed.value,recovered.value,deaths.value]
                    }],
                }}
                    options={{
                      legend:  {display: false},
                      title: {display: true, text: `Current state in ${country}`},
                    }}
              />) : null 
            );

    return (
        <div className={styles.container}>
            {country ? CountrylineChart : GloballineChart}
        </div>
    )
}

export default Chart
