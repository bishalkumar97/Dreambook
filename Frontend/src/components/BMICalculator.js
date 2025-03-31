"use client"
import { useState } from "react"
import Input from "./Input"
import { SyncLoader } from "react-spinners"
export default function BMICalculator({bmi, degree, loading}) {
    return (
        <div className="flex w-full flex-wrap items-center justify-center relative">
            <div className="w-full max-w-[240px] flex flex-wrap items-center justify-center relative transition-all delay-700">
                <img src={"/images/BMILabel.svg"} alt="BMI Meter" className="w-full w-[240px] h-[240px]" />
                <div className="h-1.5 w-[53%] bg-black border-2 border-white absolute top-1/2 right-1/2 origin-right rounded-full" style={{transform:`rotate(${degree.bmi}deg)`}}></div>
                <div className="left-[35px] top-[35px] w-full max-w-[170px] h-full max-h-[170px] absolute bg-white flex flex-wrap items-start justify-center rounded-full">
                    <div className="w-full flex flex-wrap items-center justify-center mt-6">
                        <span className="text-sm font-normal text-neutral4 uppercase w-full text-center">BMI</span>
                        {loading? <span className="mt-5"><SyncLoader size="16px" color="black" /> </span>
                        :
                        <span className="text-5xl w-full text-center font-medium animate-pulse">{bmi}</span>}
                    </div>
                </div>
            </div>
            <span className="w-full max-w-[285px] absolute inset-y-2/3 text-sm font-normal text-neutral4">
                BMI (Body Mass Index) is a a value derived from the height and weight of an individual
            </span>
        </div>
    )
}
