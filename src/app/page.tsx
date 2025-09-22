'use client'

import { ArrowRight, CheckCircle, Zap, Shield, Globe, Mic, Gamepad2, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AudioRecorder } from '@/components/AudioRecorder'

export default function Home() {
  const [isGameActive, setIsGameActive] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleRecordingComplete = (audioBlob: Blob) => {
    setHasRecorded(true)
    console.log('Recording completed:', audioBlob)
  }

  const startGame = () => {
    setIsGameActive(true)
    setHasRecorded(false)
  }

  const resetGame = () => {
    setIsGameActive(false)
    setHasRecorded(false)
  }

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
          {/* Logo */}
          <motion.div 
            className='flex items-center space-x-2 cursor-pointer rounded-lg px-2 py-1 transition-colors'
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            title="Click to scroll to top"
          >
            <Gamepad2 className='h-8 w-8 text-primary' />
            <span className='text-xl font-bold'>Voice Game</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                variant='ghost' 
                onClick={scrollToFeatures}
                className='text-sm font-medium'
              >
                Features
              </Button>
            </motion.div>
            <Button 
              variant='ghost' 
              className='text-sm font-medium'
              onClick={() => window.open('https://github.com', '_blank')}
            >
              GitHub
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2'
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden border-t bg-background/95 backdrop-blur'
          >
            <div className='container mx-auto px-4 py-4 space-y-2'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full'
              >
                <Button 
                  variant='ghost' 
                  className='w-full justify-start'
                  onClick={() => {
                    scrollToFeatures()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Features
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full'
              >
                <Button 
                  variant='ghost' 
                  className='w-full justify-start'
                  onClick={() => {
                    window.open('https://github.com', '_blank')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  GitHub
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Audio Recording Mini-Game Section */}
      <main className='flex-1'>
        <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20'>
          <div className='container flex max-w-[64rem] flex-col items-center gap-8 text-center'>
            <div className='space-y-4'>
              <h1 className='font-heading text-3xl sm:text-5xl md:text-6xl'>
                <span className='flex items-center justify-center gap-4'>
                  <Gamepad2 className='h-16 w-16 sm:h-20 sm:w-20 text-primary' />
                  Audio Recording
                </span>
                <br />
                <span className='text-muted-foreground'>Mini-Game</span>
              </h1>
              <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
                Test your voice recording skills! Record an audio file in WebM format
                and see your recording come to life. Perfect for voice notes, 
                audio messages, or just having fun with sound.
              </p>
            </div>

            {/* Game Area */}
            <div className='w-full max-w-2xl'>
              {!isGameActive ? (
                <Card className='p-8'>
                  <CardContent className='space-y-6'>
                    <div className='flex items-center justify-center'>
                      <Mic className='h-16 w-16 text-primary' />
                    </div>
                    <div className='space-y-2'>
                      <h2 className='text-2xl font-bold'>Ready to Record?</h2>
                      <p className='text-muted-foreground'>
                        Click the button below to start the audio recording mini-game.
                        You'll be able to record, pause, resume, and play back your audio.
                      </p>
                    </div>
                    <Button 
                      onClick={startGame}
                      size='lg' 
                      className='w-full sm:w-auto px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg'
                    >
                      <Mic className='mr-2 h-4 w-4 sm:h-5 sm:w-5' />
                      <span className='hidden sm:inline'>Start Recording Game</span>
                      <span className='sm:hidden'>Start Game</span>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className='space-y-6'>
                  <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                  
                  {hasRecorded && (
                    <Card className='border-green-200 bg-green-50'>
                      <CardContent className='p-6 text-center'>
                        <div className='space-y-4'>
                          <div className='flex items-center justify-center'>
                            <CheckCircle className='h-12 w-12 text-green-500' />
                          </div>
                          <div className='space-y-2'>
                            <h3 className='text-xl font-bold text-green-800'>
                              Your answer is recorded!
                            </h3>
                            <p className='text-green-600'>
                              Great job! You've successfully recorded your audio in WebM format.
                              You can play it back, download it, or record again.
                            </p>
                          </div>
                          <div className='flex gap-2 justify-center'>
                            <Button 
                              onClick={resetGame}
                              variant='outline'
                              className='border-green-300 text-green-700 hover:bg-green-100'
                            >
                              Play Again
                            </Button>
                            <Button 
                              onClick={resetGame}
                              className='bg-green-600 hover:bg-green-700'
                            >
                              New Recording
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          className='container py-8 md:py-12 lg:py-24' 
          id='features'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
              Audio Recording Features
            </h2>
            <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7'>
              Experience high-quality audio recording with modern web technologies
              and intuitive controls designed for the best user experience.
            </p>
          </motion.div>
          <motion.div 
            className='mx-auto mt-12 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="transition-all duration-300"
            >
              <Card className='relative overflow-hidden'>
                <CardHeader>
                  <div className='flex items-center space-x-2'>
                    <Mic className='h-6 w-6 text-primary' />
                    <CardTitle>High Quality Audio</CardTitle>
                  </div>
                  <CardDescription>
                    Record audio in WebM format with Opus codec for optimal quality
                    and compression
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      WebM format support
                    </li>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      Opus codec encoding
                    </li>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      44.1kHz sample rate
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="transition-all duration-300"
            >
              <Card className='relative overflow-hidden'>
                <CardHeader>
                  <div className='flex items-center space-x-2'>
                    <Zap className='h-6 w-6 text-primary' />
                    <CardTitle>Real-time Controls</CardTitle>
                  </div>
                  <CardDescription>
                    Full control over your recording with pause, resume, and stop
                    functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      Pause and resume
                    </li>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      Live recording timer
                    </li>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      Instant playback
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="transition-all duration-300"
            >
              <Card className='relative overflow-hidden'>
                <CardHeader>
                  <div className='flex items-center space-x-2'>
                    <Shield className='h-6 w-6 text-primary' />
                    <CardTitle>Privacy First</CardTitle>
                  </div>
                  <CardDescription>
                    Your recordings stay in your browser - no data is sent to external
                    servers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      Client-side processing
                    </li>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      No data collection
                    </li>
                    <li className='flex items-center'>
                      <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                      Secure recording
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className='border-t py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
            <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
              Audio Voice Mini-Game built with Next.js, Bun, and shadcn/ui. 
              Features WebM audio recording with modern web APIs. The source code is
              available on{' '}
              <a
                href='https://github.com'
                target='_blank'
                rel='noreferrer'
                className='font-medium underline underline-offset-4'
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
