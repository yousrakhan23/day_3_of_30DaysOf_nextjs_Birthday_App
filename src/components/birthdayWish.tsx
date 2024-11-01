"use client"; 

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

type ConfettiProps = {
  width: number
  height: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })


const candleColors = ['740938', 'FF6600', '000B58', '3D5300', 'FF4545']
const balloonColors = ['3D5300', '740938', 'FF4545', '000B58', 'FF6600']
const confettiColors = ['000B58', '#4ECDC4', '740938', 'FF4545', 'FF6600', '#F7DC6F', '#BB8FCE']

export default function BirthdayWish() {
  
  const [candlesLit, setCandlesLit] = useState<number>(0)
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0) 
  const [showConfetti, setShowConfetti] = useState<boolean>(false) 
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 }) 
  const [celebrating, setCelebrating] = useState<boolean>(false) 

  
  const totalCandles: number = 5
  const totalBalloons: number = 5 


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  
  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 500)
  }

  return (
    
    
    <div className="min-h-screen  flex items-center justify-center p-4">
    
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        
        <Card className="mx-auto overflow-hidden transition-all duration-600 ease-out hover:shadow-xl border-2 border-black">
          
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-rose-950">Happy Birthday..!!</CardTitle>
            <CardDescription className="text-3xl font-[Poppins] font-bold text-yellow-600">Abeera</CardDescription>
            <p className="text-[18px] text-rose-500 font-[Poppins] font-bold">November 9th</p>
          </CardHeader>
          
          <CardContent className="space-y-6 text-center">
            
            <div>
              <h3 className="text-lg font-semibold text-purple-950 mb-2">Lets celebrate....</h3>
              <div className="flex justify-center space-x-2">
                
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                   
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        
                        <FaBirthdayCake
                          className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      
                      <FaBirthdayCake
                        className={`w-8 h-8 text-indigo-300 transition-colors duration-800 ease-in-out cursor-pointer hover:scale-110`}
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
           
            <div>
              <h3 className="text-lg font-semibold text-green-500 mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
               
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
    
  )
}