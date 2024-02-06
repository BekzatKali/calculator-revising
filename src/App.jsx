import { useState } from 'react'

function App() {
  const [input, setInput] = useState('0')
  const [calculatorData, setCalculatorData] = useState('')

  const operators = ['+', '-', '*', '/'];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleNumbers = (value) => {
    const lastChat = calculatorData[calculatorData.length - 1];
    if (input !== 'DIGIT LIMIT MET') {

      if (input.includes('.') && value && lastChat == '0') {
        setInput(`${input}${value}`)
        setCalculatorData(`${calculatorData}${value}`)
      } else {
        if (calculatorData && calculatorData.includes('+' || '-' || '*' || '/') && lastChat == '0' && value != '0') {
          setInput(`${value}`)
          setCalculatorData(calculatorData.slice(0, -1) + value)
        } else {
          if (calculatorData.includes('=') && value) {
            setInput(`${value}`)
            setCalculatorData(`${value}`)
        } else {
          if (input == '0' && value == '0') {
            setInput(`${input}`)
            setCalculatorData(`${calculatorData}`)
          } else if (value == '0' && lastChat == '0') {
            setInput(`${input}${value}`)
            setCalculatorData(`${calculatorData}${value}`)
          } else {
            if (input === '0') {
              setInput(`${value}`)
              setCalculatorData(`${value}`)
            } else if (input.length === 22 && input.split('').every(char => typeof parseInt(char) === 'number')) {
              setInput('DIGIT LIMIT MET')
            } else {
              const firstOperator = operators.includes(input[0])
              {firstOperator ? setInput(`${value}`) : setInput(`${input}${value}`)}
              setCalculatorData(`${calculatorData}${value}`) 
            }
          }
        } 
        }
      }

    }
    
  }

  const clearing = () => {
    if (!calculatorData.includes('=')) {
      let holder = [];
    let splitter = [];
      for (let i = 0; i < calculatorData.length; i++) {
        if (operators.includes(calculatorData[i])) {
          holder.push(calculatorData[i])
        }
      }
      if (holder.length >= 2 && operators.includes(calculatorData[calculatorData.length - 1]) && calculatorData[calculatorData.length - 2] !== '+') {
        splitter = calculatorData.slice(0, -1).split(/[+\-\*\/]/)
        setCalculatorData(calculatorData.slice(0, -1))
        setInput(splitter[splitter.length - 1])
      } else {
        if (input.length) {
          if (!calculatorData.includes('+') && !calculatorData.includes('-') && !calculatorData.includes('*') && !calculatorData.includes('/')) {
            if (input.length === 1) {
                setInput('0')
                setCalculatorData(`${calculatorData.replace(calculatorData[calculatorData.length - 1], '0')}`)
            } else if (calculatorData[calculatorData.length - 2] == '+' && calculatorData[calculatorData.length - 1] == '-' && input == '-') {
              setInput('+')
              setCalculatorData(calculatorData.slice(0, -1))
            } else {
              setInput(input.slice(0, -1))
              setCalculatorData(calculatorData.slice(0, -1))
            }
          }  else if (input.length === 1 && (calculatorData[calculatorData.length - 2] === '+' || calculatorData[calculatorData.length - 2] === '-' || calculatorData[calculatorData.length - 2] === '*' || calculatorData[calculatorData.length - 2] === '/')) {
            setInput(calculatorData[calculatorData.length - 2])
            setCalculatorData(calculatorData.slice(0, -1))
          } else if (calculatorData[calculatorData.length - 1] === '+' || calculatorData[calculatorData.length - 1] === '-' || calculatorData[calculatorData.length - 1] === '*' || calculatorData[calculatorData.length - 1] === '/') {
            setInput(calculatorData.slice(0, -1))
            setCalculatorData(calculatorData.slice(0, -1))
          }
          else if (calculatorData.includes('-') || calculatorData.includes('+') || calculatorData.includes('*') || calculatorData.includes('/')) {
              setInput(input.slice(0, -1))
              setCalculatorData(calculatorData.slice(0, -1))
          }
      }
    } 
    }
  }

    const handleDotOperator = (value) => {
      const lastChat = calculatorData[calculatorData.length - 1];
      if (calculatorData.includes('=') && value && !calculatorData.includes('.')) {
        setInput(`${calculatorData.slice(calculatorData.indexOf('=') + 1)}${value}`)
        setCalculatorData(`${calculatorData.slice(calculatorData.indexOf('=') + 1)}${value}`)
      } else {
        if (calculatorData[calculatorData.length - 2] == '.' && value == '.') {
          setInput(`${input}`)
          setCalculatorData(`${calculatorData}`)
        } else {
          if (input === '0' && calculatorData === '') {
            setInput('0.')
            setCalculatorData('0.')
          } else if (operators.includes(lastChat) && value === '.') {
              setCalculatorData(`${calculatorData}0.`)
              setInput(`0.${input.slice(1)}`)
          } else {
                if (calculatorData[calculatorData.length - 1] === '.' && value) {
                  setInput(`${input}`)
                  setCalculatorData(`${calculatorData}`)
                } else {
                  if (!input.includes('.')) {
                    setInput(`${input}.`)
                    setCalculatorData(`${calculatorData}.`)
                  } else {
                    setInput(`${input}`)
                    setCalculatorData(`${calculatorData}`)
                  }
                }
          }
        }
      }
    }

  const handleOperators = (value) => {
    const lastChat = calculatorData[calculatorData.length - 1];
    const beforeLastChat = calculatorData[calculatorData.length - 2];
    const beforeLastChatIsOperator = operators.includes(beforeLastChat)
    const lastChatIsOperator = operators.includes(lastChat);
    
    setInput(`${value}`)
  
    if (!lastChatIsOperator) {
      setCalculatorData(`${calculatorData}${value}`)
    } else if (lastChatIsOperator && lastChat != '-' && value != '-') {
      setCalculatorData(calculatorData.slice(0, -1) + value);
    } else if (lastChat == '-' && !beforeLastChatIsOperator) {
      setCalculatorData(calculatorData.slice(0, -1) + value)
    } else {
      if (lastChat !== '-' && value == '-') {
        setCalculatorData(`${calculatorData}${value}`)
      } else {
        if (beforeLastChatIsOperator && beforeLastChatIsOperator !== '-' && value != '-') {
          setCalculatorData(calculatorData.slice(0, -2) + value);
        }
      }
    }

    if (calculatorData.includes('=') && value) {
      const indexOfEquals = calculatorData.indexOf('=')
      setCalculatorData(`${calculatorData.slice(indexOfEquals + 1)}${value}`)
    }

    if (lastChat === '.' && value) {
      setCalculatorData(`${calculatorData}0${value}`)
    }

    if (input === '0') {
      setCalculatorData(`0${value}`)
    }
  }

  const handleClear = () => {
    setInput('0')
    setCalculatorData('')
  }

  const handleOutput = () => {
    if (calculatorData[calculatorData.length - 2] === '/' && calculatorData[calculatorData.length - 1] === '0') {
      setCalculatorData('Dividing by zero is not possible')
      setInput('Dividing by zero is not possible')
    }
    if (input != '0' && calculatorData) {
      const result = eval(`${calculatorData}`)
      setInput(`${result}`)
      setCalculatorData(`${calculatorData}=${result}`)
    }
    
  }

  const handleInput = (value) => {
    const op = operators.find(item => item == value);
    const num = numbers.find(item => item === value);

    switch(value) {
      case num:
        handleNumbers(value)
        break;
      case op:
        handleOperators(value)
        break;
      case "AC":
        handleClear()
        break;
      case '=':
        handleOutput()
        break;
      case '.':
        handleDotOperator(value)
        break;
    } 
  }

  return (
    <div className='text-right h-screen flex items-center justify-center'>
      <div>
        <div id='holder-calc' className='flex flex-col gap-y-2 max-w-[310px]'>
            <div className='flex flex-col-reverse bg-gray-800 px-2 min-h-[90px] rounded-t-lg'>
              <div id="display" className='text-white break-words text-xl'>
                {input}
              </div>
              <div className='text-yellow-400 break-words'>
                {calculatorData}
              </div>
            </div>
          <div className='grid place-content-center px-2 gap-2 pb-2' id='grid-holder'>
            <div id='one' onClick={() => handleInput(1)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>1</div>
            <div id='two' onClick={() => handleInput(2)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>2</div>
            <div id='three' onClick={() => handleInput(3)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>3</div>
            <div id='four' onClick={() => handleInput(4)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>4</div>
            <div id='five' onClick={() => handleInput(5)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>5</div>
            <div id='six' onClick={() => handleInput(6)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>6</div>
            <div id='seven' onClick={() => handleInput(7)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>7</div>
            <div id='eight' onClick={() => handleInput(8)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>8</div>
            <div id='nine' onClick={() => handleInput(9)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>9</div>
            <div id='zero' onClick={() => handleInput(0)} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>0</div>
            <div id="add" onClick={() => handleInput('+')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>+</div>
            <div id="subtract" onClick={() => handleInput('-')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>-</div>
            <div id="multiply" onClick={() => handleInput('*')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>*</div>
            <div id="divide" onClick={() => handleInput('/')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>/</div>
            <div id="decimal" onClick={() => handleInput('.')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>.</div>
            <div id="clear" onClick={() => handleInput('AC')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>AC</div>
            <div id="equals" onClick={() => handleInput('=')} className='text-center bg-blue-700 p-7 rounded-lg font-bold text-white'>=</div>
            <div id='clearingSymbols' className='flex items-center justify-center bg-blue-700 p-7 rounded-lg font-bold text-white' 
            onClick={() => clearing()}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill='white'/></svg>
            </div>
          </div>
        </div>
        <p className='text-center mt-2'>By Bekzat Kali</p>
      </div>
    </div>

  )
}

export default App






// import { useState } from 'react'

// function App() {
//   const [input, setInput] = useState('0')
//   // const [output, setOutput] = useState('')
//   const [calculatorData, setCalculatorData] = useState('')

//   const operators = ['+', '-', '*', '/'];
//   const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];



//   const handleNumbers = (value) => {
//     const lastChat = calculatorData[calculatorData.length - 1];
//     // console.log(lastChat)

//     if (value == '0' && lastChat == '0') {
//       setInput(input)
//       setCalculatorData(calculatorData)
//     } else {
//       if (input === '0') {
//         setInput(`${value}`)
//         setCalculatorData(`${value}`)
//       } else {
//         const firstOperator = operators.includes(input[0])
//         {firstOperator ? setInput(`${value}`) : setInput(`${input}${value}`)}
//         setCalculatorData(`${calculatorData}${value}`) 
//       }
//     }
    
    
//   }
//     // if (input === '0') {
//     //   setInput(`${value}`)
//     //   setCalculatorData(`${value}`)
//     // } else {
//     //     const firstOperator = operators.includes(input[0])
//     //     {firstOperator ? setInput(value) : setInput(`${input}${value}`)}
//     //     setCalculatorData(`${calculatorData}${value}`) 
//     // }

//     const handleDotOperator = (value) => {
  
//       const lastChat = calculatorData[calculatorData.length - 1];
//       const doto = '.'
      
//       if (input === '0') {
//         setInput('0.')
//         setCalculatorData('0.')
//       } else {
           
//             if (!input.includes('.')) {
//               setInput(`${input}.`)
//               setCalculatorData(`${calculatorData}.`)
//             } else {
//               setInput(input)
//               setCalculatorData(calculatorData)
//             }
//             // setInput(input.includes(value) ? `${input}` : `${input}.`)
//             // setCalculatorData(input.includes(value) ? `${calculatorData}` : `${calculatorData}.`)
            
  
//             // if (!operators.includes(lastChat)) {
//             //   setInput(calculatorData.includes('.') ? `${input}` : `${input}.`)
//             //   setCalculatorData(calculatorData.includes('.') ? `${calculatorData}` : `${calculatorData}.`)
//             // } else {
  
//             // }
            
  
  
  
//             // const isDot = calculatorData.includes('.')
//             // setInput(isDot ? `${input}` : `${input}.`)
//             // setCalculatorData(isDot ? `${calculatorData}` : `${calculatorData}.`)
  
  
  
//             // if (operators.includes(lastChat) && value === '.') {
//             //   setCalculatorData(`${calculatorData} 0.`)
//             // }
          
//       }
  
  
  
//       // const lastChat = calculatorData[calculatorData.length - 1];
//       // if (input === '0') {
//       //   setInput('0.')
//       //   setCalculatorData('0.')
//       // } else {
//       //     if (operators.includes(lastChat) && value === '.') {
//       //       setCalculatorData(`${calculatorData} 0.`)
//       //     } else {
//       //       const isDot = calculatorData.includes('.')
//       //       setInput(isDot ? `${input}` : `${input}.`)
//       //       setCalculatorData(isDot ? `${calculatorData}` : `${calculatorData}.`)
//       //     }
//       // }
//     }
//   const handleOperators = (value) => {
//     const lastChat = calculatorData[calculatorData.length - 1];
//     const beforeLastChat = calculatorData[calculatorData.length - 2];
//     const beforeLastChatIsOperator = operators.includes(beforeLastChat)
//     const lastChatIsOperator = operators.includes(lastChat);

//     setInput(value)
  
//     if (!lastChatIsOperator) {
//       setCalculatorData(`${calculatorData}${value}`)
//     } else if (lastChatIsOperator && lastChat !== '-' && value !== '-') {
//       setCalculatorData(calculatorData.replace(calculatorData[calculatorData.length - 1], value))
//     } else {
//       if (lastChat !== '-' && value === '-') {
//         setCalculatorData(`${calculatorData}${value}`)
//       } else {
//         if (beforeLastChatIsOperator && beforeLastChatIsOperator !== '-' && value !== '-') {
//           setCalculatorData(calculatorData.replace(calculatorData.slice(calculatorData.length - 2), value))
//         }
//       }
//     }

//     // prikol
//     if (input === '0') {
//       setCalculatorData(`0${value}`)
//     }

//     /* после завершения проекта выяснить почему блок кода prikol выполняется только, когда он находится ниже чем здоровенный блок с операторами*/
// }

//   // const handleOperators = (value) => {
//   //       const lastChat = calculatorData[calculatorData.length - 1];
//   //       const beforeLastChat = calculatorData[calculatorData.length - 2];
//   //       const beforeLastChatIsOperator = operators.includes(beforeLastChat)
//   //       const lastChatIsOperator = operators.includes(lastChat);

//   //       setInput(value)

//   //       if (!lastChatIsOperator) {
//   //         setCalculatorData(`${calculatorData}${value}`)
//   //       } else if (lastChatIsOperator && lastChat !== '-' && value !== '-') {
//   //         setCalculatorData(calculatorData.replace(calculatorData[calculatorData.length - 1], value))
//   //       } else {
//   //         if (lastChat !== '-' && value === '-') {
//   //           setCalculatorData(`${calculatorData}${value}`)
//   //         } else {
//   //           if (beforeLastChatIsOperator && beforeLastChatIsOperator !== '-' && value !== '-') {
//   //             setCalculatorData(calculatorData.replace(calculatorData.slice(calculatorData.length - 2), value))
//   //           }
//   //         }
//   //       }
//   // }

  

//   const handleClear = () => {
//     setInput('0')
//     setCalculatorData('')
//   }

//   const handleOutput = () => {
//     const result = eval(calculatorData)
//     setInput(result)
//     setCalculatorData(result)
//   }

//   const handleInput = (value) => {
//     const op = operators.find(item => item == value);
//     const num = numbers.find(item => item === value);

//     switch(value) {
//       case num:
//         handleNumbers(value)
//         break;
//       case op:
//         handleOperators(value)
//         break;
//       case "AC":
//         handleClear()
//         break;
//       case '=':
//         handleOutput()
//         break;
//       case '.':
//         handleDotOperator(value)
//         break;
//     } 
//   }

//   return (
//     <div className='text-right h-screen flex items-center justify-center'>
//       <div className='flex flex-col gap-y-5 min-w-[400px]'>
//          <div className='h-9'>
//             <div  className='text-orange-600'>
//               {calculatorData}
//             </div>
//             <div id="display">
//               {input}
//             </div>
//           </div>
//         <div className='grid grid-cols-3 gap-3'>
//           <div id='one' onClick={() => handleInput(1)} className='text-center bg-blue-500 p-3'>1</div>
//           <div id='two' onClick={() => handleInput(2)} className='text-center bg-blue-500 p-3'>2</div>
//           <div id='three' onClick={() => handleInput(3)} className='text-center bg-blue-500 p-3'>3</div>
//           <div id='four' onClick={() => handleInput(4)} className='text-center bg-blue-500 p-3'>4</div>
//           <div id='five' onClick={() => handleInput(5)} className='text-center bg-blue-500 p-3'>5</div>
//           <div id='six' onClick={() => handleInput(6)} className='text-center bg-blue-500 p-3'>6</div>
//           <div id='seven' onClick={() => handleInput(7)} className='text-center bg-blue-500 p-3'>7</div>
//           <div id='eight' onClick={() => handleInput(8)} className='text-center bg-blue-500 p-3'>8</div>
//           <div id='nine' onClick={() => handleInput(9)} className='text-center bg-blue-500 p-3'>9</div>
//           <div id='zero' onClick={() => handleInput(0)} className='text-center bg-blue-500 p-3'>0</div>
//           <div id="add" onClick={() => handleInput('+')} className='text-center bg-blue-500 p-3'>+</div>
//           <div id="subtract" onClick={() => handleInput('-')} className='text-center bg-blue-500 p-3'>-</div>
//           <div id="multiply" onClick={() => handleInput('*')} className='text-center bg-blue-500 p-3'>*</div>
//           <div id="divide" onClick={() => handleInput('/')} className='text-center bg-blue-500 p-3'>/</div>
//           <div id="decimal" onClick={() => handleInput('.')} className='text-center bg-blue-500 p-3'>.</div>
//           <div id="clear" onClick={() => handleInput('AC')} className='text-center bg-blue-500 p-3'>AC</div>
//           <div id="equals" onClick={() => handleInput('=')} className='text-center bg-blue-500 p-3'>=</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App