import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'


const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState(false)

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new web3.PublicKey(address)
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
      // connection.getBalance(key).then(balance => {
      //   setBalance(balance / web3.LAMPORTS_PER_SOL)
      // })
      
      // solana-gif-portal program id: 7hhqzFD9HZRcdnLcFqjeCYtLYyKDZacJ5VSnHAH7uyR7 (excutable: true)
      // Phantom wallet address: B983Z29xWWYXTJnqNm6ZATkUP19629785zjEVBbYN12S (executable: false)
      
      connection.getAccountInfo(key).then(val => {
        let executable = val?.executable as boolean
        let balance = val?.lamports as number
        setIsExecutable(executable)
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is executable?: ${isExecutable ? "Yes" : "Nope"}`}</p>
      </header>
    </div>
  )
}

export default Home
