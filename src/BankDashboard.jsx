import { useState } from 'react'
import {useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
function BankDashboard() {
  const [homeValue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState(600);
  const [loanAmount, setLoanAmount] = useState(2400); // Now controlled by slider
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(5); // Initial term set to 5 years
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterestGenerated, setTotalInterestGenerated] = useState(0);

  // Calculate monthly payment and total interest whenever loan amount, interest rate, or loan term changes
  useEffect(() => {
    const loanMonths = loanTerm * 12;
    const interestPerMonth = interestRate / 100 / 12;
    const monthlyPaymentCalc = (loanAmount * interestPerMonth * Math.pow((1 + interestPerMonth), loanMonths)) /
      (Math.pow((1 + interestPerMonth), loanMonths) - 1);
    setMonthlyPayment(monthlyPaymentCalc.toFixed(2));
    
    const totalInterestCalc = (monthlyPaymentCalc * loanMonths) - loanAmount;
    setTotalInterestGenerated(totalInterestCalc.toFixed(2));
  }, [loanAmount, interestRate, loanTerm]);  // Recalculate when these dependencies change

  return (
    <div className="container">
      <div className="sliders">
        <h2>Home Value: ${homeValue}</h2>
        <input 
          type="range" 
          min="1000" 
          max="10000" 
          value={homeValue} 
          onChange={(e) => setHomeValue(Number(e.target.value))} 
        />
        
        <h2>Down Payment: ${downPayment}</h2>
        <input 
          type="range" 
          min="0" 
          max="10000" 
          value={downPayment} 
          onChange={(e) => setDownPayment(Number(e.target.value))} 
        />

        <h2>Loan Amount: ${loanAmount}</h2> {/* New Slider for Loan Amount */}
        <input 
          type="range" 
          min="0" 
          max={homeValue}  // Allow the loan amount to go up to the home value
          value={loanAmount} 
          onChange={(e) => setLoanAmount(Number(e.target.value))} 
        />

        <h2>Interest Rate: {interestRate}%</h2>
        <input 
          type="range" 
          min="2" 
          max="18" 
          value={interestRate} 
          onChange={(e) => setInterestRate(Number(e.target.value))} 
        />

        <h2>Loan Term: {loanTerm} years</h2>
        <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
          <option value={5}>5 years</option>
          <option value={10}>10 years</option>
          <option value={15}>15 years</option>
          <option value={20}>20 years</option>
          <option value={30}>30 years</option>
        </select>

        <h2>Monthly Payment: ${monthlyPayment}</h2>
      </div>

      <div className="details">
        <h2>Financial Summary</h2>
        <p><strong>Principal Amount:</strong> ${loanAmount}</p>
        <p><strong>Total Interest:</strong> ${totalInterestGenerated}</p>
      </div>
    </div>
  );
}

export default BankDashboard;