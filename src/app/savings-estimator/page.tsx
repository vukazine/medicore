"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function SavingsEstimator() {
  // State for inputs
  const [claims, setClaims] = useState(1000)
  const [denialRate, setDenialRate] = useState(5)
  const [claimValue, setClaimValue] = useState(1500)
  const [showResult, setShowResult] = useState(false)

  // Calculation logic
  const A = claims
  const B = claimValue
  const C = denialRate / 100
  const D = 0.8 // Vukazine Impact: 80% reduction
  const currentLoss = A * B * C * 12
  const estimatedSavings = currentLoss * D

  // Format currency
  const formatR = (num: number) => `R${num.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-600 mb-2 text-center">Vukazine Savings Estimator</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">See your annual revenue opportunity in seconds.</p>
        {!showResult ? (
          <form className="space-y-8" onSubmit={e => { e.preventDefault(); setShowResult(true) }}>
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">How many claims does your clinic submit monthly?</label>
              <div className="flex items-center gap-4">
                <input type="range" min={1} max={10000} value={claims} onChange={e => setClaims(Math.max(1, Math.min(10000, Number(e.target.value))))} className="w-full" />
                <input type="number" min={1} max={10000} value={claims} onChange={e => {
                  const val = Number(e.target.value);
                  if (!isNaN(val)) setClaims(Math.max(1, Math.min(10000, val)));
                }} className="w-24 rounded-lg border border-emerald-200 px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">What is your clinic's current average billing denial rate (%)?</label>
              <div className="flex items-center gap-4">
                <input type="range" min={0} max={100} value={denialRate} onChange={e => setDenialRate(Math.max(0, Math.min(100, Number(e.target.value))))} className="w-full" />
                <input type="number" min={0} max={100} value={denialRate} onChange={e => {
                  const val = Number(e.target.value);
                  if (!isNaN(val)) setDenialRate(Math.max(0, Math.min(100, val)));
                }} className="w-16 rounded-lg border border-emerald-200 px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                <span className="text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">What is the average value (in R) of a submitted claim?</label>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">R</span>
                <input type="number" min={1} max={100000} value={claimValue} onChange={e => {
                  const val = Number(e.target.value);
                  if (!isNaN(val)) setClaimValue(Math.max(1, Math.min(100000, val)));
                }} className="w-32 rounded-lg border border-emerald-200 px-2 py-1 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400" />
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all">See My Annual ROI</button>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2">Your Annual Revenue Opportunity is {formatR(estimatedSavings)}!</h2>
              <div className="flex justify-center items-end gap-4 mt-6 mb-2">
                <div className="w-32 h-24 bg-red-100 rounded-lg flex flex-col justify-end items-center">
                  <div className="w-full bg-red-400 h-16 rounded-t-lg"></div>
                  <span className="text-red-600 font-bold mt-2">{formatR(currentLoss)}</span>
                  <span className="text-xs text-red-500">Current Loss</span>
                </div>
                <div className="w-32 h-24 bg-green-100 rounded-lg flex flex-col justify-end items-center">
                  <div className="w-full bg-emerald-400 h-20 rounded-t-lg"></div>
                  <span className="text-emerald-700 font-bold mt-2">{formatR(estimatedSavings)}</span>
                  <span className="text-xs text-emerald-600">Revenue Recovered</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg text-red-600 font-semibold mb-2">Currently Lost: You are losing an estimated {formatR(currentLoss)} per year due to billing denials.</p>
              <p className="text-lg text-emerald-700 font-semibold mb-2">Vukazine Recovery: We project recovering {formatR(estimatedSavings)} of that revenue by preventing errors before submission.</p>
              <p className="text-sm text-gray-500 mt-4">This is an estimate based on your inputs and Vukazine's average performance metrics.</p>
            </div>
            <Link href="/#book" className="block w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all text-center mt-4">Lock In This Savings: Book Your Free Performance Audit</Link>
            <button type="button" className="w-full mt-2 text-emerald-600 underline" onClick={() => setShowResult(false)}>Back to Estimator</button>
          </div>
        )}
      </div>
    </div>
  )
}
