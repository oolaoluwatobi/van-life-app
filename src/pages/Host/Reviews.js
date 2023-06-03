import React from "react";
import { BsStarFill } from 'react-icons/bs'

const Reviews = () => {
  const reviewsData = [
      {
          rating: 5,
          name: "Effiong",
          date: "December 1, 2022",
          text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
          id: "1",
      },
      {
          rating: 5,
          name: "Sade",
          date: "November 23, 2022",
          text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
          id: "2",
      },
  ]
  
  return (
    <div className="mb-8">
      <div className="flex">
        <h1 className="text-3xl font-bold">Your reviews</h1>
        <p className="mt-auto ml-4">last <span className="font-semibold underline underline-offset-2">30 days</span> </p>
      </div>
      <div className="flex mt-5">
        <h3 className="font-bold text-3xl">5.0</h3>
        <BsStarFill className=" text-[#ff8c38] ml-2 my-auto" />
        <p className="ml-2 mt-2">overall rating</p>
      </div>
      
      <div className="mb-8">
        <div className="flex mt-5 bg-slate300">
          <p className="mr-3 w-20 bg-slate500 ">5 stars</p>
          <div className="mx-5 w-full my-auto">
            <div className="h-2 my-auto rounded bg-[#ff8c38]"></div>
          </div>
          <p className="ml-3 text-end w-18">100%</p>
        </div>
        <div className="flex mt-3 bg-slate300">
          <p className="mr-3 w-20 bg-slate500">4 stars</p>
          <div className="mx-5 w-full my-auto">
            <div className="h-2 my-auto rounded bg-[#b9b9b9]"></div>
          </div>
          <p className="ml-7 text-end w-18">0%</p>
        </div>
        <div className="flex mt-3 bg-slate300">
          <p className="mr-3 w-20 bg-slate500">3 stars</p>
          <div className="mx-5 w-full my-auto">
            <div className="h-2 my-auto rounded bg-[#b9b9b9]"></div>
          </div>
          <p className="ml-7 text-end w-18">0%</p>
        </div>
        <div className="flex mt-3 bg-slate300">
          <p className="mr-3 w-20 bg-slate500">2 stars</p>
          <div className="mx-5 w-full my-auto">
            <div className="h-2 my-auto rounded bg-[#b9b9b9]"></div>
          </div>
          <p className="ml-7 text-end w-18">0%</p>
        </div>
        <div className="flex mt-3 bg-slate300">
          <p className="mr-3 w-20 bg-slate500">1 star</p>
          <div className="mx-5 w-full my-auto">
            <div className="h-2 my-auto rounded bg-[#b9b9b9]"></div>
          </div>
          <p className="ml-7 text-end w-18">0%</p>
        </div>

      </div>
        
      <div>
        <h3 className="font-bold ">Reviews (2) </h3>

        {reviewsData.map(review => (
          <div key={review.id}>
            <div className="flex mt-5">
              {[...Array(review.rating)].map((_, i) => (
                <BsStarFill className=" text-[#ff8c38] mr-1 my-auto" key={i}/>
              ))}
            </div>
            <div className="flex mt-2">
              <p className="font-semibold">{review.name} </p>
              <p className="ml-2 text-[#8c8c8c]">{review.date} </p>
            </div>
            <p className="mt-2 mb-5">{review.text} </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
